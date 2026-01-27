---
description: Advanced Figma Pro Workflow - A versioned, iterative process for pixel-perfect design-to-code implementation.
---

# Figma Pro Workflow (Design-to-Code Excellence)

This workflow is a multi-version, high-fidelity process designed to transform Figma designs into world-class frontend implementations. It follows a strict "Plan -> Implement -> Audit -> Refine" cycle.

## Phase 1: Version 1 (The MVP)

### 1. Planning & Analysis

- **Goal:** Deeply understand the design before writing a single line of code.
- **Action:**
  1. Read the provided Figma URL and Node IDs using `get_figma_data` (MCP Figma).
  2. Invoke the **@[figma-analysis]** skill to extract design tokens, component hierarchy, and functional logic.
  3. Generate a **V1 Implementation Plan** including:
     - Executive Summary
     - Architecture Tree (File structure)
     - Component Breakdown Table (Atoms, Molecules, Organisms)
     - Technical Stack & Libraries
     - Logic & State Management notes
- **Checkpoint:** Present the plan to the user. **DO NOT start coding until the user approves the plan.**

### 2. Implementation

- **Goal:** Build the core structure and UI matching the Approved Plan.
- **Action:**
  1. Scaffold components in the designated directories.
  2. Implement styling using the extracted design tokens (Colors, Spacing, Typography).
  3. Ensure basic responsiveness.

### 3. Verification & Bug Fix

- **Goal:** Ensure code quality and resolve immediate issues.
- **Action:**
  1. Run `yarn lint` or `npm run lint`.
  2. Fix all linting and syntax errors.
  3. Verify basic functionality (buttons, links, interactions).

---

## Phase 2: The Deep Audit (Figma vs Code)

### 1. Comparison & Review

- **Goal:** Identify pixel-perfection gaps.
- **Action:**
  1. Invoke the **@[figma-revew]** skill to systematically compare current code vs Figma data.
  2. **Checklist:**
     - **UI Layout & Spacing**: Precise gaps, padding, margins.
     - **Components**: Correct border-radius, stroke weights.
     - **Visuals**: Accurate Hex/HSL colors, multi-layer shadows.
  3. Document all "Gaps" (discrepancies).

### 2. Version 2 Planning

- **Goal:** Upgrade the implementation from "Good" to "Premium".
- **Action:**
  1. Create a **V2 Refinement Plan** focusing on:
     - Resolving all UI Gaps found in Audit.
     - **Motion & Micro-interactions:** Staggered animations, hover effects, parallax.
     - **Performance & SEO:** Image optimization, semantic HTML audit.
     - **Advanced Patterns**: Glassmorphism, backdrop filters.
- **Checkpoint:** Present the V2 Plan to the user for approval.

---

## Phase 3: Version 2 (The Refinement)

### 1. Premium Implementation

- **Goal:** Execute the V2 plan for a world-class "Wow Factor".
- **Action:**
  1. Apply V2 spacing and shadow adjustments.
  2. Add Framer Motion or chosen animation library for smooth transitions.

### 2. Re-Verification

- **Goal:** Ensure the refinements didn't break accessibility or performance.
- **Action:**
  1. Run final lint and type checks.
  2. Repeat Phase 2 Audit if necessary until user satisfaction is reached.

---

**Workflow Ownership:** Antigravity Senior Frontend Architect.
