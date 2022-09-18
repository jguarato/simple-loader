function transformChilds(parent, elementSelector, newTranslationX = 0, newTranslationY = 0) {

  const currentTranslation = function (element) {
    const transformStyle = element.style.transform;
    const transformAsString = transformStyle.replace(/[^-?\d*\.{0,1}\d+$]/g, ' ');
    
    const transformAsArray = transformAsString.split(' ').filter(function (elm) {
      return (elm != null && elm !== false && elm !== '')
    });
    
    const transformAsFloat = transformAsArray.map(function (elm) {
      return parseFloat(elm);
    });
    
    return transformAsFloat;

  }

  const childs = document.querySelectorAll(`${parent}:nth-child(${elementSelector})`);

  for (let i = 0; i < childs.length; i++) {
    
    const currentTranslationX = currentTranslation(childs[i]).length > 0 ?
          currentTranslation(childs[i])[0] : 0;
    
    const currentTranslationY = currentTranslation(childs[i]).length > 1 ?
          currentTranslation(childs[i])[1] : 0;
    
    const totalTranslationX = currentTranslationX + newTranslationX;
    const totalTranslationY = currentTranslationY + newTranslationY;
    
    childs[i].style.transform = `translatex(${totalTranslationX}vmin) translatey(${totalTranslationY}vmin)`;
  }
}

function transformCircles(oddXOffset = 0, evenXOffset = 0, oddYOffset = 0, evenYOffset = 0) {
  
  transformChilds('.container .circle', 'odd', oddXOffset, oddYOffset);
  transformChilds('.container .circle', 'even', evenXOffset, evenYOffset);
 
}

function changeChildsBackground(parent, elementSelector, percentage) {
    const childs = document.querySelectorAll(`${parent}:nth-child(${elementSelector})`);

  for (let i = 0; i < childs.length; i++) {   
    childs[i].style.background = `rgba(255,255,255,${percentage})`;
  }
}

function changeCirclesBackground(position = 0) {
  
  let oddPerc = 0.5;
  let evenPerc = 0.5;
  
  switch (position) {
    case 0: case 2:
      oddPerc = 0.4;
      evenPerc = 0.8;
      break;
    default:
      oddPerc = 0.8;
      evenPerc = 0.4;
      break;
  }

  changeChildsBackground('.container .circle', 'odd', oddPerc);
  changeChildsBackground('.container .circle', 'even', evenPerc);
}

function changeLoadingText() {
  const loadingText = document.getElementById("loadingText");
  const textLength = loadingText.innerHTML.length;
  
  if (textLength > 6 && textLength < 10) {
      loadingText.innerHTML += ".";
  } else {
    loadingText.innerHTML = "LOADING";
  }

}

function startAnimation() {
  
  let animationRep = 5;
  
  const xMove = [5, 5, -5, -5];
  const yMove = [-5, 5, 5, -5];
  let positionCounter = -1;
    
  const animationInterval = setInterval(function () {
    
    positionCounter++;
    
    const oddXMove = xMove[positionCounter];
    const evenXMove = -oddXMove;
    const oddYMove = yMove[positionCounter];
    const evenYMove = -oddYMove;
    
    transformCircles(oddXMove, evenXMove, oddYMove, evenYMove);
    changeCirclesBackground(positionCounter);
    changeLoadingText();
    
    if (positionCounter === xMove.length - 1) {
      animationRep--;
      positionCounter = -1;
    }    

  }, 1000);
  
}

startAnimation();