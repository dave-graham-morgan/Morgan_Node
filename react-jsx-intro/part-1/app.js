
const App = () => (
   <div>
      <FirstComponent/>
      <Name name="George"/>
      <Name name="Bob" />
   </div>
)

ReactDOM.render(<App/>, document.getElementById("root"));