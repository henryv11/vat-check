<template>
  <div>
    <b-navbar class="shadow-sm" style="opacity: 0.8">
      <div class="container-fluid">
        <b-navbar-brand>
          <router-link to="/" style="text-decoration: none">
            <p class="h5 m-0">VATCheck</p>
          </router-link>
        </b-navbar-brand>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>


<style lang="less" scoped>

p {
  font-family: Copperplate,Copperplate Gothic Light,fantasy;
  font-weight: bold;
  color: #110D0E;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
}
</style>
