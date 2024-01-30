const App = () => (
   <div>
   <Person age="19" name="daveyismyname" hobbies={['sports', 'swimming', 'racquetball']}/>
   <Person age="14" name="short" hobbies={['reading', 'jumping', 'skiing']}/>
   <Person age="30" name="ainsley" hobbies={['knitting', 'studying', 'baking']}/>
   </div>
)

ReactDOM.render(<App/>, document.getElementById("root"));