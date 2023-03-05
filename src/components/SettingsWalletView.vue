<template>
  <q-card class="boom-bg">
    <div class="h6">Wallet</div>
    <q-list>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="accent" name="check_circle" />
        </q-item-section>
        <q-item-section>Hide legacy btc address</q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="accent" name="check_circle" />
        </q-item-section>
        <q-item-section>Display Sats/BTC</q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="accent" name="check_circle" />
        </q-item-section>
        <q-item-section>Add inscriptions watch address</q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup></script>
