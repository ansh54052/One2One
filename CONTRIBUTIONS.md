# Contributing to One2One 💬

Thank you for your interest in improving One2One! We welcome contributions from the community.

## 🛠️ Development Workflow

1. **Fork the Repository**: Create your own copy of the project.
2. **Branching**: Create a branch for your work:
   - Features: `feat/feature-name`
   - Bugfixes: `fix/issue-name`
   - Documentation: `docs/description`
3. **Setup**: Run `npm install` in both `/frontend` and `/backend` to sync dependencies.
4. **Testing**: Ensure your changes do not break the real-time Socket.io connections or User Presence logic.

## 📝 Commit Message Guidelines

We follow a structured commit style to keep the history readable:
- `feat:` for new features (e.g., `feat: add typing indicators`)
- `fix:` for bug fixes
- `docs:` for documentation updates
- `refactor:` for code changes that neither fix a bug nor add a feature

## 💻 Code Standards

- **Consistency**: Follow the existing functional component structure in React.
- **Styling**: Use Tailwind CSS utility classes. Avoid inline styles.
- **Documentation**: Add JSDoc comments to complex backend controllers, especially logic involving JWT authentication or Socket event mapping.

## 🚀 Submitting a Pull Request

- Provide a clear summary of the changes.
- Include screenshots for any UI/UX modifications.
- Reference any related issues if applicable.