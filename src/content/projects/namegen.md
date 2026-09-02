---
title: "NameGen: AWS Delivery & Operations Lifecycle"
description: "Terraform-provisioned EKS with immutable image delivery, monitoring and a scripted teardown that verifies itself, built so nothing changes in AWS without an explicit instruction."
tags:
  - "AWS"
  - "Terraform"
  - "Kubernetes"
  - "GitHub Actions"
  - "Prometheus"
githubUrl: "https://github.com/ido-hail/namegen-final-devops-project"
featured: true
order: 1
---

## Context

NameGen is a small Node.js application that generates names and stores them in MongoDB. It is an existing open-source project by Bob Reselman, used here under its MIT license. The infrastructure, delivery, observability and lifecycle work described below is my contribution.

The application is deliberately ordinary. It needs a database, persistent storage, a public endpoint and a release path, which is enough to build a realistic production system around.

## Goal

One lifecycle, run repeatedly: provision, deliver, validate, observe, destroy. Each stage verifies its own outcome, and nothing mutates real infrastructure without an explicit instruction.

## Architecture

Terraform provisions an EKS Auto Mode cluster across two public subnets, along with a private ECR repository, IAM roles and a GitHub OIDC trust relationship. Kubernetes runs two non-root application Pods behind an internet-facing Network Load Balancer, plus an authenticated MongoDB StatefulSet backed by an encrypted gp3 EBS volume. GitHub Actions builds and delivers images. Prometheus and Grafana run internally for monitoring.

Two Python scripts, `launch.py` and `terminate.py`, are the supported interface to all of it, which is what makes the lifecycle repeatable rather than remembered.

<figure>
  <a href="/projects/namegen/architecture.svg">
    <img src="/projects/namegen/architecture.svg" alt="Architecture diagram: internet traffic reaches two NameGen Pods through a public Network Load Balancer inside an EKS Auto Mode cluster; the Pods use an internal MongoDB StatefulSet backed by an encrypted EBS volume, while GitHub Actions pushes images to a private ECR repository using OIDC." width="1600" height="1050" loading="lazy" decoding="async" />
  </a>
  <figcaption>The environment Terraform provisions and the lifecycle scripts manage: EKS Auto Mode across two public subnets, two non-root application Pods behind a public NLB, an authenticated MongoDB StatefulSet on encrypted EBS, and delivery through GitHub Actions using short-lived OIDC credentials. Open the diagram for a full-size view.</figcaption>
</figure>

## Key engineering decisions

**Preview by default.** Running `launch.py` with no arguments changes nothing. It validates prerequisites, Git state, Terraform configuration, Kubernetes manifests, AWS identity and resource collisions, then produces a saved create-only plan. Mutating anything requires an explicit `--apply` and typing `APPLY` at the prompt. Apply also refuses to run unless `main` is clean and synchronized with the remote, so an incomplete or mistaken command produces a plan, not infrastructure.

**Identity instead of long-lived credentials.** There are no static AWS access keys anywhere in the pipeline. GitHub Actions authenticates through OIDC, and the role it assumes can push only to this project's ECR repository and discover only this project's cluster. Kubernetes RBAC narrows it further: the CI identity can update one Deployment and read the Service and MongoDB StatefulSet.

**Immutable delivery.** Images are tagged with the full Git commit SHA, and the pipeline verifies the ECR digest before deploying. There is no mutable `latest` tag, so any running Pod traces back to an exact commit.

**Scoped public exposure.** Only the application's load balancer is public. MongoDB, Prometheus and Grafana remain internal, reachable through port-forward.

## Reliability and validation

Deployment success is verified rather than inferred from a zero exit code. The launch workflow checks replica counts, that the PersistentVolumeClaim is Bound, that the EBS volume is encrypted gp3, that the load balancer is serving, and that the application API responds.

It also deletes the MongoDB Pod deliberately, waits for it to be rescheduled, and confirms that the data and the PersistentVolume both survived, instead of taking persistence from the manifest.

Teardown gets the same treatment. `terminate.py` discovers the load balancer and EBS volume before deletion, removes Kubernetes and monitoring resources, waits for the underlying AWS resources to actually disappear, then applies a saved delete-only plan. It audits EKS, ECR, VPC, IAM, EC2, load balancers, EBS, Terraform state and OIDC ownership. Only once those checks pass does it delete the state bucket's object versions and the bucket itself, so a successful run leaves nothing behind and confirms it.

## Observability

An internal `kube-prometheus-stack` deployment provides a four-panel Grafana dashboard covering Ready Pods, Pod restarts, and CPU and memory for both the application and the database. Grafana is not exposed publicly, and the admin credential is generated at runtime rather than committed.

<figure>
  <a href="/projects/namegen/grafana-dashboard.webp">
    <img src="/projects/namegen/grafana-dashboard.webp" alt="Grafana dashboard showing three ready Pods, zero Pod restarts, and CPU and memory usage time series for the two NameGen Pods and mongodb-0." width="925" height="720" loading="lazy" decoding="async" />
  </a>
  <figcaption>The four-panel dashboard during a validated run: three Ready Pods (two application replicas and MongoDB), zero restarts, and live CPU and memory series per Pod. Grafana is never exposed publicly, so this was captured through a temporary local port-forward.</figcaption>
</figure>

## Trade-offs

**Public subnets, no NAT Gateway.** A conventional production design would place workloads in private subnets, with outbound connectivity through NAT or VPC endpoints depending on requirements. For an environment created and destroyed repeatedly, that networking cost and complexity were deliberately avoided. The decision is cost-driven for this context, not a general recommendation.

**The full launch workflow assumes a clean environment.** It is built to create from nothing; routine application releases go through GitHub Actions instead. Handling both paths in one script would have made the safety guarantees much harder to reason about.

**Monitoring storage is ephemeral.** Metrics do not survive teardown. That is acceptable for a short-lived environment, and would not be appropriate if the history mattered.

## What it demonstrates

Infrastructure work judged the way operations work is judged: whether it can be repeated, whether it proves it worked, whether it cleans up completely, and whether the destructive actions require deliberate intent.
