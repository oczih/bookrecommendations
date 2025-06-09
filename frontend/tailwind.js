import('tailwindcss/lib/cli/index.js')
  .then(({ cli }) => cli())
  .catch(err => {
    console.error('Failed to load Tailwind CLI:', err);
    process.exit(1);
  });