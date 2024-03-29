const App = () => (
    <div>
        <h1>DaveyWorking</h1>
        <Eightball name={"davey"}/>
        <Eightball name={"Lisa"}/>
    </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);