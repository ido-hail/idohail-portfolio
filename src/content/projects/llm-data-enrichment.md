---
title: "LLM Data Enrichment Pipeline"
description: "A batch enrichment workflow for device data using OpenAI and Google model APIs, with abstention-focused prompting, structured outputs and programmatic validation."
tags:
  - "Python"
  - "LLM APIs"
  - "Data Enrichment"
  - "Structured Outputs"
  - "Validation"
featured: true
order: 3
---

## Context

A device dataset needed structured enrichment: fields that were missing from the source data but could plausibly be recovered from what a model already knows about each device.

The difficulty is not generating values. It is that a language model will produce a confident answer for a device it knows nothing about, and a weak guess is indistinguishable from a correct one once it lands in a table. Enrichment that cannot be trusted is worse than a missing field, because the missing field is at least visible.

## Goal

Precision and controlled abstention rather than maximum coverage. A record the model declines to enrich is an acceptable outcome. A record it fills in wrongly is not.

## Workflow

Records are processed in batches. Each batch is sent as the same constrained enrichment task to both an OpenAI model API and a Google model API, with responses requested as structured JSON rather than prose. Returned batches are parsed and validated programmatically before acceptance, and batches that fail structural or record-integrity checks are rejected rather than merged.

Running both providers under the same prompt makes their output coverage directly comparable, which is what the comparison was for.

## Key engineering decisions

**Abstention over hallucination.** The prompt instructs the model to return no enrichment where the evidence is weak, instead of producing its best guess. This trades coverage for trustworthiness deliberately: the pipeline is allowed to return less, and is not allowed to return something manufactured.

**Structured output.** Responses are requested in a fixed JSON structure rather than free-form text. This reduces parsing ambiguity and makes malformed or incomplete responses easier to detect before they reach downstream processing.

**Validation after generation.** Model output is treated as untrusted pipeline input. Returned batches are checked for required structure, expected record count, input-model identity, duplicates and missing records before acceptance.

**Provider comparison.** Both providers run the identical prompt so that differences in output coverage reflect the models rather than the instructions. That is the basis for evaluating model fit for this task, rather than choosing a provider by reputation.

## Trade-offs

**Coverage is lower by design.** Abstention means some records stay unenriched that a more permissive prompt would have filled. For this dataset that was the correct trade, and it would not be correct for a task where an approximate value is more useful than none.

**Comparison was on coverage, not accuracy.** Comparing how much each provider was willing to enrich under identical constraints is a measure of fit, not a measured accuracy result, and is not presented as one.

## What it demonstrates

Using an LLM as a bounded component inside a data workflow: constrained inputs and outputs, explicit abstention, defensive validation, and provider comparison rather than trusting free-form generation.
