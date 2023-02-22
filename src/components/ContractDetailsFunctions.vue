<script setup>
import { toRefs, ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";

const props = defineProps({
  contract: {
    type: Object,
    required: true,
  },
});
const $q = useQuasar();

const { contract } = toRefs(props);
const abi = ref({});

const { smart_contract, tx_id, tx_status } = contract.value;
const [contract_address, contract_name] = smart_contract.contract_id.split(".");
console.info("smart_contract", smart_contract);
console.info("tx_id", tx_id);
console.info("tx_status", tx_status);
console.info("contract_address", contract_address);
console.info("contract_name", contract_name);

onBeforeMount(async () => {
  $q.loading.show({ message: "Loading..." });
  const data = await fetch(
    `https://stacks-node-api.mainnet.stacks.co/v2/contracts/interface/${contract_address}/${contract_name}`,
    {
      method: "GET",
    }
  );
  $q.loading.hide();
  abi.value = await data.json();
});
</script>
<template>
  <q-card class="bg-boom">
    <div contenteditable>
      {{ abi }}
    </div>
  </q-card>
</template>
