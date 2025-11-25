Optml.ai – Content Optimization Capture Tool

A floating, extension-ready screenshot analysis system with AI-powered insights, heatmaps, design-rule evaluation, and an interactive chat panel.

This project is built with Next.js App Router, TypeScript, Tailwind CSS, Zustand, and shadcn/ui.

Overview

V0 is a visual intelligence toolkit designed as a prototype for a browser extension.
Users can:

Capture any selectable region of a webpage

Generate an AI report (summary, heatmap, readability, design rules, insights)

Store captures locally and manage them through a global drawer

View and navigate reports through a dedicated report viewer

Chat with a report using the built-in chat panel

Use the tool on top of any website (Figma, Canva, dashboards, marketing sites, and more)

The UI runs inside a floating overlay that behaves like an always-available extension toolbar.

Features
Floating Toggle Toolbar

A persistent floating UI that:

Toggles the sidebar

Shows quick actions such as:

Capture selected area

Upload image

Add new (placeholder)

Opens navigation drawers (captures, archived, favorites, etc.)

Area Selection & Screenshot Capture

Dimmed overlay for focus

Precise selection box with draggable handles

Scroll-aware capture logic

Clean capture preview using <CapturePreview />

Captures stored with metadata in capture-store

AI Report Pipeline

After capturing:

Capture overlay closes

Processing popover begins animated multi-step sequence

Artificial backend delay simulates actual ML processing

A dummy AI report is generated

Report drawer opens automatically

Report Drawer

A resizable panel including:

Original screenshot with heatmap slider

Summary, strengths, issues, recommendations

Design-rule evaluation

Readability scoring

Attention hotspot list

Report chat panel

Capture Drawer

Displays all saved captures grouped by date:

Today

Yesterday

Last 7 days

Last 30 days

Older

Also includes:

Grid layout

Delete actions

Resizable drawer

Global UI State

A centralized UI state using Zustand manages:

Active drawer

Sidebar open/closed

Capture mode

Processing mode

Automatic transitions (for example, finishing processing opens the report drawer)

Architecture
Next.js App Router

Root layout injects floating UI

All overlay components run client-side

AI backend is simulated with dummy data

Global Stores
ui-store

Responsible for:

Drawer states

Sidebar state

Capture flow

Processing flow

Pipeline transitions

report-store

Handles:

Reports

Active report

Persistence using zustand/persist

capture-store

Handles:

Captured images

Metadata

Grouped rendering

Persistence

Key Components
FloatingToggle

Controls:

Quick actions

Sidebar toggle

Capture overlay

Processing popover

Global drawers

AreaCaptureOverlay

Handles:

Drawing the selection box

Resize handles

Capture toolbar

Screenshot capture with html-to-image

Scroll-corrected cropping

Passing the captured image to downstream logic

CapturePreview

Provides:

Captured image preview

Confirmation button to generate report

Close button

ESC key support

ProcessingPopover

Displays:

Step-by-step animated processing

Global processing state

Final callback that triggers opening a drawer

ReportDrawer

Includes:

Resizable layout

Tabs for different analysis sections

Heatmap slider

Chat panel

CapturesDrawer

Responsible for:

Listing saved captures

Grouping them by date

Removing captures

Resizable layout

Development

Install dependencies:

npm install


Start development server:

npm run dev


The project runs at http://localhost:3000.

Tech Stack

Next.js App Router

TypeScript (strict mode)

Tailwind CSS

Zustand with persistence

shadcn/ui

html-to-image

Lucide

Next.js <Image>

File Structure
src/
  components/
    floating-toggle/
    capture-tool/
    report-viewer/
    captures/
    ui/
  store/
    ui-store.ts
    report-store.ts
    capture-store.ts
  lib/
    generate-dummy-report.ts
    area-capture-utils.ts
app/
  layout.tsx
  page.tsx

Status

This is a prototype, but designed with scalable architecture.
The codebase is organized for eventual integration with:

Heatmap API

Design-rule evaluation API

Readability model

Report summarization LLM endpoint

Core UI interactions and storage flows are fully developed.