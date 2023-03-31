<script>
import { ref, computed, onMounted } from "vue";
</script>
<template>
  <q-card flat class="boom-bg">
    <q-card-section>
      <q-select v-model="selectedTokenId" :options="tokenOpts" dense outlined emit-value option-label="label"
        option-value="value" dropdown-icon="img:/appicons/chevron-down.png">
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" class="text-dark q-py-none">
            <q-item-section avatar>
              <q-icon :name="`img:${scope.opt.icon}`" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <template #selected-item>
          <q-item class="q-py-none">
            <q-item-section avatar>
              <q-icon :name="`img:${currentToken.icon}`" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ currentToken.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-input v-model="amount" rounded outlined dense class="rounded_input full-width q-my-md" placeholder="Amount"
        :rules="[
          (val) => isValidAmount(val) || 'Not a valid amount',
          (val) =>
            isLessThanMax(val) || 'Amount must be less than your balance',
        ]" lazy-rules>
        <template #append>
          <q-chip v-if="!amount" color="primary" text-color="accent" dense square clickable label="Max" class="bg-primary"
            @click="setMaxAmount" />
          <q-btn v-else unelevated size="sm" round icon="img:/appicons/clear-x.svg" class="bg-primary"
            @click.stop="handleClear" />
        </template>

        <template #hint>
          <div class="row justify-between">
            <div>
              Available balance:
              <span class="strong">{{ availableBalance }} {{ displaySymbol }}</span>
            </div>
          </div>
        </template>
      </q-input>
      <q-input v-model="recipient" rounded outlined class="rounded_input full-width q-mb-md" dense type="text"
        placeholder="Recipient" hint="Enter a BNS name, address, or scan a QR code">
      </q-input>
      <q-input v-model="memo" rounded outlined dense class="rounded_input full-width q-mb-lg" type="text"
        placeholder="Memo - Optional, but required by most exchanges" :rules="[
          (val) => val.length <= 34 || 'Memo must be 34 characters or less',
        ]">
      </q-input>
      <div class="row justify-between q-mb-md">
        <q-btn outline color="accent" class="q-px-lg" rounded label="Clear" no-caps @click="handleClear" />
        <q-btn rounded unelevated class="boom-button boom-button-text" label="Confirm and Send" no-caps
          @click="handleConfirmAndSend" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup></script>