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
              <li class="nav-item active">
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

</style>
