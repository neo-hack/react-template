const Home = () => {
  return (
    <div className="hero flex-1 overflow-auto bg-base-200">
      <div className="hero-content flex-col gap-8 lg:flex-row-reverse">
        <div className="mockup-code">
          <pre data-prefix="$">
            <code>npm i @aiou/neo -g</code>
          </pre>
        </div>
        <div>
          <h1 className="text-5xl font-bold">React Template</h1>
          <div className="my-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <i className="gg-check-o" />
              webpack + esbuild
            </div>
            <div className="flex items-center gap-2">
              <i className="gg-check-o" />
              tailwindcss
            </div>
          </div>
          <button className="btn btn-primary">
            <a href="https://reactjs.org/">Docs</a>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
