<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <nav>
    <div class="duelango-header">
      <div class="left-logos">
        <router-link to="/members"><i class="fa fa-id-card-o"></i></router-link>
        <router-link to="/archive"><i class="fa fa-calendar"></i></router-link> 
      </div>
      <div class="duelango-logo">
        <router-link to="/">dueLango</router-link>
      </div>
      <div class="right-logos">
        <router-link to="/help"><i class="fa fa-question-circle"></i></router-link>
        <router-link to="/stats"><i class="fa fa-bar-chart"></i></router-link>
      </div>
    </div>
  </nav>

  <div class="app-body">
    <router-view/>
  </div>

</template>


<style>
#app {
  font-family:'RadioCanada';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  width:100vw;
}
@font-face {
   font-family: RadioCanada;
   src: url(../assets/RadioCanadaBig-VariableFont_wght.ttf);
} 
@font-face {
  font-family: PseudoAPL;
  src: url(../assets/PAPL_.ttf);
}
body {
  height: 100vh;
  width:100vw;
  color: white;
  background-color: #222;
  min-height: 360px;
  margin: 0;
}
.app-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
a {
  color: white ;
  text-decoration: none;
}

.duelango-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 2%;
}
.duelango-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  margin: 10px;
  border-radius: 10px; 
  background-color: crimson;
  color: white;
  line-height: 1;
  font-weight: bold;
  font-size: 3.3em;
  font-family: 'PseudoAPL';
  user-select: none;
}
.duelango-logo:hover {
  background-color: rgb(240, 30, 70);
}
.left-logos, .right-logos  {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 28px;
}
.fa {
  border-radius: 25%;
  padding: 5px;

  line-height: 50%;
  color: white;
  }
.fa:hover {
    background: crimson;
}
.fa-facebook:hover {
  background: rgb(164, 15, 45);
}
.fa-twitter:hover {
  background: rgb(164, 15, 45);
}
.fa:active {
  background: rgb(164, 15, 45);
}


@media only screen and (max-width: 500px) {
  
  body { 
    margin : 0;
  }

  .duelango-logo {
    padding: 15px 25px 15px 25px ;
    font-size: 2.6em;
    margin-left: 0px;
    margin-right:0px;
  }
  header {
    padding-top: 5px;
  }
  .duelango-header {
    align-items: normal;
  }
  .board-container {
    margin-top: 40px;
  }
  .board {
    margin-bottom: 40px;
  }
  .result {
    margin-left: 20px;
    margin-right: 20px;
    
  }
  .words {
    list-style-type: none;
    cursor: pointer;
  }
  .checkbox #text {
    font-size: 50px;
  }

}
@media only screen and (max-height: 500px) {
  body { 
    margin : 0;
  }
  .duelango-logo {
    font-size: 1.8em;
    padding: 10px 25px 10px 25px ;
  }

  .fa {
    font-size: 24px;
  }
  header {
    padding-top: 5px;
  }
  .left-logos, .right-logos  {
    flex-direction: row;
    justify-content: baseline;
    align-content: baseline;
    
  }

}

</style>
