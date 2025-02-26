export default function buildTime() {
  return {
    name: "vite-plugin-build-time",
    apply: "build",
    transformIndexHtml(html, { path }) {
      if (path === "/index.html") {
        html = html.replace(
          "</body>",
          `
        <script>
          console.log('deploy :>> ', '${new Date().toLocaleString()}');
        </script>
        </body>
      `
        );
      }
      // console.log('html :>> ', html);
      return html;
    },
  };
}
