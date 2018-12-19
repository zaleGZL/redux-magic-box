import sagaEffects from './effects';
import { isType } from './utils';
import { NAMESPACE_SEP } from './constants';

/**
 * 默认 watcher 创建器
 * @param {Function} effect effect 函数
 */
const defaultWatcherCreator = effect => {
  return function*() {
    yield sagaEffects.call(effect, sagaEffects);
  };
};

/**
 * 指定 type 的 watcher 创建器
 * @param {Function} effect effect 函数
 */
const specialTypeWatcherCreator = effect => {
  return function*(action) {
    yield sagaEffects.call(effect, action, sagaEffects);
  };
};

/**
 * effect watcher 生成器
 * @param {String} namespace model 的命名前缀
 * @param {String} effectName effect 的名称
 * @param {Object} effect effect 函数
 * @param {Object} config watcher 的配置
 * @param {String} config.type watcher 的类型
 * @param {Number} config.throttleTime watcher 类型为 'throttle' 的节流时间
 */
const effectWatcherCreator = (namespace, effectName, effect, config = {}) => {
  const pattern = `${namespace}${NAMESPACE_SEP}${effectName}`;
  const { throttleTime, type } = config;

  switch (type) {
    case 'watcher': {
      return defaultWatcherCreator(effect);
    }
    case 'takeLatest': {
      return function*() {
        yield sagaEffects.takeLatest(
          pattern,
          specialTypeWatcherCreator(effect)
        );
      };
    }
    case 'throttle': {
      return function*() {
        yield sagaEffects.throttle(
          throttleTime,
          pattern,
          specialTypeWatcherCreator(effect)
        );
      };
    }
    case 'takeEvery':
    default: {
      return function*() {
        yield sagaEffects.takeEvery(pattern, specialTypeWatcherCreator(effect));
      };
    }
  }
};

/**
 * 创建 saga
 * @param {Array} models model 列表
 */
export default function createSagas(models = []) {
  // 已经定义的 namespace
  const existentNamespace = {};
  // 所有的 saga watchers
  const sagaWatchers = [];

  for (let model of models) {
    const { namespace, effects = {} } = model;

    // 检测 namespace 是否有定义
    if (!namespace) {
      throw new Error('namespace 未定义或为空字符串.');
    }

    // 检测 namespace 是否重复定义(必须全局唯一)
    if (existentNamespace[namespace]) {
      throw new Error(`namespace: ${namespace} 重复定义.`);
    }

    // 检查 effects 类型
    if (!isType(effects, 'Object')) {
      throw new Error(`effects 数据类型必须为对象.`);
    }

    // 设置该 namespace 已存在
    existentNamespace[namespace] = true;

    // 获取定义的 effect
    Object.keys(effects).forEach(effectName => {
      const effect = effects[effectName];
      let effectFunc = function*() {}; // effect 函数
      let type = ''; // effect watch 类型
      let throttleTime = 0; // type 为 throttle 的 time 参数

      if (isType(effect, 'GeneratorFunction')) {
        effectFunc = effect;
        type = 'takeEvery';
      } else if (
        isType(effect, 'Array') &&
        isType(effect[0], 'GeneratorFunction') &&
        isType(effect[1], 'Object')
      ) {
        effectFunc = effect[0];
        type = effect[1].type || 'takeEvery';
        throttleTime = effect[1].throttleTime || 0;
      } else {
        throw new Error(
          'effect 的格式为 *(action, effects) => void 或 [*(action, effects) => void, { type }]'
        );
      }

      sagaWatchers.push(
        // 生成 saga watcher
        effectWatcherCreator(namespace, effectName, effectFunc, {
          type,
          throttleTime,
        })
      );
    });
  }

  return function* rootSaga() {
    yield sagaEffects.all(
      sagaWatchers.map(saga =>
        sagaEffects.spawn(function*() {
          while (true) {
            try {
              yield sagaEffects.call(saga);
            } catch (error) {
              console.log(error);
            }
          }
        })
      )
    );
  };
}
