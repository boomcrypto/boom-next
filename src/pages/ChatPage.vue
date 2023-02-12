<template>
  <q-page padding>
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 400px">
        <q-chat-message
          :text="['Have you seen Quasar?']"
          sent
          text-color="white"
          bg-color="accent"
        >
          <template v-slot:name>me</template>
          <template v-slot:stamp>7 minutes ago</template>
          <template v-slot:avatar>
            <img
              class="q-message-avatar q-message-avatar--sent"
              src="https://cdn.quasar.dev/img/avatar4.jpg"
            />
          </template>
        </q-chat-message>

        <q-chat-message bg-color="grey-3">
          <template v-slot:name>Mary</template>
          <template v-slot:avatar>
            <img
              class="q-message-avatar q-message-avatar--received"
              src="https://cdn.quasar.dev/img/avatar2.jpg"
              width="32"
            />
          </template>

          <div>
            Already building an app with it...
            <img
              src="https://cdn.quasar.dev/img/discord-qeart.png"
              class="my-emoji"
            />
          </div>

          <q-spinner-dots size="2rem" />
        </q-chat-message>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import RelayPool from "nostr";

const jb55 = "32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245";
const damus = "wss://relay.damus.io";
const scsi = "wss://nostr-pub.wellorder.net";
const relays = [damus, scsi];

const pool = RelayPool(relays);

pool.on("open", (relay) => {
  relay.subscribe("subid", { limit: 2, kinds: [1], authors: [jb55] });
});

pool.on("eose", (relay) => {
  relay.close();
});

pool.on("event", (relay, sub_id, ev) => {
  console.log(ev);
});
</script>
<style scoped lang="sass">
.my-emoji
  vertical-align: middle
  height: 2em
  width: 2em
</style>
