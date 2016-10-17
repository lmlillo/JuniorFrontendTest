function searchUser() {

  var user= document.getElementById("user").value;
  var userUrl= "https://api.github.com/users/"+user;
  var reposUrl= "https://api.github.com/users/"+user+"/repos";
  
  document.getElementById("userReposBlock").innerHTML="";

  // check and get the user info
  var requestUser = new XMLHttpRequest();
  requestUser.open("GET", userUrl, true);
  requestUser.send();
  
  requestUser.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      userProfile = JSON.parse(this.responseText);
      document.getElementById("userProfileBlock").innerHTML = '<div class="col-xs-12 col-md-6 col-md-offset-3"><div class="col-xs-4 col-md-2"><img width= 100px weigth= 100px; src="' + userProfile.avatar_url + '"></div>'
        + '<div class="col-xs-8 col-md-10"><p>' + '@' + userProfile.login + '</p>'
        + '<p>' + userProfile.name + '</p></div></div>';
      findRepos(); 
    }else{
      document.getElementById("userProfileBlock").innerHTML =  '<div class="col-xs-12 col-md-6 col-md-offset-3"><div class="bg-danger panel-body"><p>The user doesn'+"'"+'t exist</p></div></div>';
      
    }
  };
  
  // get the user repositories
  function findRepos(){
    document.getElementById("userReposBlock").innerHTML="<h3>Repositories</h3><hr>";


    var requestRepos = new XMLHttpRequest();
    requestRepos.open("GET", reposUrl, true);
    requestRepos.send();

    requestRepos.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        userRepos = JSON.parse(this.responseText);
        if(userRepos.length > 0){
          
      	   for (var i in userRepos){
              var line = document.createElement("tr");
              //line.className = 'inner'; 	           			
              line.innerHTML = '<td>' + userRepos[i].name +'</td><td> <i class="fa fa-star" aria-hidden="true"></i> '+ userRepos[i].stargazers_count + '</td><td><i class="fa fa-code-fork" aria-hidden="true"></i>  ' + userRepos[i].forks_count +'</td><hr>';	
      		    document.getElementById("userReposBlock").appendChild(line);
      	   }

        }else{
            var div = document.createElement("div");
            
            div.innerHTML = '<div class="bg-danger panel-body"><p>The user no has any proyect</p></div><hr>';
            document.getElementById("userReposBlock").appendChild(div);

        }
      }
    }
    
  };
}
