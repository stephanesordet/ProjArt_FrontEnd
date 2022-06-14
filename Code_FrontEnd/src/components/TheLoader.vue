<template>
    <div class="loading-box">
        <div class="lds-ripple"><div></div><div></div></div>
        <h2 class="chargement"></h2>
    </div>
</template>

<script>
    export default {
        };
</script>

<style scoped>
.chargement::before {
            content: "Nous chargeons vos données";
            animation: animate infinite 10s;
        }
  
        @keyframes animate {
  
            0% {
                content: "Cela prend un peu de temps";
            }
  
            50% {
                content: "Pourquoi pas un peu de café ?";
            }
  
            75% {
                content: "Gaps est vraiment lent...";
            }
            100% {
                content: "Nous chargeons vos données";
            }
        }
.chargement {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    margin-top: 150px;
    text-transform: uppercase;
    position: absolute;
    color: #959595;
    animation: color-change 1s infinite;
}

@keyframes color-change {
  0% { color: #343434; }
  50% { color: #959595; }
  100% { color: #343434; }
}
.loading-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,1);
    z-index: 999;
    display: none;
    justify-content: center;
    align-items: center;
}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
.hidden {
  opacity:0;
}
.console-underscore {
   display:inline-block;
  position:relative;
  top:-0.14em;
  left:10px;
}

</style>
