<template>
    <va-sidebar :minimized="minimized">
        <template slot="menu">

            <template v-for="(item, key) in items">
                <va-sidebar-link-group
                        :key="key"
                        :minimized="minimized"
                        :icon="[ 'sidebar-menu-item-icon  fa', item.meta.iconClass ]"
                        v-if="item.children"
                        :title="$t(item.displayName)"
                        :children="item.children"
                >
                    <va-sidebar-link
                            v-for="(subMenuItem, key) in item.children"
                            :key="key"
                            :to="{ name: subMenuItem.name }"
                            :title="$t(subMenuItem.displayName)"
                    />
                </va-sidebar-link-group>
                <va-sidebar-link
                        v-else
                        :key="key"
                        :minimized="minimized"
                        :activeByDefault="item.name === $route.name"
                        :icon="[ 'sidebar-menu-item-icon  fa' ,item.meta.iconClass ]"
                        :to="{ name: item.name }">
                    <span slot="title">{{ $t(item.displayName) }}</span>
                </va-sidebar-link>
            </template>
        </template>
    </va-sidebar>
</template>

<script>
  import {navigationRoutes} from './NavigationRoutes'

  export default {
    name: 'app-sidebar',
    components: {},
    props: {
      minimized: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        items: navigationRoutes.routes,
      }
    },
  }

</script>
<style type="scss">
    /*.sidebar {*/
        /*top: 2rem;*/
        /*height: calc(100% - 2rem);*/
        /*width: 10.75rem;*/
        /*&--minimized {*/
            /*width: 3.5rem*/
        /*}*/
    /*}*/

</style>
