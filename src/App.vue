<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <nav class="navbar navbar-expand-sm navbar-light bg-light w-100">
          <a class="navbar-brand" href="#">XpeedStudio</a>
          <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId"
                  aria-controls="collapsibleNavId"
                  aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/add" class="nav-link">Add</router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <router-view/>
      </div>
    </div>
  </div>
</template>


<style>
.loader-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  cursor: pointer;
}
span.text {
  display: inline-block;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: #fff;
}
.loader {
  animation: loader-animate 1.5s linear infinite;
  clip: rect(0, 80px, 80px, 40px);
  height: 80px;
  width: 80px;
  position: absolute;
  left: calc(50% - 40px);
  top: calc(50% - 40px);
}
.loader:after {
   animation: loader-animate-after 1.5s ease-in-out infinite;
   clip: rect(0, 80px, 80px, 40px);
   content: '';
   border-radius: 50%;
   height: 80px;
   width: 80px;
   position: absolute;
 }

@keyframes loader-animate {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(220deg)
  }
}
@keyframes loader-animate-after {
  0% {
    box-shadow: inset #fff 0 0 0 17px;
    transform: rotate(-140deg);
  }
  50% {
    box-shadow: inset #fff 0 0 0 2px;
  }
  100% {
    box-shadow: inset #fff 0 0 0 17px;
    transform: rotate(140deg);
  }
}
</style>
