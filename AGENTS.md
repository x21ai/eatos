# Project architecture

- The public `/chatapp` workspace and its `/chatapp/visitors` view use a dedicated full-height shell without website chrome or login while the interface is being built; `/admin` remains protected.
- Front-end chat and live-visitor prototype data lives in typed local modules, so persistence can later be added without redesigning the interface.
