import { createStore } from 'vuex';
import { rolesModule } from '@/store/rolesModule';
import { namesModule } from '@/store/namesModule';
import { playersModule } from '@/store/playersModule';

export default createStore({
  modules: {
    roles: rolesModule,
    names: namesModule,
    players: playersModule
  }
});
