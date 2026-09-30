# Chatbox settings subpages

## Goal
Turn Chatbox into a collapsible Settings group with six reference-matched subpages: Appearance, Behavior, Search AI, Security, Restrictions, and Push Notifications.

## Changes
- Add the six Chatbox links beneath the main Chatbox item, with Appearance selected by default and the active page preserved in the URL.
- Add compact horizontal Chatbox navigation for tablet and phone layouts, matching the existing Account and Workspace behavior.
- Build the Appearance page with chatbox theme controls, button options, automatically-saved status, and a responsive simulated widget preview.
- Build the Behavior page with Chatbox Home, Visitors, Files, Knowledge Base, Status, Hide Chatbox, Privacy, and Other settings.
- Build the Search AI page with the plugin notice, Search AI setup, and frequent-searches empty state.
- Build the Security page with general domain locking, privacy status controls, and anti-bot protection level.
- Build the Restrictions page with vacation mode, allowed and blocked pages, countries, locales, IP restrictions, and blocked-visitor controls.
- Build the Push Notifications page with disabled Firebase Cloud Messaging and Apple Push Notification Service controls.
- Use the existing dark Chat App visual system and replace reference-brand wording with eatOS where applicable.

## Behavior and scope
- Controls will provide a complete local demo experience using selections, switches, add/remove rows, and dialogs where shown.
- No database, external plugin installation, real notifications, or permanent saving will be added.
- The current standalone Chatbox availability overview will be replaced by Appearance as the default Chatbox screen.

## Validation
- Confirm the Chatbox group expands and collapses, and all six links open the correct content.
- Exercise the interactive controls and add/remove flows with demo values.
- Check desktop, tablet, and phone layouts for readable content, usable widget previews, and no horizontal overflow.
- Run the project typecheck, lint or repository checks, and production build available in this project.
