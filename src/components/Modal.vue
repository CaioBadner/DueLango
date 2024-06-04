<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3> {{ alert }} </h3>
      <p> {{ resultadoFinal }} </p>
      <div class="modal-buttons">
        <button @click="shareOnTwitter"><i class="fa fa-twitter"></i>Compartilhe no Twitter</button>
        <button @click="shareOnFacebook"><i class="fa fa-facebook"></i>Compartilhe no Facebook</button>
      </div>
      <p>Um novo tabuleiro é lançado todo dia à meia-noite (0:00 -3 UTC)</p>
      <button class="close-button" @click="closeModal">Fechar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['alert', 'totalNormalWords', 'totalBonusWords', 'totalGameTime'],
  methods: {
    closeModal() {
      this.$emit('close')
    },
    shareOnTwitter() {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.resultadoFinal)}`;
      window.open(url, '_blank');
    },
    shareOnFacebook() {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.resultadoFinal)}`;
      window.open(url, '_blank');
    },
    plural(total) {
      if (!Number.isInteger(total)) {
        return "s"
      }
      if (total != 1) {
        return "s"
      }
      return ""
    }
  },
  computed: {
    
    resultadoFinal() {
      return "Encontrou " + this.totalNormalWords + 
      " palavra" + this.plural(this.totalNormalWords) + " e " + this.totalBonusWords + 
      " palavra" + this.plural(this.totalBonusWords) + " bônus em apenas " + this.totalGameTime 
      + " minuto" + this.plural(this.totalGameTime) + "!"
    }
  }

}
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #222;
  border: solid crimson;
  color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}


.modal-buttons {
  margin: 20px 0;
}

button {
  background-color: crimson;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;
  border-radius: 15px;
}

button:hover {
  background-color: rgb(122, 12, 34);
}

.close-button {
  background-color: white;
  color: #222;
}

.close-button:hover {
  background-color: rgb(145, 145, 145);
}
</style>