//  let container = document.createElement('div');
// container.classList.add('search-container');


document.body.style.backgroundColor = '#c4c4c4';
// let searchForm = document.createElement('input');
// searchForm.classList.add('search-input')


function createElementToPage(elementTag, elementClass, elementType){
    let elem = document.createElement(elementTag);
    elem.classList.add(elementClass);
    if(elementType){
        elem.type = elementType;
    }
   
    return elem
}

function appendToPage(what, where){
    where.append(what);
}
let container = createElementToPage('div', 'search-container')
let searchForm = createElementToPage('input', 'search-input', 'search')
appendToPage(searchForm, container);
appendToPage(container, document.body)

// searchForm.placeholder = 'Redux';

let repoContainer = createElementToPage('div', 'repo-container');
document.body.insertAdjacentElement('afterend', repoContainer)

appendToPage(repoContainer, document.body);

async  function searchRepo(){
let res = await fetch(`https://api.github.com/search/repositories?q=${searchForm.value}`);
try{if(res.ok){
    let json = await res.json();
    // console.log(json);
    let arr=[];
    for(let key of json.items){

        if(arr.length  > 4) break;
        arr.push(key);   
      
      
    }
    for(let rep of arr){
        let elem = createElementToPage('button', 'pop')
        elem.textContent = rep.name;
        appendToPage(elem, container)
      
        searchForm.addEventListener('keyup', function(){
            arr = null;
            elem.remove()
        });

        elem.addEventListener('click', () => {
         const newRepo = createElementToPage('div', 'new-repo-cont');
         const newRepoName = createElementToPage('div', 'repo-name');
         const newRepoOwner = createElementToPage('div', 'repo-owner');
         const newRepoStars = createElementToPage('div', 'repo-owner');
         const closeBtn = createElementToPage('button', 'close-button');
         closeBtn.innerHTML = '<svg width="46" height="42" viewBox="0 0 46 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 40.5L44 2" stroke="#FF0000" stroke-width="4"/><path d="M44 40.5L2 2" stroke="#FF0000" stroke-width="4"/ </svg>';
         newRepoName.textContent = `Name: ${rep.name}`;
         newRepoStars.textContent = `Stars: ${rep.stargazers_count}`;
        
         newRepoOwner.textContent = `Owner: ${rep.owner.login}`;
         appendToPage(newRepo, repoContainer);
         appendToPage(newRepoName, newRepo);
         appendToPage(newRepoOwner, newRepo);
         appendToPage(newRepoStars, newRepo);
         appendToPage(closeBtn, newRepo);
            searchForm.value='';
            arr = null;
            const elemtoClo = document.querySelectorAll('.pop');
            elemtoClo.forEach(el => el.remove());
            closeBtn.addEventListener('click', () => {
                newRepo.remove()
            });
            });
 
    }
}
else{
    throw new Error;
}

}
catch(e){
    console.log(e.name, e.message);
}
}

const debounce = (fn, debounceTime) => {
    //code here
     let timer;
  function wrapper(){
   
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, debounceTime)
  }
  return wrapper;
};

const debouncedFn = debounce(searchRepo, 400);

searchForm.addEventListener('keyup', function(){
    debouncedFn()
});


// const popBtn = document.querySelector('.pop');
