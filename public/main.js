function Application() {
  return <div>
    <h1>React does not have to be complicated.</h1>
    <p>
      In fact, the React app that you are looking at only
      has three files:
    </p>
    <ul>
      <li><code>index.html</code> loads the necessary scripts.</li>
      <li><code>main.js</code> renders this message.</li>
      <li><code>main.css</code> just sets the font.</li>
    </ul>
    <p>
      Of course, JSX needs to be compiled. But React Armorys editor
      does that for you - you can see the result by clicking "Compiled"
      at the bottom of the editor.
    </p>
    <p>
      <strong>It is never been easier to try React!</strong> All you need
      to do is change a few words in <code>main.js</code>, and your changes will
      be displayed instantly!
    </p>
  </div>
}

ReactDOM.render(
  <Application />,
  document.getElementById('app')
)
