<template>
    <div class="modal" :class="{ 'modal-open': AuthStore.state.listsModalOpened }">
        <div class="modal-box">
            <h1>Eklemek İstediğiniz Listeleri Aşağıdan Seçin</h1>
            <div class="w-full">
                <ul tabindex="0" class="p-2 shadow menu rounded-box dropdown-content bg-base-100">
                    <li v-for="(list, index) in AuthStore.state.userLists" :key="index + 1" class="mb-2">
                        <a :class="{ active: selectedLists.includes(list.id) }" @click="selectList(list.id)">
                            <font-awesome-icon icon="check" class="mr-2" v-if="selectedLists.includes(list.id)" />
                            {{ list.title }}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="modal-action">
                <label for="lists-modal" :class="{ 'btn-disabled': selectedLists.length === 0 }" class="btn btn-info btn-sm" @click="addToList">Ekle</label>
                <label for="lists-modal" class="btn btn-sm btn-error" @click="closeModal">Kapat</label>
            </div>
        </div>
    </div>
</template>

<script setup>
import AuthStore from '../stores/AuthStore';
import { ref } from '@vue/reactivity';

const selectedLists = ref([]);

function closeModal() {
    selectedLists.value = [];
    AuthStore.commit('closeListsModal');
}

function selectList(id) {
    if (selectedLists.value.includes(id)) {
        selectedLists.value = selectedLists.value.filter(listId => listId !== id);
        return;
    }

    selectedLists.value.push(id);
}

function addToList() {
    if (!selectedLists.value.length) return;

    AuthStore.commit('addToList', { selectedLists });
}
</script>