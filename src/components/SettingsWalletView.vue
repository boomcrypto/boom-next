<template>
  <q-card class="my-card">
    <img src="https://cdn.quasar.dev/img/mountains.jpg" />
    <q-card-section>
      <div class="text-h6">Our Changing Planet</div>
      <div class="text-subtitle2">by John Doe</div>
    </q-card-section>
    <q-card-section>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </q-card-section>
    <q-list bordered>
      <div class="h6">Wallet</div>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="bluetooth" />
        </q-item-section>
        <q-item-section>Hide legacy btc address</q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="bluetooth" />
        </q-item-section>
        <q-item-section>Display Sats/BTC</q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup></script>
