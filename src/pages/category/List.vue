<template>
  <q-page padding>
    <div class="row">
      <q-table class="col-12" title="Categories" :rows="categories" :columns="columns" row-key="id" :loading="loading">
        <template v-slot:top-right>
          <q-btn color="primary" icon="mdi-plus" label="Adicionar" />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn color="info" icon="mdi-pencil-outline" dense>
              <q-tooltip>Editar</q-tooltip>
            </q-btn>
            <q-btn color="negative" icon="mdi-delete-outline" dense>
              <q-tooltip>Excluir</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'

const columns = [
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  { name: 'actions', align: 'right', label: 'Actions', field: 'actions', sortable: false }
]

export default defineComponent({
  name: 'CategoryListPage',
  setup () {
    const categories = ref([])
    const loading = ref(true)

    const { list } = useApi()
    const { notifyError } = useNotify()

    const handlerCategoryList = async () => {
      try {
        loading.value = true
        categories.value = await list('category')
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handlerCategoryList()
    })

    return {
      columns,
      categories,
      loading
    }
  }
})
</script>
