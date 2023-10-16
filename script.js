const result = document.getElementById('result');
const outputContainer = document.getElementById('output-container');
const testCount = 10000;

//create test element and execute provided test function
async function createAndTest(test, testName, afterTestCallback = () => {console.log('Test finished')}){

  result.innerHTML += '<br>&nbsp;&nbsp;&nbsp; Loading...';
  await new Promise(resolve => setTimeout(resolve, 0));

  const div = document.createElement('div');
  div.id = testName.replaceAll(' ', '-').toLowerCase();
  div.classList.add('output');
  outputContainer.appendChild(div);

  const startTime = Date.now();
  for(let i =0; i < testCount; i++){
    test(div);
  }
  result.innerHTML = result.innerHTML.replace('Loading...',(testName+': '+(Date.now() -startTime)+'ms'));
  afterTestCallback(div, startTime);
}

//run sample tests
async function runTests(){
  outputContainer.textContent = '';
  result.textContent = 'Results: ';

  await new Promise(resolve => setTimeout(resolve, 0))

  //pure element 
  createAndTest((parent) => {
      const elem = document.createElement('p');
      elem.textContent = 'This is a test';
      parent.appendChild(elem);
  }, 'Pure Element Creation');
  //pure element and then appending
  createAndTest((parent) => {
      const elem = document.createElement('p');
      elem.textContent = 'This is a test';
      parent.appendChild(elem);
  }, 'Pure Element Creation & Styling', (parent, startTime) => {
    for(const child of parent.children){
      child.classList.add('sample-class');
    }
  });
  //creating and appending elements with some styling
  createAndTest((parent) => {
    const elem = document.createElement('p');
    elem.classList.add("sample-class");
    elem.textContent = 'This is a test';
    parent.appendChild(elem);
  }, 'Styled Element Creation');
  
  //creating and appending elements with heavy styling
  createAndTest((parent) => {
    const elem = document.createElement('p');
    elem.classList.add('large-sample-class');
    elem.textContent = 'This is a test';
    parent.appendChild(elem);
  }, 'Heavily Styled Element Creation')
  
  //modifying text content
  createAndTest((parent) => {
    parent.textContent += '\r\n This is a test';
  }, 'Modifying Text Content');

}
