---
name: SIGAP Command Intelligence
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#544435'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#877463'
  outline-variant: '#dac2af'
  surface-tint: '#8b5000'
  primary: '#8b5000'
  on-primary: '#ffffff'
  primary-container: '#f59827'
  on-primary-container: '#613700'
  inverse-primary: '#ffb870'
  secondary: '#006c4c'
  on-secondary: '#ffffff'
  secondary-container: '#7ef6c2'
  on-secondary-container: '#00714f'
  tertiary: '#5f5e5e'
  on-tertiary: '#ffffff'
  tertiary-container: '#afadad'
  on-tertiary-container: '#424141'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcbe'
  primary-fixed-dim: '#ffb870'
  on-primary-fixed: '#2c1600'
  on-primary-fixed-variant: '#693c00'
  secondary-fixed: '#81f9c5'
  secondary-fixed-dim: '#63dcaa'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005138'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  status-violation: '#ef4444'
  status-offline: '#9ca3af'
  orange-light: '#fff3e0'
  green-light: '#e8f8f3'
  glass-surface: rgba(255, 255, 255, 0.7)
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-margin-desktop: 32px
  container-margin-mobile: 16px
  gutter: 24px
  sidebar-width: 280px
---

## Brand & Style

The design system for SIGAP (Sistem Integrasi Gerak Armada Pintar) is engineered to project a high-authority, intelligent, and real-time command center environment. The target audience—dispatchers and managers of DLH DKI Jakarta—requires a UI that minimizes cognitive load while highlighting critical operational deviations.

The aesthetic follows a **Clean Tech** philosophy with a strategic infusion of **Glassmorphism**. This approach uses semi-transparent surfaces and blurred backgrounds to create a sense of depth and modern sophistication, ensuring that the heavy data load of a command center feels light and manageable. High-contrast "glowing" accents are reserved for status indicators, mimicking physical control panels to draw immediate attention to live alerts and fleet health.

## Colors

The color palette is functionally driven, adhering to the official DLH DKI Jakarta identity while optimizing for high-density dashboard monitoring. 

- **Primary (Orange):** Reserved for active interaction states, primary calls to action, and "Idle" status warnings.
- **Secondary (Green):** Indicates successful operations, "On-Route" status, and system affirmations.
- **Neutral/Dark:** A deep charcoal is used for primary headings and text to ensure maximum legibility against light backgrounds.
- **Background Strategy:** Uses a base of pure white with subtle gray accents to define different functional zones (e.g., sidebars vs. content areas).
- **Status Indicators:** Specifically mapped to a four-state logic (Green: Normal, Orange: Idle, Red: Violation, Gray: Offline).

## Typography

The typography system utilizes **Montserrat** for high-impact headlines to provide a modern, structural feel, while **Inter** is used for all functional text, data tables, and body copy due to its exceptional legibility in high-density interfaces.

- **Contrast:** Headings should always use the `Dark` color (#1a1a1a) to anchor the layout.
- **Data Display:** For truck IDs and coordinates, use a medium or bold weight of Inter to ensure technical details are distinguishable at a glance.
- **Scale:** Sizes scale down aggressively for mobile devices, with headlines reducing by approximately 25% to accommodate limited horizontal space without losing the "command center" authority.

## Layout & Spacing

The design system employs a **Fluid Grid** model with fixed sidebar navigation for rapid context switching.

- **Desktop:** A 12-column grid with 24px gutters. The main content area lives within a flexible container that expands to fill the viewport, essential for the "Live Map" view.
- **Sidebar:** A fixed 280px width provides a persistent anchor for navigation and global status summaries.
- **Mobile/Tablet:** The layout reflows to a single column. The sidebar transforms into a bottom navigation bar or a condensed "drawer" to maximize map real estate.
- **Spacing Rhythm:** Based on an 8px square grid. Use 16px for internal card padding and 24px-32px for section margins.

## Elevation & Depth

Visual hierarchy is established through a mix of **Tonal Layers** and **Glassmorphism**:

- **Base Level:** Pure white (#ffffff) for the primary canvas.
- **Tier 1 (Cards/Panels):** Uses a high-blur backdrop filter (glassmorphism) with a thin 1px border (#e5e7eb) to separate content from the background map or analytics.
- **Tier 2 (Overlays/Modals):** Subtle, extra-diffused shadows (0px 10px 30px rgba(0,0,0,0.05)) are used to lift active interaction points above the dashboard.
- **Status Glow:** Critical alerts (Red/Orange) use a low-spread outer glow (drop-shadow with 4px blur) in their respective colors to simulate a live hardware light.

## Shapes

The shape language is characterized by **large, friendly radiuses** that contrast with the technical nature of the data. 

- **Primary Containers:** Cards and major panels use a consistent 16px (`rounded-lg`) to 24px (`rounded-xl`) corner radius.
- **Interactive Elements:** Buttons and input fields use an 8px radius to maintain a professional, sharp appearance while remaining approachable.
- **Status Badges:** Always use "pill-shaped" (full-round) geometry to clearly distinguish them from structural elements or buttons.

## Components

- **Buttons:** Primary buttons use a solid Orange fill. Secondary actions use Green or a 2px Orange outline. All buttons include a subtle hover transition that shifts the background shade slightly darker.
- **KPI Cards:** Feature a 4px top-border color-coded to the metric's status (Orange for warnings, Green for healthy). The background should be white or a glassmorphic pane.
- **Alert Panel:** Uses a "light-wash" background (e.g., Orange Light) with a heavy 4px left-border of the solid status color. Includes a pulsing status dot.
- **Status Badges:** Small, high-contrast labels with light backgrounds (Success Green-Light with Green text).
- **Map Markers:** 16px circular icons with white borders and status-colored fills. Active/Selected markers should increase in size and gain a glowing outer shadow.
- **Data Visualization:** Charts must use the primary brand colors (Orange/Green) for data series, with a neutral gray for axes and grid lines.