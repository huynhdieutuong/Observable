// Start TDZ
// In Temporal Dead Zone, we can not access age
//console.log(age); // Cannot access age before initialization
let age2 = 30; // End TDZ
console.log(age2);
// => age in script scope

{
  // Start TDZ
  //console.log(name); // Cannot access name before initialization
  //console.log(fullName); // Cannot access fullName before initialization

  let name = 'ABC';
  let fullName;
  console.log(name);
  console.log(fullName);
}

window.hello = 'Hello';
this.source = 'Source';
