---
title: "Pac-Man — DevSecOps Delivery Pipeline"
description: "A delivery pipeline built around real release gates: blocking vulnerability scanning, hardened non-root workloads, and a Kubernetes NetworkPolicy restricting database access to the application itself. Where NameGen covers how infrastructure is delivered safely, this covers what is allowed to reach production and what it can do once there."
year: 2026
tags:
  - "DevSecOps"
  - "Trivy"
  - "Kubernetes"
  - "Terraform"
  - "GitHub Actions"
githubUrl: "https://github.com/ido-hail/pacman-project"
featured: false
order: 3
---

## Context

This project takes a supplied open-source Pac-Man application and builds a DevSecOps delivery pipeline around it. The application is not mine; the pipeline, runtime configuration and security controls are.

It shares infrastructure ground with NameGen — Terraform, EKS Auto Mode, ECR, OIDC, a Network Load Balancer, a MongoDB StatefulSet on encrypted EBS, Prometheus and Grafana — so this write-up does not repeat that lifecycle story. The question here is different: what is allowed to reach production, and what it is permitted to do once it arrives.

<figure>
  <a href="/projects/pacman/architecture.webp">
    <img src="/projects/pacman/architecture.webp" alt="Architecture diagram: GitHub Actions builds, scans and deploys through an OIDC-assumed role into an EKS Auto Mode cluster; two non-root Pac-Man Pods sit behind a public Network Load Balancer, and a NetworkPolicy allows only those Pods to reach MongoDB on port 27017." width="1387" height="820" loading="lazy" decoding="async" />
  </a>
  <figcaption>The shared infrastructure shape, with the controls this project is actually about: MongoDB reachable only from Pods labelled as the application, non-root workloads, encrypted storage, and a delivery identity scoped to one repository and one namespace. Open the diagram for a full-size view.</figcaption>
</figure>

## Delivery risk

The supplied application carries legacy dependencies. That is a realistic starting condition, and it forces the pipeline to handle imperfect input rather than assuming a clean slate.

## Security gates

**Trivy runs as a blocking gate.** The build fails on fixable HIGH and CRITICAL findings in the image, while remaining findings stay visible for review.

**`npm audit` runs as informational.** The application's legacy dependencies produce findings that cannot all be resolved without modifying an application that exists here as a payload. Blocking on them would either stop delivery entirely or create routine pressure to bypass the gate, so the image is held to a hard standard while the dependency audit stays visible without gating the pipeline.

**Supply-chain pinning.** The container base image is digest-pinned and the GitHub Actions are pinned, so a given pipeline run produces the same result rather than inheriting whatever a moving tag currently points at.

## Workload hardening

The application runs as a non-root user with privilege escalation disabled and all Linux capabilities dropped. MongoDB also runs non-root. Both carry CPU and memory requests and limits, so a single misbehaving workload cannot starve its neighbors.

Rollouts use `maxUnavailable: 0` with readiness and liveness probes, so a new version must report ready before the previous one is retired. A failing deployment stalls rather than taking the service down with it.

## Network and database protection

A Kubernetes NetworkPolicy allows traffic to MongoDB on TCP 27017 only from Pods labeled as the application. MongoDB therefore accepts traffic only from the intended application Pods, reducing unnecessary lateral access inside the cluster.

## Pipeline controls

Pull requests run the full validation path — Terraform formatting and validation, dependency install, audit, image build, non-root verification and Trivy — without deploying anything. Deployment happens only on push to `main`.

The OIDC trust is scoped to this specific repository and the `main` branch, and the CI identity's Kubernetes access is confined to a single namespace. Validation and deployment are therefore separate capabilities rather than the same job behind a conditional.

## Validation

The environment was verified end to end: Terraform create and destroy, EKS Auto Mode provisioning, image delivery through ECR, application-to-database connectivity, persistence across EBS, non-root execution, NetworkPolicy enforcement, OIDC-authenticated CI/CD, Trivy scanning, monitoring, and complete teardown with a final check for zero remaining project resources.

NetworkPolicy enforcement was verified directly rather than assumed from the manifest.

## Trade-offs

**The legacy dependencies remain.** They are contained rather than eliminated. Resolving them properly would mean modifying an application that exists here as a payload, so the runtime and image are hardened while the dependency history stays visible and monitored.

**The gate targets fixable findings.** Findings without an available fix remain visible for review but do not block delivery. This keeps the gate actionable — a blocked build can be cleared by applying an available fix — without hiding unresolved risk.

**Same cost-driven network topology as NameGen**, with the same caveat about public subnets in a short-lived environment.

## What it demonstrates

Security controls selected for a specific system rather than applied from a checklist, with explicit reasoning about which gates block, which inform, and why that split was chosen.
