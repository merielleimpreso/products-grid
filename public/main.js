function Application() {
  return <div>
    <h1>Products Grid</h1>
    <p>Here you are sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>

    <section class="products">
        ... products go here ...
    </section>
  </div>
}

ReactDOM.render(
  <Application />,
  document.getElementById('app')
)
