# Project architecture

- The public `/chatapp` workspace uses a dedicated full-height shell without website chrome or login while its interface is being built; `/admin` remains protected.
- Front-end chat prototype data lives in a typed local module, so persistence can later be added without redesigning the interface.