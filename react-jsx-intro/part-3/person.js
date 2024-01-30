const Person = ({name, age, hobbies}) => (
   
   <div>
      <p>learn some information about this person</p>
      <p>{(age > 18) ? "go vote" : "you must be 18"}</p>
      <p>{(name.length > 8) ? name.slice(0,6) : name}</p>
      <p>{hobbies.map(h => <li>{h}</li>)}</p>
   </div>
)