function ak(q) {
  return q && q.__esModule && Object.prototype.hasOwnProperty.call(q, "default") ? q.default : q;
}
var m0 = { exports: {} }, Gp = {}, Pm = { exports: {} }, Tt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tR;
function ik() {
  if (tR)
    return Tt;
  tR = 1;
  var q = Symbol.for("react.element"), X = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), zt = Symbol.for("react.strict_mode"), Ut = Symbol.for("react.profiler"), Ie = Symbol.for("react.provider"), S = Symbol.for("react.context"), ct = Symbol.for("react.forward_ref"), de = Symbol.for("react.suspense"), oe = Symbol.for("react.memo"), Xe = Symbol.for("react.lazy"), te = Symbol.iterator;
  function ve(_) {
    return _ === null || typeof _ != "object" ? null : (_ = te && _[te] || _["@@iterator"], typeof _ == "function" ? _ : null);
  }
  var le = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Ve = Object.assign, Ee = {};
  function Ze(_, V, Ue) {
    this.props = _, this.context = V, this.refs = Ee, this.updater = Ue || le;
  }
  Ze.prototype.isReactComponent = {}, Ze.prototype.setState = function(_, V) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, _, V, "setState");
  }, Ze.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function rn() {
  }
  rn.prototype = Ze.prototype;
  function nt(_, V, Ue) {
    this.props = _, this.context = V, this.refs = Ee, this.updater = Ue || le;
  }
  var qe = nt.prototype = new rn();
  qe.constructor = nt, Ve(qe, Ze.prototype), qe.isPureReactComponent = !0;
  var mt = Array.isArray, Oe = Object.prototype.hasOwnProperty, ft = { current: null }, Pe = { key: !0, ref: !0, __self: !0, __source: !0 };
  function an(_, V, Ue) {
    var Be, at = {}, rt = null, St = null;
    if (V != null)
      for (Be in V.ref !== void 0 && (St = V.ref), V.key !== void 0 && (rt = "" + V.key), V)
        Oe.call(V, Be) && !Pe.hasOwnProperty(Be) && (at[Be] = V[Be]);
    var ot = arguments.length - 2;
    if (ot === 1)
      at.children = Ue;
    else if (1 < ot) {
      for (var st = Array(ot), en = 0; en < ot; en++)
        st[en] = arguments[en + 2];
      at.children = st;
    }
    if (_ && _.defaultProps)
      for (Be in ot = _.defaultProps, ot)
        at[Be] === void 0 && (at[Be] = ot[Be]);
    return { $$typeof: q, type: _, key: rt, ref: St, props: at, _owner: ft.current };
  }
  function kn(_, V) {
    return { $$typeof: q, type: _.type, key: V, ref: _.ref, props: _.props, _owner: _._owner };
  }
  function Wt(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === q;
  }
  function kt(_) {
    var V = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(Ue) {
      return V[Ue];
    });
  }
  var Rn = /\/+/g;
  function ze(_, V) {
    return typeof _ == "object" && _ !== null && _.key != null ? kt("" + _.key) : V.toString(36);
  }
  function et(_, V, Ue, Be, at) {
    var rt = typeof _;
    (rt === "undefined" || rt === "boolean") && (_ = null);
    var St = !1;
    if (_ === null)
      St = !0;
    else
      switch (rt) {
        case "string":
        case "number":
          St = !0;
          break;
        case "object":
          switch (_.$$typeof) {
            case q:
            case X:
              St = !0;
          }
      }
    if (St)
      return St = _, at = at(St), _ = Be === "" ? "." + ze(St, 0) : Be, mt(at) ? (Ue = "", _ != null && (Ue = _.replace(Rn, "$&/") + "/"), et(at, V, Ue, "", function(en) {
        return en;
      })) : at != null && (Wt(at) && (at = kn(at, Ue + (!at.key || St && St.key === at.key ? "" : ("" + at.key).replace(Rn, "$&/") + "/") + _)), V.push(at)), 1;
    if (St = 0, Be = Be === "" ? "." : Be + ":", mt(_))
      for (var ot = 0; ot < _.length; ot++) {
        rt = _[ot];
        var st = Be + ze(rt, ot);
        St += et(rt, V, Ue, st, at);
      }
    else if (st = ve(_), typeof st == "function")
      for (_ = st.call(_), ot = 0; !(rt = _.next()).done; )
        rt = rt.value, st = Be + ze(rt, ot++), St += et(rt, V, Ue, st, at);
    else if (rt === "object")
      throw V = String(_), Error("Objects are not valid as a React child (found: " + (V === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : V) + "). If you meant to render a collection of children, use an array instead.");
    return St;
  }
  function Ft(_, V, Ue) {
    if (_ == null)
      return _;
    var Be = [], at = 0;
    return et(_, Be, "", "", function(rt) {
      return V.call(Ue, rt, at++);
    }), Be;
  }
  function bt(_) {
    if (_._status === -1) {
      var V = _._result;
      V = V(), V.then(function(Ue) {
        (_._status === 0 || _._status === -1) && (_._status = 1, _._result = Ue);
      }, function(Ue) {
        (_._status === 0 || _._status === -1) && (_._status = 2, _._result = Ue);
      }), _._status === -1 && (_._status = 0, _._result = V);
    }
    if (_._status === 1)
      return _._result.default;
    throw _._result;
  }
  var me = { current: null }, J = { transition: null }, _e = { ReactCurrentDispatcher: me, ReactCurrentBatchConfig: J, ReactCurrentOwner: ft };
  function ae() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return Tt.Children = { map: Ft, forEach: function(_, V, Ue) {
    Ft(_, function() {
      V.apply(this, arguments);
    }, Ue);
  }, count: function(_) {
    var V = 0;
    return Ft(_, function() {
      V++;
    }), V;
  }, toArray: function(_) {
    return Ft(_, function(V) {
      return V;
    }) || [];
  }, only: function(_) {
    if (!Wt(_))
      throw Error("React.Children.only expected to receive a single React element child.");
    return _;
  } }, Tt.Component = Ze, Tt.Fragment = A, Tt.Profiler = Ut, Tt.PureComponent = nt, Tt.StrictMode = zt, Tt.Suspense = de, Tt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = _e, Tt.act = ae, Tt.cloneElement = function(_, V, Ue) {
    if (_ == null)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + _ + ".");
    var Be = Ve({}, _.props), at = _.key, rt = _.ref, St = _._owner;
    if (V != null) {
      if (V.ref !== void 0 && (rt = V.ref, St = ft.current), V.key !== void 0 && (at = "" + V.key), _.type && _.type.defaultProps)
        var ot = _.type.defaultProps;
      for (st in V)
        Oe.call(V, st) && !Pe.hasOwnProperty(st) && (Be[st] = V[st] === void 0 && ot !== void 0 ? ot[st] : V[st]);
    }
    var st = arguments.length - 2;
    if (st === 1)
      Be.children = Ue;
    else if (1 < st) {
      ot = Array(st);
      for (var en = 0; en < st; en++)
        ot[en] = arguments[en + 2];
      Be.children = ot;
    }
    return { $$typeof: q, type: _.type, key: at, ref: rt, props: Be, _owner: St };
  }, Tt.createContext = function(_) {
    return _ = { $$typeof: S, _currentValue: _, _currentValue2: _, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, _.Provider = { $$typeof: Ie, _context: _ }, _.Consumer = _;
  }, Tt.createElement = an, Tt.createFactory = function(_) {
    var V = an.bind(null, _);
    return V.type = _, V;
  }, Tt.createRef = function() {
    return { current: null };
  }, Tt.forwardRef = function(_) {
    return { $$typeof: ct, render: _ };
  }, Tt.isValidElement = Wt, Tt.lazy = function(_) {
    return { $$typeof: Xe, _payload: { _status: -1, _result: _ }, _init: bt };
  }, Tt.memo = function(_, V) {
    return { $$typeof: oe, type: _, compare: V === void 0 ? null : V };
  }, Tt.startTransition = function(_) {
    var V = J.transition;
    J.transition = {};
    try {
      _();
    } finally {
      J.transition = V;
    }
  }, Tt.unstable_act = ae, Tt.useCallback = function(_, V) {
    return me.current.useCallback(_, V);
  }, Tt.useContext = function(_) {
    return me.current.useContext(_);
  }, Tt.useDebugValue = function() {
  }, Tt.useDeferredValue = function(_) {
    return me.current.useDeferredValue(_);
  }, Tt.useEffect = function(_, V) {
    return me.current.useEffect(_, V);
  }, Tt.useId = function() {
    return me.current.useId();
  }, Tt.useImperativeHandle = function(_, V, Ue) {
    return me.current.useImperativeHandle(_, V, Ue);
  }, Tt.useInsertionEffect = function(_, V) {
    return me.current.useInsertionEffect(_, V);
  }, Tt.useLayoutEffect = function(_, V) {
    return me.current.useLayoutEffect(_, V);
  }, Tt.useMemo = function(_, V) {
    return me.current.useMemo(_, V);
  }, Tt.useReducer = function(_, V, Ue) {
    return me.current.useReducer(_, V, Ue);
  }, Tt.useRef = function(_) {
    return me.current.useRef(_);
  }, Tt.useState = function(_) {
    return me.current.useState(_);
  }, Tt.useSyncExternalStore = function(_, V, Ue) {
    return me.current.useSyncExternalStore(_, V, Ue);
  }, Tt.useTransition = function() {
    return me.current.useTransition();
  }, Tt.version = "18.3.1", Tt;
}
var Kp = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Kp.exports;
var nR;
function lk() {
  return nR || (nR = 1, function(q, X) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var A = "18.3.1", zt = Symbol.for("react.element"), Ut = Symbol.for("react.portal"), Ie = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), ct = Symbol.for("react.profiler"), de = Symbol.for("react.provider"), oe = Symbol.for("react.context"), Xe = Symbol.for("react.forward_ref"), te = Symbol.for("react.suspense"), ve = Symbol.for("react.suspense_list"), le = Symbol.for("react.memo"), Ve = Symbol.for("react.lazy"), Ee = Symbol.for("react.offscreen"), Ze = Symbol.iterator, rn = "@@iterator";
      function nt(h) {
        if (h === null || typeof h != "object")
          return null;
        var C = Ze && h[Ze] || h[rn];
        return typeof C == "function" ? C : null;
      }
      var qe = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, mt = {
        transition: null
      }, Oe = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, ft = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Pe = {}, an = null;
      function kn(h) {
        an = h;
      }
      Pe.setExtraStackFrame = function(h) {
        an = h;
      }, Pe.getCurrentStack = null, Pe.getStackAddendum = function() {
        var h = "";
        an && (h += an);
        var C = Pe.getCurrentStack;
        return C && (h += C() || ""), h;
      };
      var Wt = !1, kt = !1, Rn = !1, ze = !1, et = !1, Ft = {
        ReactCurrentDispatcher: qe,
        ReactCurrentBatchConfig: mt,
        ReactCurrentOwner: ft
      };
      Ft.ReactDebugCurrentFrame = Pe, Ft.ReactCurrentActQueue = Oe;
      function bt(h) {
        {
          for (var C = arguments.length, N = new Array(C > 1 ? C - 1 : 0), j = 1; j < C; j++)
            N[j - 1] = arguments[j];
          J("warn", h, N);
        }
      }
      function me(h) {
        {
          for (var C = arguments.length, N = new Array(C > 1 ? C - 1 : 0), j = 1; j < C; j++)
            N[j - 1] = arguments[j];
          J("error", h, N);
        }
      }
      function J(h, C, N) {
        {
          var j = Ft.ReactDebugCurrentFrame, K = j.getStackAddendum();
          K !== "" && (C += "%s", N = N.concat([K]));
          var je = N.map(function(ie) {
            return String(ie);
          });
          je.unshift("Warning: " + C), Function.prototype.apply.call(console[h], console, je);
        }
      }
      var _e = {};
      function ae(h, C) {
        {
          var N = h.constructor, j = N && (N.displayName || N.name) || "ReactClass", K = j + "." + C;
          if (_e[K])
            return;
          me("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", C, j), _e[K] = !0;
        }
      }
      var _ = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(h) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(h, C, N) {
          ae(h, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(h, C, N, j) {
          ae(h, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(h, C, N, j) {
          ae(h, "setState");
        }
      }, V = Object.assign, Ue = {};
      Object.freeze(Ue);
      function Be(h, C, N) {
        this.props = h, this.context = C, this.refs = Ue, this.updater = N || _;
      }
      Be.prototype.isReactComponent = {}, Be.prototype.setState = function(h, C) {
        if (typeof h != "object" && typeof h != "function" && h != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, h, C, "setState");
      }, Be.prototype.forceUpdate = function(h) {
        this.updater.enqueueForceUpdate(this, h, "forceUpdate");
      };
      {
        var at = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, rt = function(h, C) {
          Object.defineProperty(Be.prototype, h, {
            get: function() {
              bt("%s(...) is deprecated in plain JavaScript React classes. %s", C[0], C[1]);
            }
          });
        };
        for (var St in at)
          at.hasOwnProperty(St) && rt(St, at[St]);
      }
      function ot() {
      }
      ot.prototype = Be.prototype;
      function st(h, C, N) {
        this.props = h, this.context = C, this.refs = Ue, this.updater = N || _;
      }
      var en = st.prototype = new ot();
      en.constructor = st, V(en, Be.prototype), en.isPureReactComponent = !0;
      function mr() {
        var h = {
          current: null
        };
        return Object.seal(h), h;
      }
      var $r = Array.isArray;
      function hn(h) {
        return $r(h);
      }
      function Gn(h) {
        {
          var C = typeof Symbol == "function" && Symbol.toStringTag, N = C && h[Symbol.toStringTag] || h.constructor.name || "Object";
          return N;
        }
      }
      function Pn(h) {
        try {
          return Un(h), !1;
        } catch {
          return !0;
        }
      }
      function Un(h) {
        return "" + h;
      }
      function Dn(h) {
        if (Pn(h))
          return me("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Gn(h)), Un(h);
      }
      function Ir(h, C, N) {
        var j = h.displayName;
        if (j)
          return j;
        var K = C.displayName || C.name || "";
        return K !== "" ? N + "(" + K + ")" : N;
      }
      function Yr(h) {
        return h.displayName || "Context";
      }
      function qn(h) {
        if (h == null)
          return null;
        if (typeof h.tag == "number" && me("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof h == "function")
          return h.displayName || h.name || null;
        if (typeof h == "string")
          return h;
        switch (h) {
          case Ie:
            return "Fragment";
          case Ut:
            return "Portal";
          case ct:
            return "Profiler";
          case S:
            return "StrictMode";
          case te:
            return "Suspense";
          case ve:
            return "SuspenseList";
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case oe:
              var C = h;
              return Yr(C) + ".Consumer";
            case de:
              var N = h;
              return Yr(N._context) + ".Provider";
            case Xe:
              return Ir(h, h.render, "ForwardRef");
            case le:
              var j = h.displayName || null;
              return j !== null ? j : qn(h.type) || "Memo";
            case Ve: {
              var K = h, je = K._payload, ie = K._init;
              try {
                return qn(ie(je));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var yr = Object.prototype.hasOwnProperty, Qr = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, gr, pa, ar;
      ar = {};
      function Wr(h) {
        if (yr.call(h, "ref")) {
          var C = Object.getOwnPropertyDescriptor(h, "ref").get;
          if (C && C.isReactWarning)
            return !1;
        }
        return h.ref !== void 0;
      }
      function mn(h) {
        if (yr.call(h, "key")) {
          var C = Object.getOwnPropertyDescriptor(h, "key").get;
          if (C && C.isReactWarning)
            return !1;
        }
        return h.key !== void 0;
      }
      function br(h, C) {
        var N = function() {
          gr || (gr = !0, me("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        N.isReactWarning = !0, Object.defineProperty(h, "key", {
          get: N,
          configurable: !0
        });
      }
      function di(h, C) {
        var N = function() {
          pa || (pa = !0, me("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        N.isReactWarning = !0, Object.defineProperty(h, "ref", {
          get: N,
          configurable: !0
        });
      }
      function va(h) {
        if (typeof h.ref == "string" && ft.current && h.__self && ft.current.stateNode !== h.__self) {
          var C = qn(ft.current.type);
          ar[C] || (me('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', C, h.ref), ar[C] = !0);
        }
      }
      var ee = function(h, C, N, j, K, je, ie) {
        var Ne = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: zt,
          // Built-in properties that belong on the element
          type: h,
          key: C,
          ref: N,
          props: ie,
          // Record the component responsible for creating this element.
          _owner: je
        };
        return Ne._store = {}, Object.defineProperty(Ne._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(Ne, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: j
        }), Object.defineProperty(Ne, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: K
        }), Object.freeze && (Object.freeze(Ne.props), Object.freeze(Ne)), Ne;
      };
      function ke(h, C, N) {
        var j, K = {}, je = null, ie = null, Ne = null, pt = null;
        if (C != null) {
          Wr(C) && (ie = C.ref, va(C)), mn(C) && (Dn(C.key), je = "" + C.key), Ne = C.__self === void 0 ? null : C.__self, pt = C.__source === void 0 ? null : C.__source;
          for (j in C)
            yr.call(C, j) && !Qr.hasOwnProperty(j) && (K[j] = C[j]);
        }
        var _t = arguments.length - 2;
        if (_t === 1)
          K.children = N;
        else if (_t > 1) {
          for (var Xt = Array(_t), Qt = 0; Qt < _t; Qt++)
            Xt[Qt] = arguments[Qt + 2];
          Object.freeze && Object.freeze(Xt), K.children = Xt;
        }
        if (h && h.defaultProps) {
          var Zt = h.defaultProps;
          for (j in Zt)
            K[j] === void 0 && (K[j] = Zt[j]);
        }
        if (je || ie) {
          var tn = typeof h == "function" ? h.displayName || h.name || "Unknown" : h;
          je && br(K, tn), ie && di(K, tn);
        }
        return ee(h, je, ie, Ne, pt, ft.current, K);
      }
      function it(h, C) {
        var N = ee(h.type, C, h.ref, h._self, h._source, h._owner, h.props);
        return N;
      }
      function At(h, C, N) {
        if (h == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + h + ".");
        var j, K = V({}, h.props), je = h.key, ie = h.ref, Ne = h._self, pt = h._source, _t = h._owner;
        if (C != null) {
          Wr(C) && (ie = C.ref, _t = ft.current), mn(C) && (Dn(C.key), je = "" + C.key);
          var Xt;
          h.type && h.type.defaultProps && (Xt = h.type.defaultProps);
          for (j in C)
            yr.call(C, j) && !Qr.hasOwnProperty(j) && (C[j] === void 0 && Xt !== void 0 ? K[j] = Xt[j] : K[j] = C[j]);
        }
        var Qt = arguments.length - 2;
        if (Qt === 1)
          K.children = N;
        else if (Qt > 1) {
          for (var Zt = Array(Qt), tn = 0; tn < Qt; tn++)
            Zt[tn] = arguments[tn + 2];
          K.children = Zt;
        }
        return ee(h.type, je, ie, Ne, pt, _t, K);
      }
      function Ht(h) {
        return typeof h == "object" && h !== null && h.$$typeof === zt;
      }
      var On = ".", yn = ":";
      function Sr(h) {
        var C = /[=:]/g, N = {
          "=": "=0",
          ":": "=2"
        }, j = h.replace(C, function(K) {
          return N[K];
        });
        return "$" + j;
      }
      var Yt = !1, _r = /\/+/g;
      function Vt(h) {
        return h.replace(_r, "$&/");
      }
      function Pt(h, C) {
        return typeof h == "object" && h !== null && h.key != null ? (Dn(h.key), Sr("" + h.key)) : C.toString(36);
      }
      function ei(h, C, N, j, K) {
        var je = typeof h;
        (je === "undefined" || je === "boolean") && (h = null);
        var ie = !1;
        if (h === null)
          ie = !0;
        else
          switch (je) {
            case "string":
            case "number":
              ie = !0;
              break;
            case "object":
              switch (h.$$typeof) {
                case zt:
                case Ut:
                  ie = !0;
              }
          }
        if (ie) {
          var Ne = h, pt = K(Ne), _t = j === "" ? On + Pt(Ne, 0) : j;
          if (hn(pt)) {
            var Xt = "";
            _t != null && (Xt = Vt(_t) + "/"), ei(pt, C, Xt, "", function(Wf) {
              return Wf;
            });
          } else
            pt != null && (Ht(pt) && (pt.key && (!Ne || Ne.key !== pt.key) && Dn(pt.key), pt = it(
              pt,
              // Keep both the (mapped) and old keys if they differ, just as
              // traverseAllChildren used to do for objects as children
              N + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
              (pt.key && (!Ne || Ne.key !== pt.key) ? (
                // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                // eslint-disable-next-line react-internal/safe-string-coercion
                Vt("" + pt.key) + "/"
              ) : "") + _t
            )), C.push(pt));
          return 1;
        }
        var Qt, Zt, tn = 0, Rt = j === "" ? On : j + yn;
        if (hn(h))
          for (var ji = 0; ji < h.length; ji++)
            Qt = h[ji], Zt = Rt + Pt(Qt, ji), tn += ei(Qt, C, N, Zt, K);
        else {
          var Yu = nt(h);
          if (typeof Yu == "function") {
            var Xo = h;
            Yu === Xo.entries && (Yt || bt("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Yt = !0);
            for (var Qf = Yu.call(Xo), ai, Zo = 0; !(ai = Qf.next()).done; )
              Qt = ai.value, Zt = Rt + Pt(Qt, Zo++), tn += ei(Qt, C, N, Zt, K);
          } else if (je === "object") {
            var Jo = String(h);
            throw new Error("Objects are not valid as a React child (found: " + (Jo === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : Jo) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return tn;
      }
      function Da(h, C, N) {
        if (h == null)
          return h;
        var j = [], K = 0;
        return ei(h, j, "", "", function(je) {
          return C.call(N, je, K++);
        }), j;
      }
      function sl(h) {
        var C = 0;
        return Da(h, function() {
          C++;
        }), C;
      }
      function Wl(h, C, N) {
        Da(h, function() {
          C.apply(this, arguments);
        }, N);
      }
      function zu(h) {
        return Da(h, function(C) {
          return C;
        }) || [];
      }
      function Ni(h) {
        if (!Ht(h))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return h;
      }
      function cl(h) {
        var C = {
          $$typeof: oe,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: h,
          _currentValue2: h,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        C.Provider = {
          $$typeof: de,
          _context: C
        };
        var N = !1, j = !1, K = !1;
        {
          var je = {
            $$typeof: oe,
            _context: C
          };
          Object.defineProperties(je, {
            Provider: {
              get: function() {
                return j || (j = !0, me("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), C.Provider;
              },
              set: function(ie) {
                C.Provider = ie;
              }
            },
            _currentValue: {
              get: function() {
                return C._currentValue;
              },
              set: function(ie) {
                C._currentValue = ie;
              }
            },
            _currentValue2: {
              get: function() {
                return C._currentValue2;
              },
              set: function(ie) {
                C._currentValue2 = ie;
              }
            },
            _threadCount: {
              get: function() {
                return C._threadCount;
              },
              set: function(ie) {
                C._threadCount = ie;
              }
            },
            Consumer: {
              get: function() {
                return N || (N = !0, me("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), C.Consumer;
              }
            },
            displayName: {
              get: function() {
                return C.displayName;
              },
              set: function(ie) {
                K || (bt("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", ie), K = !0);
              }
            }
          }), C.Consumer = je;
        }
        return C._currentRenderer = null, C._currentRenderer2 = null, C;
      }
      var ha = -1, pi = 0, ma = 1, ti = 2;
      function kr(h) {
        if (h._status === ha) {
          var C = h._result, N = C();
          if (N.then(function(je) {
            if (h._status === pi || h._status === ha) {
              var ie = h;
              ie._status = ma, ie._result = je;
            }
          }, function(je) {
            if (h._status === pi || h._status === ha) {
              var ie = h;
              ie._status = ti, ie._result = je;
            }
          }), h._status === ha) {
            var j = h;
            j._status = pi, j._result = N;
          }
        }
        if (h._status === ma) {
          var K = h._result;
          return K === void 0 && me(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, K), "default" in K || me(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, K), K.default;
        } else
          throw h._result;
      }
      function ya(h) {
        var C = {
          // We use these fields to store the result.
          _status: ha,
          _result: h
        }, N = {
          $$typeof: Ve,
          _payload: C,
          _init: kr
        };
        {
          var j, K;
          Object.defineProperties(N, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return j;
              },
              set: function(je) {
                me("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), j = je, Object.defineProperty(N, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return K;
              },
              set: function(je) {
                me("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), K = je, Object.defineProperty(N, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return N;
      }
      function vi(h) {
        h != null && h.$$typeof === le ? me("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof h != "function" ? me("forwardRef requires a render function but was given %s.", h === null ? "null" : typeof h) : h.length !== 0 && h.length !== 2 && me("forwardRef render functions accept exactly two parameters: props and ref. %s", h.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), h != null && (h.defaultProps != null || h.propTypes != null) && me("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var C = {
          $$typeof: Xe,
          render: h
        };
        {
          var N;
          Object.defineProperty(C, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return N;
            },
            set: function(j) {
              N = j, !h.name && !h.displayName && (h.displayName = j);
            }
          });
        }
        return C;
      }
      var hi;
      hi = Symbol.for("react.module.reference");
      function R(h) {
        return !!(typeof h == "string" || typeof h == "function" || h === Ie || h === ct || et || h === S || h === te || h === ve || ze || h === Ee || Wt || kt || Rn || typeof h == "object" && h !== null && (h.$$typeof === Ve || h.$$typeof === le || h.$$typeof === de || h.$$typeof === oe || h.$$typeof === Xe || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        h.$$typeof === hi || h.getModuleId !== void 0));
      }
      function $(h, C) {
        R(h) || me("memo: The first argument must be a component. Instead received: %s", h === null ? "null" : typeof h);
        var N = {
          $$typeof: le,
          type: h,
          compare: C === void 0 ? null : C
        };
        {
          var j;
          Object.defineProperty(N, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return j;
            },
            set: function(K) {
              j = K, !h.name && !h.displayName && (h.displayName = K);
            }
          });
        }
        return N;
      }
      function W() {
        var h = qe.current;
        return h === null && me(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), h;
      }
      function xe(h) {
        var C = W();
        if (h._context !== void 0) {
          var N = h._context;
          N.Consumer === h ? me("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : N.Provider === h && me("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return C.useContext(h);
      }
      function dt(h) {
        var C = W();
        return C.useState(h);
      }
      function Et(h, C, N) {
        var j = W();
        return j.useReducer(h, C, N);
      }
      function Ae(h) {
        var C = W();
        return C.useRef(h);
      }
      function lt(h, C) {
        var N = W();
        return N.useEffect(h, C);
      }
      function An(h, C) {
        var N = W();
        return N.useInsertionEffect(h, C);
      }
      function Kt(h, C) {
        var N = W();
        return N.useLayoutEffect(h, C);
      }
      function ln(h, C) {
        var N = W();
        return N.useCallback(h, C);
      }
      function Er(h, C) {
        var N = W();
        return N.useMemo(h, C);
      }
      function mi(h, C, N) {
        var j = W();
        return j.useImperativeHandle(h, C, N);
      }
      function Dt(h, C) {
        {
          var N = W();
          return N.useDebugValue(h, C);
        }
      }
      function Kn() {
        var h = W();
        return h.useTransition();
      }
      function Dr(h) {
        var C = W();
        return C.useDeferredValue(h);
      }
      function ut() {
        var h = W();
        return h.useId();
      }
      function Oa(h, C, N) {
        var j = W();
        return j.useSyncExternalStore(h, C, N);
      }
      var fl = 0, Uu, dl, Gr, Wo, Or, Go, qo;
      function ec() {
      }
      ec.__reactDisabledLog = !0;
      function Au() {
        {
          if (fl === 0) {
            Uu = console.log, dl = console.info, Gr = console.warn, Wo = console.error, Or = console.group, Go = console.groupCollapsed, qo = console.groupEnd;
            var h = {
              configurable: !0,
              enumerable: !0,
              value: ec,
              writable: !0
            };
            Object.defineProperties(console, {
              info: h,
              log: h,
              warn: h,
              error: h,
              group: h,
              groupCollapsed: h,
              groupEnd: h
            });
          }
          fl++;
        }
      }
      function pl() {
        {
          if (fl--, fl === 0) {
            var h = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: V({}, h, {
                value: Uu
              }),
              info: V({}, h, {
                value: dl
              }),
              warn: V({}, h, {
                value: Gr
              }),
              error: V({}, h, {
                value: Wo
              }),
              group: V({}, h, {
                value: Or
              }),
              groupCollapsed: V({}, h, {
                value: Go
              }),
              groupEnd: V({}, h, {
                value: qo
              })
            });
          }
          fl < 0 && me("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ni = Ft.ReactCurrentDispatcher, Lr;
      function vl(h, C, N) {
        {
          if (Lr === void 0)
            try {
              throw Error();
            } catch (K) {
              var j = K.stack.trim().match(/\n( *(at )?)/);
              Lr = j && j[1] || "";
            }
          return `
` + Lr + h;
        }
      }
      var hl = !1, ml;
      {
        var ju = typeof WeakMap == "function" ? WeakMap : Map;
        ml = new ju();
      }
      function Fu(h, C) {
        if (!h || hl)
          return "";
        {
          var N = ml.get(h);
          if (N !== void 0)
            return N;
        }
        var j;
        hl = !0;
        var K = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var je;
        je = ni.current, ni.current = null, Au();
        try {
          if (C) {
            var ie = function() {
              throw Error();
            };
            if (Object.defineProperty(ie.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(ie, []);
              } catch (Rt) {
                j = Rt;
              }
              Reflect.construct(h, [], ie);
            } else {
              try {
                ie.call();
              } catch (Rt) {
                j = Rt;
              }
              h.call(ie.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (Rt) {
              j = Rt;
            }
            h();
          }
        } catch (Rt) {
          if (Rt && j && typeof Rt.stack == "string") {
            for (var Ne = Rt.stack.split(`
`), pt = j.stack.split(`
`), _t = Ne.length - 1, Xt = pt.length - 1; _t >= 1 && Xt >= 0 && Ne[_t] !== pt[Xt]; )
              Xt--;
            for (; _t >= 1 && Xt >= 0; _t--, Xt--)
              if (Ne[_t] !== pt[Xt]) {
                if (_t !== 1 || Xt !== 1)
                  do
                    if (_t--, Xt--, Xt < 0 || Ne[_t] !== pt[Xt]) {
                      var Qt = `
` + Ne[_t].replace(" at new ", " at ");
                      return h.displayName && Qt.includes("<anonymous>") && (Qt = Qt.replace("<anonymous>", h.displayName)), typeof h == "function" && ml.set(h, Qt), Qt;
                    }
                  while (_t >= 1 && Xt >= 0);
                break;
              }
          }
        } finally {
          hl = !1, ni.current = je, pl(), Error.prepareStackTrace = K;
        }
        var Zt = h ? h.displayName || h.name : "", tn = Zt ? vl(Zt) : "";
        return typeof h == "function" && ml.set(h, tn), tn;
      }
      function zi(h, C, N) {
        return Fu(h, !1);
      }
      function Yf(h) {
        var C = h.prototype;
        return !!(C && C.isReactComponent);
      }
      function yi(h, C, N) {
        if (h == null)
          return "";
        if (typeof h == "function")
          return Fu(h, Yf(h));
        if (typeof h == "string")
          return vl(h);
        switch (h) {
          case te:
            return vl("Suspense");
          case ve:
            return vl("SuspenseList");
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case Xe:
              return zi(h.render);
            case le:
              return yi(h.type, C, N);
            case Ve: {
              var j = h, K = j._payload, je = j._init;
              try {
                return yi(je(K), C, N);
              } catch {
              }
            }
          }
        return "";
      }
      var Ot = {}, Hu = Ft.ReactDebugCurrentFrame;
      function Gl(h) {
        if (h) {
          var C = h._owner, N = yi(h.type, h._source, C ? C.type : null);
          Hu.setExtraStackFrame(N);
        } else
          Hu.setExtraStackFrame(null);
      }
      function Vu(h, C, N, j, K) {
        {
          var je = Function.call.bind(yr);
          for (var ie in h)
            if (je(h, ie)) {
              var Ne = void 0;
              try {
                if (typeof h[ie] != "function") {
                  var pt = Error((j || "React class") + ": " + N + " type `" + ie + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof h[ie] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw pt.name = "Invariant Violation", pt;
                }
                Ne = h[ie](C, ie, j, N, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (_t) {
                Ne = _t;
              }
              Ne && !(Ne instanceof Error) && (Gl(K), me("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", j || "React class", N, ie, typeof Ne), Gl(null)), Ne instanceof Error && !(Ne.message in Ot) && (Ot[Ne.message] = !0, Gl(K), me("Failed %s type: %s", N, Ne.message), Gl(null));
            }
        }
      }
      function Ct(h) {
        if (h) {
          var C = h._owner, N = yi(h.type, h._source, C ? C.type : null);
          kn(N);
        } else
          kn(null);
      }
      var Pu;
      Pu = !1;
      function Bu() {
        if (ft.current) {
          var h = qn(ft.current.type);
          if (h)
            return `

Check the render method of \`` + h + "`.";
        }
        return "";
      }
      function We(h) {
        if (h !== void 0) {
          var C = h.fileName.replace(/^.*[\\\/]/, ""), N = h.lineNumber;
          return `

Check your code at ` + C + ":" + N + ".";
        }
        return "";
      }
      function ql(h) {
        return h != null ? We(h.__source) : "";
      }
      var gn = {};
      function qr(h) {
        var C = Bu();
        if (!C) {
          var N = typeof h == "string" ? h : h.displayName || h.name;
          N && (C = `

Check the top-level render call using <` + N + ">.");
        }
        return C;
      }
      function Mr(h, C) {
        if (!(!h._store || h._store.validated || h.key != null)) {
          h._store.validated = !0;
          var N = qr(C);
          if (!gn[N]) {
            gn[N] = !0;
            var j = "";
            h && h._owner && h._owner !== ft.current && (j = " It was passed a child from " + qn(h._owner.type) + "."), Ct(h), me('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', N, j), Ct(null);
          }
        }
      }
      function yl(h, C) {
        if (typeof h == "object") {
          if (hn(h))
            for (var N = 0; N < h.length; N++) {
              var j = h[N];
              Ht(j) && Mr(j, C);
            }
          else if (Ht(h))
            h._store && (h._store.validated = !0);
          else if (h) {
            var K = nt(h);
            if (typeof K == "function" && K !== h.entries)
              for (var je = K.call(h), ie; !(ie = je.next()).done; )
                Ht(ie.value) && Mr(ie.value, C);
          }
        }
      }
      function Tn(h) {
        {
          var C = h.type;
          if (C == null || typeof C == "string")
            return;
          var N;
          if (typeof C == "function")
            N = C.propTypes;
          else if (typeof C == "object" && (C.$$typeof === Xe || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          C.$$typeof === le))
            N = C.propTypes;
          else
            return;
          if (N) {
            var j = qn(C);
            Vu(N, h.props, "prop", j, h);
          } else if (C.PropTypes !== void 0 && !Pu) {
            Pu = !0;
            var K = qn(C);
            me("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", K || "Unknown");
          }
          typeof C.getDefaultProps == "function" && !C.getDefaultProps.isReactClassApproved && me("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Bt(h) {
        {
          for (var C = Object.keys(h.props), N = 0; N < C.length; N++) {
            var j = C[N];
            if (j !== "children" && j !== "key") {
              Ct(h), me("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", j), Ct(null);
              break;
            }
          }
          h.ref !== null && (Ct(h), me("Invalid attribute `ref` supplied to `React.Fragment`."), Ct(null));
        }
      }
      function tc(h, C, N) {
        var j = R(h);
        if (!j) {
          var K = "";
          (h === void 0 || typeof h == "object" && h !== null && Object.keys(h).length === 0) && (K += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var je = ql(C);
          je ? K += je : K += Bu();
          var ie;
          h === null ? ie = "null" : hn(h) ? ie = "array" : h !== void 0 && h.$$typeof === zt ? (ie = "<" + (qn(h.type) || "Unknown") + " />", K = " Did you accidentally export a JSX literal instead of a component?") : ie = typeof h, me("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ie, K);
        }
        var Ne = ke.apply(this, arguments);
        if (Ne == null)
          return Ne;
        if (j)
          for (var pt = 2; pt < arguments.length; pt++)
            yl(arguments[pt], h);
        return h === Ie ? Bt(Ne) : Tn(Ne), Ne;
      }
      var Kr = !1;
      function Xn(h) {
        var C = tc.bind(null, h);
        return C.type = h, Kr || (Kr = !0, bt("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(C, "type", {
          enumerable: !1,
          get: function() {
            return bt("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: h
            }), h;
          }
        }), C;
      }
      function gi(h, C, N) {
        for (var j = At.apply(this, arguments), K = 2; K < arguments.length; K++)
          yl(arguments[K], j.type);
        return Tn(j), j;
      }
      function nc(h, C) {
        var N = mt.transition;
        mt.transition = {};
        var j = mt.transition;
        mt.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          h();
        } finally {
          if (mt.transition = N, N === null && j._updatedFibers) {
            var K = j._updatedFibers.size;
            K > 10 && bt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), j._updatedFibers.clear();
          }
        }
      }
      var Ui = !1, gl = null;
      function rc(h) {
        if (gl === null)
          try {
            var C = ("require" + Math.random()).slice(0, 7), N = q && q[C];
            gl = N.call(q, "timers").setImmediate;
          } catch {
            gl = function(K) {
              Ui === !1 && (Ui = !0, typeof MessageChannel > "u" && me("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var je = new MessageChannel();
              je.port1.onmessage = K, je.port2.postMessage(void 0);
            };
          }
        return gl(h);
      }
      var La = 0, Sl = !1;
      function Ai(h) {
        {
          var C = La;
          La++, Oe.current === null && (Oe.current = []);
          var N = Oe.isBatchingLegacy, j;
          try {
            if (Oe.isBatchingLegacy = !0, j = h(), !N && Oe.didScheduleLegacyUpdate) {
              var K = Oe.current;
              K !== null && (Oe.didScheduleLegacyUpdate = !1, Cl(K));
            }
          } catch (Zt) {
            throw Ma(C), Zt;
          } finally {
            Oe.isBatchingLegacy = N;
          }
          if (j !== null && typeof j == "object" && typeof j.then == "function") {
            var je = j, ie = !1, Ne = {
              then: function(Zt, tn) {
                ie = !0, je.then(function(Rt) {
                  Ma(C), La === 0 ? $u(Rt, Zt, tn) : Zt(Rt);
                }, function(Rt) {
                  Ma(C), tn(Rt);
                });
              }
            };
            return !Sl && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              ie || (Sl = !0, me("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), Ne;
          } else {
            var pt = j;
            if (Ma(C), La === 0) {
              var _t = Oe.current;
              _t !== null && (Cl(_t), Oe.current = null);
              var Xt = {
                then: function(Zt, tn) {
                  Oe.current === null ? (Oe.current = [], $u(pt, Zt, tn)) : Zt(pt);
                }
              };
              return Xt;
            } else {
              var Qt = {
                then: function(Zt, tn) {
                  Zt(pt);
                }
              };
              return Qt;
            }
          }
        }
      }
      function Ma(h) {
        h !== La - 1 && me("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), La = h;
      }
      function $u(h, C, N) {
        {
          var j = Oe.current;
          if (j !== null)
            try {
              Cl(j), rc(function() {
                j.length === 0 ? (Oe.current = null, C(h)) : $u(h, C, N);
              });
            } catch (K) {
              N(K);
            }
          else
            C(h);
        }
      }
      var El = !1;
      function Cl(h) {
        if (!El) {
          El = !0;
          var C = 0;
          try {
            for (; C < h.length; C++) {
              var N = h[C];
              do
                N = N(!0);
              while (N !== null);
            }
            h.length = 0;
          } catch (j) {
            throw h = h.slice(C + 1), j;
          } finally {
            El = !1;
          }
        }
      }
      var Kl = tc, Iu = gi, Ko = Xn, ri = {
        map: Da,
        forEach: Wl,
        count: sl,
        toArray: zu,
        only: Ni
      };
      X.Children = ri, X.Component = Be, X.Fragment = Ie, X.Profiler = ct, X.PureComponent = st, X.StrictMode = S, X.Suspense = te, X.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ft, X.act = Ai, X.cloneElement = Iu, X.createContext = cl, X.createElement = Kl, X.createFactory = Ko, X.createRef = mr, X.forwardRef = vi, X.isValidElement = Ht, X.lazy = ya, X.memo = $, X.startTransition = nc, X.unstable_act = Ai, X.useCallback = ln, X.useContext = xe, X.useDebugValue = Dt, X.useDeferredValue = Dr, X.useEffect = lt, X.useId = ut, X.useImperativeHandle = mi, X.useInsertionEffect = An, X.useLayoutEffect = Kt, X.useMemo = Er, X.useReducer = Et, X.useRef = Ae, X.useState = dt, X.useSyncExternalStore = Oa, X.useTransition = Kn, X.version = A, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(Kp, Kp.exports)), Kp.exports;
}
var rR;
function Xp() {
  return rR || (rR = 1, process.env.NODE_ENV === "production" ? Pm.exports = ik() : Pm.exports = lk()), Pm.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aR;
function uk() {
  if (aR)
    return Gp;
  aR = 1;
  var q = Xp(), X = Symbol.for("react.element"), A = Symbol.for("react.fragment"), zt = Object.prototype.hasOwnProperty, Ut = q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Ie = { key: !0, ref: !0, __self: !0, __source: !0 };
  function S(ct, de, oe) {
    var Xe, te = {}, ve = null, le = null;
    oe !== void 0 && (ve = "" + oe), de.key !== void 0 && (ve = "" + de.key), de.ref !== void 0 && (le = de.ref);
    for (Xe in de)
      zt.call(de, Xe) && !Ie.hasOwnProperty(Xe) && (te[Xe] = de[Xe]);
    if (ct && ct.defaultProps)
      for (Xe in de = ct.defaultProps, de)
        te[Xe] === void 0 && (te[Xe] = de[Xe]);
    return { $$typeof: X, type: ct, key: ve, ref: le, props: te, _owner: Ut.current };
  }
  return Gp.Fragment = A, Gp.jsx = S, Gp.jsxs = S, Gp;
}
var qp = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var iR;
function ok() {
  return iR || (iR = 1, process.env.NODE_ENV !== "production" && function() {
    var q = Xp(), X = Symbol.for("react.element"), A = Symbol.for("react.portal"), zt = Symbol.for("react.fragment"), Ut = Symbol.for("react.strict_mode"), Ie = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), ct = Symbol.for("react.context"), de = Symbol.for("react.forward_ref"), oe = Symbol.for("react.suspense"), Xe = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), ve = Symbol.for("react.lazy"), le = Symbol.for("react.offscreen"), Ve = Symbol.iterator, Ee = "@@iterator";
    function Ze(R) {
      if (R === null || typeof R != "object")
        return null;
      var $ = Ve && R[Ve] || R[Ee];
      return typeof $ == "function" ? $ : null;
    }
    var rn = q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function nt(R) {
      {
        for (var $ = arguments.length, W = new Array($ > 1 ? $ - 1 : 0), xe = 1; xe < $; xe++)
          W[xe - 1] = arguments[xe];
        qe("error", R, W);
      }
    }
    function qe(R, $, W) {
      {
        var xe = rn.ReactDebugCurrentFrame, dt = xe.getStackAddendum();
        dt !== "" && ($ += "%s", W = W.concat([dt]));
        var Et = W.map(function(Ae) {
          return String(Ae);
        });
        Et.unshift("Warning: " + $), Function.prototype.apply.call(console[R], console, Et);
      }
    }
    var mt = !1, Oe = !1, ft = !1, Pe = !1, an = !1, kn;
    kn = Symbol.for("react.module.reference");
    function Wt(R) {
      return !!(typeof R == "string" || typeof R == "function" || R === zt || R === Ie || an || R === Ut || R === oe || R === Xe || Pe || R === le || mt || Oe || ft || typeof R == "object" && R !== null && (R.$$typeof === ve || R.$$typeof === te || R.$$typeof === S || R.$$typeof === ct || R.$$typeof === de || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      R.$$typeof === kn || R.getModuleId !== void 0));
    }
    function kt(R, $, W) {
      var xe = R.displayName;
      if (xe)
        return xe;
      var dt = $.displayName || $.name || "";
      return dt !== "" ? W + "(" + dt + ")" : W;
    }
    function Rn(R) {
      return R.displayName || "Context";
    }
    function ze(R) {
      if (R == null)
        return null;
      if (typeof R.tag == "number" && nt("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof R == "function")
        return R.displayName || R.name || null;
      if (typeof R == "string")
        return R;
      switch (R) {
        case zt:
          return "Fragment";
        case A:
          return "Portal";
        case Ie:
          return "Profiler";
        case Ut:
          return "StrictMode";
        case oe:
          return "Suspense";
        case Xe:
          return "SuspenseList";
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case ct:
            var $ = R;
            return Rn($) + ".Consumer";
          case S:
            var W = R;
            return Rn(W._context) + ".Provider";
          case de:
            return kt(R, R.render, "ForwardRef");
          case te:
            var xe = R.displayName || null;
            return xe !== null ? xe : ze(R.type) || "Memo";
          case ve: {
            var dt = R, Et = dt._payload, Ae = dt._init;
            try {
              return ze(Ae(Et));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var et = Object.assign, Ft = 0, bt, me, J, _e, ae, _, V;
    function Ue() {
    }
    Ue.__reactDisabledLog = !0;
    function Be() {
      {
        if (Ft === 0) {
          bt = console.log, me = console.info, J = console.warn, _e = console.error, ae = console.group, _ = console.groupCollapsed, V = console.groupEnd;
          var R = {
            configurable: !0,
            enumerable: !0,
            value: Ue,
            writable: !0
          };
          Object.defineProperties(console, {
            info: R,
            log: R,
            warn: R,
            error: R,
            group: R,
            groupCollapsed: R,
            groupEnd: R
          });
        }
        Ft++;
      }
    }
    function at() {
      {
        if (Ft--, Ft === 0) {
          var R = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: et({}, R, {
              value: bt
            }),
            info: et({}, R, {
              value: me
            }),
            warn: et({}, R, {
              value: J
            }),
            error: et({}, R, {
              value: _e
            }),
            group: et({}, R, {
              value: ae
            }),
            groupCollapsed: et({}, R, {
              value: _
            }),
            groupEnd: et({}, R, {
              value: V
            })
          });
        }
        Ft < 0 && nt("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var rt = rn.ReactCurrentDispatcher, St;
    function ot(R, $, W) {
      {
        if (St === void 0)
          try {
            throw Error();
          } catch (dt) {
            var xe = dt.stack.trim().match(/\n( *(at )?)/);
            St = xe && xe[1] || "";
          }
        return `
` + St + R;
      }
    }
    var st = !1, en;
    {
      var mr = typeof WeakMap == "function" ? WeakMap : Map;
      en = new mr();
    }
    function $r(R, $) {
      if (!R || st)
        return "";
      {
        var W = en.get(R);
        if (W !== void 0)
          return W;
      }
      var xe;
      st = !0;
      var dt = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Et;
      Et = rt.current, rt.current = null, Be();
      try {
        if ($) {
          var Ae = function() {
            throw Error();
          };
          if (Object.defineProperty(Ae.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(Ae, []);
            } catch (Kn) {
              xe = Kn;
            }
            Reflect.construct(R, [], Ae);
          } else {
            try {
              Ae.call();
            } catch (Kn) {
              xe = Kn;
            }
            R.call(Ae.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Kn) {
            xe = Kn;
          }
          R();
        }
      } catch (Kn) {
        if (Kn && xe && typeof Kn.stack == "string") {
          for (var lt = Kn.stack.split(`
`), An = xe.stack.split(`
`), Kt = lt.length - 1, ln = An.length - 1; Kt >= 1 && ln >= 0 && lt[Kt] !== An[ln]; )
            ln--;
          for (; Kt >= 1 && ln >= 0; Kt--, ln--)
            if (lt[Kt] !== An[ln]) {
              if (Kt !== 1 || ln !== 1)
                do
                  if (Kt--, ln--, ln < 0 || lt[Kt] !== An[ln]) {
                    var Er = `
` + lt[Kt].replace(" at new ", " at ");
                    return R.displayName && Er.includes("<anonymous>") && (Er = Er.replace("<anonymous>", R.displayName)), typeof R == "function" && en.set(R, Er), Er;
                  }
                while (Kt >= 1 && ln >= 0);
              break;
            }
        }
      } finally {
        st = !1, rt.current = Et, at(), Error.prepareStackTrace = dt;
      }
      var mi = R ? R.displayName || R.name : "", Dt = mi ? ot(mi) : "";
      return typeof R == "function" && en.set(R, Dt), Dt;
    }
    function hn(R, $, W) {
      return $r(R, !1);
    }
    function Gn(R) {
      var $ = R.prototype;
      return !!($ && $.isReactComponent);
    }
    function Pn(R, $, W) {
      if (R == null)
        return "";
      if (typeof R == "function")
        return $r(R, Gn(R));
      if (typeof R == "string")
        return ot(R);
      switch (R) {
        case oe:
          return ot("Suspense");
        case Xe:
          return ot("SuspenseList");
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case de:
            return hn(R.render);
          case te:
            return Pn(R.type, $, W);
          case ve: {
            var xe = R, dt = xe._payload, Et = xe._init;
            try {
              return Pn(Et(dt), $, W);
            } catch {
            }
          }
        }
      return "";
    }
    var Un = Object.prototype.hasOwnProperty, Dn = {}, Ir = rn.ReactDebugCurrentFrame;
    function Yr(R) {
      if (R) {
        var $ = R._owner, W = Pn(R.type, R._source, $ ? $.type : null);
        Ir.setExtraStackFrame(W);
      } else
        Ir.setExtraStackFrame(null);
    }
    function qn(R, $, W, xe, dt) {
      {
        var Et = Function.call.bind(Un);
        for (var Ae in R)
          if (Et(R, Ae)) {
            var lt = void 0;
            try {
              if (typeof R[Ae] != "function") {
                var An = Error((xe || "React class") + ": " + W + " type `" + Ae + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof R[Ae] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw An.name = "Invariant Violation", An;
              }
              lt = R[Ae]($, Ae, xe, W, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Kt) {
              lt = Kt;
            }
            lt && !(lt instanceof Error) && (Yr(dt), nt("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", xe || "React class", W, Ae, typeof lt), Yr(null)), lt instanceof Error && !(lt.message in Dn) && (Dn[lt.message] = !0, Yr(dt), nt("Failed %s type: %s", W, lt.message), Yr(null));
          }
      }
    }
    var yr = Array.isArray;
    function Qr(R) {
      return yr(R);
    }
    function gr(R) {
      {
        var $ = typeof Symbol == "function" && Symbol.toStringTag, W = $ && R[Symbol.toStringTag] || R.constructor.name || "Object";
        return W;
      }
    }
    function pa(R) {
      try {
        return ar(R), !1;
      } catch {
        return !0;
      }
    }
    function ar(R) {
      return "" + R;
    }
    function Wr(R) {
      if (pa(R))
        return nt("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", gr(R)), ar(R);
    }
    var mn = rn.ReactCurrentOwner, br = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, di, va, ee;
    ee = {};
    function ke(R) {
      if (Un.call(R, "ref")) {
        var $ = Object.getOwnPropertyDescriptor(R, "ref").get;
        if ($ && $.isReactWarning)
          return !1;
      }
      return R.ref !== void 0;
    }
    function it(R) {
      if (Un.call(R, "key")) {
        var $ = Object.getOwnPropertyDescriptor(R, "key").get;
        if ($ && $.isReactWarning)
          return !1;
      }
      return R.key !== void 0;
    }
    function At(R, $) {
      if (typeof R.ref == "string" && mn.current && $ && mn.current.stateNode !== $) {
        var W = ze(mn.current.type);
        ee[W] || (nt('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', ze(mn.current.type), R.ref), ee[W] = !0);
      }
    }
    function Ht(R, $) {
      {
        var W = function() {
          di || (di = !0, nt("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", $));
        };
        W.isReactWarning = !0, Object.defineProperty(R, "key", {
          get: W,
          configurable: !0
        });
      }
    }
    function On(R, $) {
      {
        var W = function() {
          va || (va = !0, nt("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", $));
        };
        W.isReactWarning = !0, Object.defineProperty(R, "ref", {
          get: W,
          configurable: !0
        });
      }
    }
    var yn = function(R, $, W, xe, dt, Et, Ae) {
      var lt = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: X,
        // Built-in properties that belong on the element
        type: R,
        key: $,
        ref: W,
        props: Ae,
        // Record the component responsible for creating this element.
        _owner: Et
      };
      return lt._store = {}, Object.defineProperty(lt._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(lt, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: xe
      }), Object.defineProperty(lt, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: dt
      }), Object.freeze && (Object.freeze(lt.props), Object.freeze(lt)), lt;
    };
    function Sr(R, $, W, xe, dt) {
      {
        var Et, Ae = {}, lt = null, An = null;
        W !== void 0 && (Wr(W), lt = "" + W), it($) && (Wr($.key), lt = "" + $.key), ke($) && (An = $.ref, At($, dt));
        for (Et in $)
          Un.call($, Et) && !br.hasOwnProperty(Et) && (Ae[Et] = $[Et]);
        if (R && R.defaultProps) {
          var Kt = R.defaultProps;
          for (Et in Kt)
            Ae[Et] === void 0 && (Ae[Et] = Kt[Et]);
        }
        if (lt || An) {
          var ln = typeof R == "function" ? R.displayName || R.name || "Unknown" : R;
          lt && Ht(Ae, ln), An && On(Ae, ln);
        }
        return yn(R, lt, An, dt, xe, mn.current, Ae);
      }
    }
    var Yt = rn.ReactCurrentOwner, _r = rn.ReactDebugCurrentFrame;
    function Vt(R) {
      if (R) {
        var $ = R._owner, W = Pn(R.type, R._source, $ ? $.type : null);
        _r.setExtraStackFrame(W);
      } else
        _r.setExtraStackFrame(null);
    }
    var Pt;
    Pt = !1;
    function ei(R) {
      return typeof R == "object" && R !== null && R.$$typeof === X;
    }
    function Da() {
      {
        if (Yt.current) {
          var R = ze(Yt.current.type);
          if (R)
            return `

Check the render method of \`` + R + "`.";
        }
        return "";
      }
    }
    function sl(R) {
      {
        if (R !== void 0) {
          var $ = R.fileName.replace(/^.*[\\\/]/, ""), W = R.lineNumber;
          return `

Check your code at ` + $ + ":" + W + ".";
        }
        return "";
      }
    }
    var Wl = {};
    function zu(R) {
      {
        var $ = Da();
        if (!$) {
          var W = typeof R == "string" ? R : R.displayName || R.name;
          W && ($ = `

Check the top-level render call using <` + W + ">.");
        }
        return $;
      }
    }
    function Ni(R, $) {
      {
        if (!R._store || R._store.validated || R.key != null)
          return;
        R._store.validated = !0;
        var W = zu($);
        if (Wl[W])
          return;
        Wl[W] = !0;
        var xe = "";
        R && R._owner && R._owner !== Yt.current && (xe = " It was passed a child from " + ze(R._owner.type) + "."), Vt(R), nt('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', W, xe), Vt(null);
      }
    }
    function cl(R, $) {
      {
        if (typeof R != "object")
          return;
        if (Qr(R))
          for (var W = 0; W < R.length; W++) {
            var xe = R[W];
            ei(xe) && Ni(xe, $);
          }
        else if (ei(R))
          R._store && (R._store.validated = !0);
        else if (R) {
          var dt = Ze(R);
          if (typeof dt == "function" && dt !== R.entries)
            for (var Et = dt.call(R), Ae; !(Ae = Et.next()).done; )
              ei(Ae.value) && Ni(Ae.value, $);
        }
      }
    }
    function ha(R) {
      {
        var $ = R.type;
        if ($ == null || typeof $ == "string")
          return;
        var W;
        if (typeof $ == "function")
          W = $.propTypes;
        else if (typeof $ == "object" && ($.$$typeof === de || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        $.$$typeof === te))
          W = $.propTypes;
        else
          return;
        if (W) {
          var xe = ze($);
          qn(W, R.props, "prop", xe, R);
        } else if ($.PropTypes !== void 0 && !Pt) {
          Pt = !0;
          var dt = ze($);
          nt("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", dt || "Unknown");
        }
        typeof $.getDefaultProps == "function" && !$.getDefaultProps.isReactClassApproved && nt("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function pi(R) {
      {
        for (var $ = Object.keys(R.props), W = 0; W < $.length; W++) {
          var xe = $[W];
          if (xe !== "children" && xe !== "key") {
            Vt(R), nt("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", xe), Vt(null);
            break;
          }
        }
        R.ref !== null && (Vt(R), nt("Invalid attribute `ref` supplied to `React.Fragment`."), Vt(null));
      }
    }
    var ma = {};
    function ti(R, $, W, xe, dt, Et) {
      {
        var Ae = Wt(R);
        if (!Ae) {
          var lt = "";
          (R === void 0 || typeof R == "object" && R !== null && Object.keys(R).length === 0) && (lt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var An = sl(dt);
          An ? lt += An : lt += Da();
          var Kt;
          R === null ? Kt = "null" : Qr(R) ? Kt = "array" : R !== void 0 && R.$$typeof === X ? (Kt = "<" + (ze(R.type) || "Unknown") + " />", lt = " Did you accidentally export a JSX literal instead of a component?") : Kt = typeof R, nt("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Kt, lt);
        }
        var ln = Sr(R, $, W, dt, Et);
        if (ln == null)
          return ln;
        if (Ae) {
          var Er = $.children;
          if (Er !== void 0)
            if (xe)
              if (Qr(Er)) {
                for (var mi = 0; mi < Er.length; mi++)
                  cl(Er[mi], R);
                Object.freeze && Object.freeze(Er);
              } else
                nt("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              cl(Er, R);
        }
        if (Un.call($, "key")) {
          var Dt = ze(R), Kn = Object.keys($).filter(function(Oa) {
            return Oa !== "key";
          }), Dr = Kn.length > 0 ? "{key: someKey, " + Kn.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!ma[Dt + Dr]) {
            var ut = Kn.length > 0 ? "{" + Kn.join(": ..., ") + ": ...}" : "{}";
            nt(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Dr, Dt, ut, Dt), ma[Dt + Dr] = !0;
          }
        }
        return R === zt ? pi(ln) : ha(ln), ln;
      }
    }
    function kr(R, $, W) {
      return ti(R, $, W, !0);
    }
    function ya(R, $, W) {
      return ti(R, $, W, !1);
    }
    var vi = ya, hi = kr;
    qp.Fragment = zt, qp.jsx = vi, qp.jsxs = hi;
  }()), qp;
}
process.env.NODE_ENV === "production" ? m0.exports = uk() : m0.exports = ok();
var ht = m0.exports, y0 = { exports: {} }, Za = {}, Bm = { exports: {} }, p0 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lR;
function sk() {
  return lR || (lR = 1, function(q) {
    function X(J, _e) {
      var ae = J.length;
      J.push(_e);
      e:
        for (; 0 < ae; ) {
          var _ = ae - 1 >>> 1, V = J[_];
          if (0 < Ut(V, _e))
            J[_] = _e, J[ae] = V, ae = _;
          else
            break e;
        }
    }
    function A(J) {
      return J.length === 0 ? null : J[0];
    }
    function zt(J) {
      if (J.length === 0)
        return null;
      var _e = J[0], ae = J.pop();
      if (ae !== _e) {
        J[0] = ae;
        e:
          for (var _ = 0, V = J.length, Ue = V >>> 1; _ < Ue; ) {
            var Be = 2 * (_ + 1) - 1, at = J[Be], rt = Be + 1, St = J[rt];
            if (0 > Ut(at, ae))
              rt < V && 0 > Ut(St, at) ? (J[_] = St, J[rt] = ae, _ = rt) : (J[_] = at, J[Be] = ae, _ = Be);
            else if (rt < V && 0 > Ut(St, ae))
              J[_] = St, J[rt] = ae, _ = rt;
            else
              break e;
          }
      }
      return _e;
    }
    function Ut(J, _e) {
      var ae = J.sortIndex - _e.sortIndex;
      return ae !== 0 ? ae : J.id - _e.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var Ie = performance;
      q.unstable_now = function() {
        return Ie.now();
      };
    } else {
      var S = Date, ct = S.now();
      q.unstable_now = function() {
        return S.now() - ct;
      };
    }
    var de = [], oe = [], Xe = 1, te = null, ve = 3, le = !1, Ve = !1, Ee = !1, Ze = typeof setTimeout == "function" ? setTimeout : null, rn = typeof clearTimeout == "function" ? clearTimeout : null, nt = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function qe(J) {
      for (var _e = A(oe); _e !== null; ) {
        if (_e.callback === null)
          zt(oe);
        else if (_e.startTime <= J)
          zt(oe), _e.sortIndex = _e.expirationTime, X(de, _e);
        else
          break;
        _e = A(oe);
      }
    }
    function mt(J) {
      if (Ee = !1, qe(J), !Ve)
        if (A(de) !== null)
          Ve = !0, bt(Oe);
        else {
          var _e = A(oe);
          _e !== null && me(mt, _e.startTime - J);
        }
    }
    function Oe(J, _e) {
      Ve = !1, Ee && (Ee = !1, rn(an), an = -1), le = !0;
      var ae = ve;
      try {
        for (qe(_e), te = A(de); te !== null && (!(te.expirationTime > _e) || J && !kt()); ) {
          var _ = te.callback;
          if (typeof _ == "function") {
            te.callback = null, ve = te.priorityLevel;
            var V = _(te.expirationTime <= _e);
            _e = q.unstable_now(), typeof V == "function" ? te.callback = V : te === A(de) && zt(de), qe(_e);
          } else
            zt(de);
          te = A(de);
        }
        if (te !== null)
          var Ue = !0;
        else {
          var Be = A(oe);
          Be !== null && me(mt, Be.startTime - _e), Ue = !1;
        }
        return Ue;
      } finally {
        te = null, ve = ae, le = !1;
      }
    }
    var ft = !1, Pe = null, an = -1, kn = 5, Wt = -1;
    function kt() {
      return !(q.unstable_now() - Wt < kn);
    }
    function Rn() {
      if (Pe !== null) {
        var J = q.unstable_now();
        Wt = J;
        var _e = !0;
        try {
          _e = Pe(!0, J);
        } finally {
          _e ? ze() : (ft = !1, Pe = null);
        }
      } else
        ft = !1;
    }
    var ze;
    if (typeof nt == "function")
      ze = function() {
        nt(Rn);
      };
    else if (typeof MessageChannel < "u") {
      var et = new MessageChannel(), Ft = et.port2;
      et.port1.onmessage = Rn, ze = function() {
        Ft.postMessage(null);
      };
    } else
      ze = function() {
        Ze(Rn, 0);
      };
    function bt(J) {
      Pe = J, ft || (ft = !0, ze());
    }
    function me(J, _e) {
      an = Ze(function() {
        J(q.unstable_now());
      }, _e);
    }
    q.unstable_IdlePriority = 5, q.unstable_ImmediatePriority = 1, q.unstable_LowPriority = 4, q.unstable_NormalPriority = 3, q.unstable_Profiling = null, q.unstable_UserBlockingPriority = 2, q.unstable_cancelCallback = function(J) {
      J.callback = null;
    }, q.unstable_continueExecution = function() {
      Ve || le || (Ve = !0, bt(Oe));
    }, q.unstable_forceFrameRate = function(J) {
      0 > J || 125 < J ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : kn = 0 < J ? Math.floor(1e3 / J) : 5;
    }, q.unstable_getCurrentPriorityLevel = function() {
      return ve;
    }, q.unstable_getFirstCallbackNode = function() {
      return A(de);
    }, q.unstable_next = function(J) {
      switch (ve) {
        case 1:
        case 2:
        case 3:
          var _e = 3;
          break;
        default:
          _e = ve;
      }
      var ae = ve;
      ve = _e;
      try {
        return J();
      } finally {
        ve = ae;
      }
    }, q.unstable_pauseExecution = function() {
    }, q.unstable_requestPaint = function() {
    }, q.unstable_runWithPriority = function(J, _e) {
      switch (J) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          J = 3;
      }
      var ae = ve;
      ve = J;
      try {
        return _e();
      } finally {
        ve = ae;
      }
    }, q.unstable_scheduleCallback = function(J, _e, ae) {
      var _ = q.unstable_now();
      switch (typeof ae == "object" && ae !== null ? (ae = ae.delay, ae = typeof ae == "number" && 0 < ae ? _ + ae : _) : ae = _, J) {
        case 1:
          var V = -1;
          break;
        case 2:
          V = 250;
          break;
        case 5:
          V = 1073741823;
          break;
        case 4:
          V = 1e4;
          break;
        default:
          V = 5e3;
      }
      return V = ae + V, J = { id: Xe++, callback: _e, priorityLevel: J, startTime: ae, expirationTime: V, sortIndex: -1 }, ae > _ ? (J.sortIndex = ae, X(oe, J), A(de) === null && J === A(oe) && (Ee ? (rn(an), an = -1) : Ee = !0, me(mt, ae - _))) : (J.sortIndex = V, X(de, J), Ve || le || (Ve = !0, bt(Oe))), J;
    }, q.unstable_shouldYield = kt, q.unstable_wrapCallback = function(J) {
      var _e = ve;
      return function() {
        var ae = ve;
        ve = _e;
        try {
          return J.apply(this, arguments);
        } finally {
          ve = ae;
        }
      };
    };
  }(p0)), p0;
}
var v0 = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uR;
function ck() {
  return uR || (uR = 1, function(q) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var X = !1, A = !1, zt = 5;
      function Ut(ee, ke) {
        var it = ee.length;
        ee.push(ke), ct(ee, ke, it);
      }
      function Ie(ee) {
        return ee.length === 0 ? null : ee[0];
      }
      function S(ee) {
        if (ee.length === 0)
          return null;
        var ke = ee[0], it = ee.pop();
        return it !== ke && (ee[0] = it, de(ee, it, 0)), ke;
      }
      function ct(ee, ke, it) {
        for (var At = it; At > 0; ) {
          var Ht = At - 1 >>> 1, On = ee[Ht];
          if (oe(On, ke) > 0)
            ee[Ht] = ke, ee[At] = On, At = Ht;
          else
            return;
        }
      }
      function de(ee, ke, it) {
        for (var At = it, Ht = ee.length, On = Ht >>> 1; At < On; ) {
          var yn = (At + 1) * 2 - 1, Sr = ee[yn], Yt = yn + 1, _r = ee[Yt];
          if (oe(Sr, ke) < 0)
            Yt < Ht && oe(_r, Sr) < 0 ? (ee[At] = _r, ee[Yt] = ke, At = Yt) : (ee[At] = Sr, ee[yn] = ke, At = yn);
          else if (Yt < Ht && oe(_r, ke) < 0)
            ee[At] = _r, ee[Yt] = ke, At = Yt;
          else
            return;
        }
      }
      function oe(ee, ke) {
        var it = ee.sortIndex - ke.sortIndex;
        return it !== 0 ? it : ee.id - ke.id;
      }
      var Xe = 1, te = 2, ve = 3, le = 4, Ve = 5;
      function Ee(ee, ke) {
      }
      var Ze = typeof performance == "object" && typeof performance.now == "function";
      if (Ze) {
        var rn = performance;
        q.unstable_now = function() {
          return rn.now();
        };
      } else {
        var nt = Date, qe = nt.now();
        q.unstable_now = function() {
          return nt.now() - qe;
        };
      }
      var mt = 1073741823, Oe = -1, ft = 250, Pe = 5e3, an = 1e4, kn = mt, Wt = [], kt = [], Rn = 1, ze = null, et = ve, Ft = !1, bt = !1, me = !1, J = typeof setTimeout == "function" ? setTimeout : null, _e = typeof clearTimeout == "function" ? clearTimeout : null, ae = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function _(ee) {
        for (var ke = Ie(kt); ke !== null; ) {
          if (ke.callback === null)
            S(kt);
          else if (ke.startTime <= ee)
            S(kt), ke.sortIndex = ke.expirationTime, Ut(Wt, ke);
          else
            return;
          ke = Ie(kt);
        }
      }
      function V(ee) {
        if (me = !1, _(ee), !bt)
          if (Ie(Wt) !== null)
            bt = !0, Wr(Ue);
          else {
            var ke = Ie(kt);
            ke !== null && mn(V, ke.startTime - ee);
          }
      }
      function Ue(ee, ke) {
        bt = !1, me && (me = !1, br()), Ft = !0;
        var it = et;
        try {
          var At;
          if (!A)
            return Be(ee, ke);
        } finally {
          ze = null, et = it, Ft = !1;
        }
      }
      function Be(ee, ke) {
        var it = ke;
        for (_(it), ze = Ie(Wt); ze !== null && !X && !(ze.expirationTime > it && (!ee || Yr())); ) {
          var At = ze.callback;
          if (typeof At == "function") {
            ze.callback = null, et = ze.priorityLevel;
            var Ht = ze.expirationTime <= it, On = At(Ht);
            it = q.unstable_now(), typeof On == "function" ? ze.callback = On : ze === Ie(Wt) && S(Wt), _(it);
          } else
            S(Wt);
          ze = Ie(Wt);
        }
        if (ze !== null)
          return !0;
        var yn = Ie(kt);
        return yn !== null && mn(V, yn.startTime - it), !1;
      }
      function at(ee, ke) {
        switch (ee) {
          case Xe:
          case te:
          case ve:
          case le:
          case Ve:
            break;
          default:
            ee = ve;
        }
        var it = et;
        et = ee;
        try {
          return ke();
        } finally {
          et = it;
        }
      }
      function rt(ee) {
        var ke;
        switch (et) {
          case Xe:
          case te:
          case ve:
            ke = ve;
            break;
          default:
            ke = et;
            break;
        }
        var it = et;
        et = ke;
        try {
          return ee();
        } finally {
          et = it;
        }
      }
      function St(ee) {
        var ke = et;
        return function() {
          var it = et;
          et = ke;
          try {
            return ee.apply(this, arguments);
          } finally {
            et = it;
          }
        };
      }
      function ot(ee, ke, it) {
        var At = q.unstable_now(), Ht;
        if (typeof it == "object" && it !== null) {
          var On = it.delay;
          typeof On == "number" && On > 0 ? Ht = At + On : Ht = At;
        } else
          Ht = At;
        var yn;
        switch (ee) {
          case Xe:
            yn = Oe;
            break;
          case te:
            yn = ft;
            break;
          case Ve:
            yn = kn;
            break;
          case le:
            yn = an;
            break;
          case ve:
          default:
            yn = Pe;
            break;
        }
        var Sr = Ht + yn, Yt = {
          id: Rn++,
          callback: ke,
          priorityLevel: ee,
          startTime: Ht,
          expirationTime: Sr,
          sortIndex: -1
        };
        return Ht > At ? (Yt.sortIndex = Ht, Ut(kt, Yt), Ie(Wt) === null && Yt === Ie(kt) && (me ? br() : me = !0, mn(V, Ht - At))) : (Yt.sortIndex = Sr, Ut(Wt, Yt), !bt && !Ft && (bt = !0, Wr(Ue))), Yt;
      }
      function st() {
      }
      function en() {
        !bt && !Ft && (bt = !0, Wr(Ue));
      }
      function mr() {
        return Ie(Wt);
      }
      function $r(ee) {
        ee.callback = null;
      }
      function hn() {
        return et;
      }
      var Gn = !1, Pn = null, Un = -1, Dn = zt, Ir = -1;
      function Yr() {
        var ee = q.unstable_now() - Ir;
        return !(ee < Dn);
      }
      function qn() {
      }
      function yr(ee) {
        if (ee < 0 || ee > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        ee > 0 ? Dn = Math.floor(1e3 / ee) : Dn = zt;
      }
      var Qr = function() {
        if (Pn !== null) {
          var ee = q.unstable_now();
          Ir = ee;
          var ke = !0, it = !0;
          try {
            it = Pn(ke, ee);
          } finally {
            it ? gr() : (Gn = !1, Pn = null);
          }
        } else
          Gn = !1;
      }, gr;
      if (typeof ae == "function")
        gr = function() {
          ae(Qr);
        };
      else if (typeof MessageChannel < "u") {
        var pa = new MessageChannel(), ar = pa.port2;
        pa.port1.onmessage = Qr, gr = function() {
          ar.postMessage(null);
        };
      } else
        gr = function() {
          J(Qr, 0);
        };
      function Wr(ee) {
        Pn = ee, Gn || (Gn = !0, gr());
      }
      function mn(ee, ke) {
        Un = J(function() {
          ee(q.unstable_now());
        }, ke);
      }
      function br() {
        _e(Un), Un = -1;
      }
      var di = qn, va = null;
      q.unstable_IdlePriority = Ve, q.unstable_ImmediatePriority = Xe, q.unstable_LowPriority = le, q.unstable_NormalPriority = ve, q.unstable_Profiling = va, q.unstable_UserBlockingPriority = te, q.unstable_cancelCallback = $r, q.unstable_continueExecution = en, q.unstable_forceFrameRate = yr, q.unstable_getCurrentPriorityLevel = hn, q.unstable_getFirstCallbackNode = mr, q.unstable_next = rt, q.unstable_pauseExecution = st, q.unstable_requestPaint = di, q.unstable_runWithPriority = at, q.unstable_scheduleCallback = ot, q.unstable_shouldYield = Yr, q.unstable_wrapCallback = St, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(v0)), v0;
}
var oR;
function pR() {
  return oR || (oR = 1, process.env.NODE_ENV === "production" ? Bm.exports = sk() : Bm.exports = ck()), Bm.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sR;
function fk() {
  if (sR)
    return Za;
  sR = 1;
  var q = Xp(), X = pR();
  function A(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++)
      r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var zt = /* @__PURE__ */ new Set(), Ut = {};
  function Ie(n, r) {
    S(n, r), S(n + "Capture", r);
  }
  function S(n, r) {
    for (Ut[n] = r, n = 0; n < r.length; n++)
      zt.add(r[n]);
  }
  var ct = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), de = Object.prototype.hasOwnProperty, oe = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Xe = {}, te = {};
  function ve(n) {
    return de.call(te, n) ? !0 : de.call(Xe, n) ? !1 : oe.test(n) ? te[n] = !0 : (Xe[n] = !0, !1);
  }
  function le(n, r, l, o) {
    if (l !== null && l.type === 0)
      return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return o ? !1 : l !== null ? !l.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function Ve(n, r, l, o) {
    if (r === null || typeof r > "u" || le(n, r, l, o))
      return !0;
    if (o)
      return !1;
    if (l !== null)
      switch (l.type) {
        case 3:
          return !r;
        case 4:
          return r === !1;
        case 5:
          return isNaN(r);
        case 6:
          return isNaN(r) || 1 > r;
      }
    return !1;
  }
  function Ee(n, r, l, o, c, d, m) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = d, this.removeEmptyString = m;
  }
  var Ze = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    Ze[n] = new Ee(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    Ze[r] = new Ee(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    Ze[n] = new Ee(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    Ze[n] = new Ee(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    Ze[n] = new Ee(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    Ze[n] = new Ee(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    Ze[n] = new Ee(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    Ze[n] = new Ee(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    Ze[n] = new Ee(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var rn = /[\-:]([a-z])/g;
  function nt(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      rn,
      nt
    );
    Ze[r] = new Ee(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(rn, nt);
    Ze[r] = new Ee(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(rn, nt);
    Ze[r] = new Ee(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    Ze[n] = new Ee(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), Ze.xlinkHref = new Ee("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    Ze[n] = new Ee(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function qe(n, r, l, o) {
    var c = Ze.hasOwnProperty(r) ? Ze[r] : null;
    (c !== null ? c.type !== 0 : o || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (Ve(r, l, c, o) && (l = null), o || c === null ? ve(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : c.mustUseProperty ? n[c.propertyName] = l === null ? c.type === 3 ? !1 : "" : l : (r = c.attributeName, o = c.attributeNamespace, l === null ? n.removeAttribute(r) : (c = c.type, l = c === 3 || c === 4 && l === !0 ? "" : "" + l, o ? n.setAttributeNS(o, r, l) : n.setAttribute(r, l))));
  }
  var mt = q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Oe = Symbol.for("react.element"), ft = Symbol.for("react.portal"), Pe = Symbol.for("react.fragment"), an = Symbol.for("react.strict_mode"), kn = Symbol.for("react.profiler"), Wt = Symbol.for("react.provider"), kt = Symbol.for("react.context"), Rn = Symbol.for("react.forward_ref"), ze = Symbol.for("react.suspense"), et = Symbol.for("react.suspense_list"), Ft = Symbol.for("react.memo"), bt = Symbol.for("react.lazy"), me = Symbol.for("react.offscreen"), J = Symbol.iterator;
  function _e(n) {
    return n === null || typeof n != "object" ? null : (n = J && n[J] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var ae = Object.assign, _;
  function V(n) {
    if (_ === void 0)
      try {
        throw Error();
      } catch (l) {
        var r = l.stack.trim().match(/\n( *(at )?)/);
        _ = r && r[1] || "";
      }
    return `
` + _ + n;
  }
  var Ue = !1;
  function Be(n, r) {
    if (!n || Ue)
      return "";
    Ue = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r)
        if (r = function() {
          throw Error();
        }, Object.defineProperty(r.prototype, "props", { set: function() {
          throw Error();
        } }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(r, []);
          } catch (z) {
            var o = z;
          }
          Reflect.construct(n, [], r);
        } else {
          try {
            r.call();
          } catch (z) {
            o = z;
          }
          n.call(r.prototype);
        }
      else {
        try {
          throw Error();
        } catch (z) {
          o = z;
        }
        n();
      }
    } catch (z) {
      if (z && o && typeof z.stack == "string") {
        for (var c = z.stack.split(`
`), d = o.stack.split(`
`), m = c.length - 1, E = d.length - 1; 1 <= m && 0 <= E && c[m] !== d[E]; )
          E--;
        for (; 1 <= m && 0 <= E; m--, E--)
          if (c[m] !== d[E]) {
            if (m !== 1 || E !== 1)
              do
                if (m--, E--, 0 > E || c[m] !== d[E]) {
                  var T = `
` + c[m].replace(" at new ", " at ");
                  return n.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", n.displayName)), T;
                }
              while (1 <= m && 0 <= E);
            break;
          }
      }
    } finally {
      Ue = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? V(n) : "";
  }
  function at(n) {
    switch (n.tag) {
      case 5:
        return V(n.type);
      case 16:
        return V("Lazy");
      case 13:
        return V("Suspense");
      case 19:
        return V("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Be(n.type, !1), n;
      case 11:
        return n = Be(n.type.render, !1), n;
      case 1:
        return n = Be(n.type, !0), n;
      default:
        return "";
    }
  }
  function rt(n) {
    if (n == null)
      return null;
    if (typeof n == "function")
      return n.displayName || n.name || null;
    if (typeof n == "string")
      return n;
    switch (n) {
      case Pe:
        return "Fragment";
      case ft:
        return "Portal";
      case kn:
        return "Profiler";
      case an:
        return "StrictMode";
      case ze:
        return "Suspense";
      case et:
        return "SuspenseList";
    }
    if (typeof n == "object")
      switch (n.$$typeof) {
        case kt:
          return (n.displayName || "Context") + ".Consumer";
        case Wt:
          return (n._context.displayName || "Context") + ".Provider";
        case Rn:
          var r = n.render;
          return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
        case Ft:
          return r = n.displayName || null, r !== null ? r : rt(n.type) || "Memo";
        case bt:
          r = n._payload, n = n._init;
          try {
            return rt(n(r));
          } catch {
          }
      }
    return null;
  }
  function St(n) {
    var r = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (r.displayName || "Context") + ".Consumer";
      case 10:
        return (r._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = r.render, n = n.displayName || n.name || "", r.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return r;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return rt(r);
      case 8:
        return r === an ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof r == "function")
          return r.displayName || r.name || null;
        if (typeof r == "string")
          return r;
    }
    return null;
  }
  function ot(n) {
    switch (typeof n) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function st(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function en(n) {
    var r = st(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), o = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var c = l.get, d = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(m) {
        o = "" + m, d.call(this, m);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(m) {
        o = "" + m;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function mr(n) {
    n._valueTracker || (n._valueTracker = en(n));
  }
  function $r(n) {
    if (!n)
      return !1;
    var r = n._valueTracker;
    if (!r)
      return !0;
    var l = r.getValue(), o = "";
    return n && (o = st(n) ? n.checked ? "true" : "false" : n.value), n = o, n !== l ? (r.setValue(n), !0) : !1;
  }
  function hn(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u")
      return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function Gn(n, r) {
    var l = r.checked;
    return ae({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function Pn(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, o = r.checked != null ? r.checked : r.defaultChecked;
    l = ot(r.value != null ? r.value : l), n._wrapperState = { initialChecked: o, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function Un(n, r) {
    r = r.checked, r != null && qe(n, "checked", r, !1);
  }
  function Dn(n, r) {
    Un(n, r);
    var l = ot(r.value), o = r.type;
    if (l != null)
      o === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (o === "submit" || o === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? Yr(n, r.type, l) : r.hasOwnProperty("defaultValue") && Yr(n, r.type, ot(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function Ir(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var o = r.type;
      if (!(o !== "submit" && o !== "reset" || r.value !== void 0 && r.value !== null))
        return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function Yr(n, r, l) {
    (r !== "number" || hn(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var qn = Array.isArray;
  function yr(n, r, l, o) {
    if (n = n.options, r) {
      r = {};
      for (var c = 0; c < l.length; c++)
        r["$" + l[c]] = !0;
      for (l = 0; l < n.length; l++)
        c = r.hasOwnProperty("$" + n[l].value), n[l].selected !== c && (n[l].selected = c), c && o && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + ot(l), r = null, c = 0; c < n.length; c++) {
        if (n[c].value === l) {
          n[c].selected = !0, o && (n[c].defaultSelected = !0);
          return;
        }
        r !== null || n[c].disabled || (r = n[c]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Qr(n, r) {
    if (r.dangerouslySetInnerHTML != null)
      throw Error(A(91));
    return ae({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function gr(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null)
          throw Error(A(92));
        if (qn(l)) {
          if (1 < l.length)
            throw Error(A(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: ot(l) };
  }
  function pa(n, r) {
    var l = ot(r.value), o = ot(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), o != null && (n.defaultValue = "" + o);
  }
  function ar(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function Wr(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function mn(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? Wr(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var br, di = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, o, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, o, c);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n)
      n.innerHTML = r;
    else {
      for (br = br || document.createElement("div"), br.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = br.firstChild; n.firstChild; )
        n.removeChild(n.firstChild);
      for (; r.firstChild; )
        n.appendChild(r.firstChild);
    }
  });
  function va(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var ee = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, ke = ["Webkit", "ms", "Moz", "O"];
  Object.keys(ee).forEach(function(n) {
    ke.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), ee[r] = ee[n];
    });
  });
  function it(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || ee.hasOwnProperty(n) && ee[n] ? ("" + r).trim() : r + "px";
  }
  function At(n, r) {
    n = n.style;
    for (var l in r)
      if (r.hasOwnProperty(l)) {
        var o = l.indexOf("--") === 0, c = it(l, r[l], o);
        l === "float" && (l = "cssFloat"), o ? n.setProperty(l, c) : n[l] = c;
      }
  }
  var Ht = ae({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function On(n, r) {
    if (r) {
      if (Ht[n] && (r.children != null || r.dangerouslySetInnerHTML != null))
        throw Error(A(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null)
          throw Error(A(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML))
          throw Error(A(61));
      }
      if (r.style != null && typeof r.style != "object")
        throw Error(A(62));
    }
  }
  function yn(n, r) {
    if (n.indexOf("-") === -1)
      return typeof r.is == "string";
    switch (n) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Sr = null;
  function Yt(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var _r = null, Vt = null, Pt = null;
  function ei(n) {
    if (n = cs(n)) {
      if (typeof _r != "function")
        throw Error(A(280));
      var r = n.stateNode;
      r && (r = Le(r), _r(n.stateNode, n.type, r));
    }
  }
  function Da(n) {
    Vt ? Pt ? Pt.push(n) : Pt = [n] : Vt = n;
  }
  function sl() {
    if (Vt) {
      var n = Vt, r = Pt;
      if (Pt = Vt = null, ei(n), r)
        for (n = 0; n < r.length; n++)
          ei(r[n]);
    }
  }
  function Wl(n, r) {
    return n(r);
  }
  function zu() {
  }
  var Ni = !1;
  function cl(n, r, l) {
    if (Ni)
      return n(r, l);
    Ni = !0;
    try {
      return Wl(n, r, l);
    } finally {
      Ni = !1, (Vt !== null || Pt !== null) && (zu(), sl());
    }
  }
  function ha(n, r) {
    var l = n.stateNode;
    if (l === null)
      return null;
    var o = Le(l);
    if (o === null)
      return null;
    l = o[r];
    e:
      switch (r) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (o = !o.disabled) || (n = n.type, o = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !o;
          break e;
        default:
          n = !1;
      }
    if (n)
      return null;
    if (l && typeof l != "function")
      throw Error(A(231, r, typeof l));
    return l;
  }
  var pi = !1;
  if (ct)
    try {
      var ma = {};
      Object.defineProperty(ma, "passive", { get: function() {
        pi = !0;
      } }), window.addEventListener("test", ma, ma), window.removeEventListener("test", ma, ma);
    } catch {
      pi = !1;
    }
  function ti(n, r, l, o, c, d, m, E, T) {
    var z = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, z);
    } catch (Y) {
      this.onError(Y);
    }
  }
  var kr = !1, ya = null, vi = !1, hi = null, R = { onError: function(n) {
    kr = !0, ya = n;
  } };
  function $(n, r, l, o, c, d, m, E, T) {
    kr = !1, ya = null, ti.apply(R, arguments);
  }
  function W(n, r, l, o, c, d, m, E, T) {
    if ($.apply(this, arguments), kr) {
      if (kr) {
        var z = ya;
        kr = !1, ya = null;
      } else
        throw Error(A(198));
      vi || (vi = !0, hi = z);
    }
  }
  function xe(n) {
    var r = n, l = n;
    if (n.alternate)
      for (; r.return; )
        r = r.return;
    else {
      n = r;
      do
        r = n, r.flags & 4098 && (l = r.return), n = r.return;
      while (n);
    }
    return r.tag === 3 ? l : null;
  }
  function dt(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null)
        return r.dehydrated;
    }
    return null;
  }
  function Et(n) {
    if (xe(n) !== n)
      throw Error(A(188));
  }
  function Ae(n) {
    var r = n.alternate;
    if (!r) {
      if (r = xe(n), r === null)
        throw Error(A(188));
      return r !== n ? null : n;
    }
    for (var l = n, o = r; ; ) {
      var c = l.return;
      if (c === null)
        break;
      var d = c.alternate;
      if (d === null) {
        if (o = c.return, o !== null) {
          l = o;
          continue;
        }
        break;
      }
      if (c.child === d.child) {
        for (d = c.child; d; ) {
          if (d === l)
            return Et(c), n;
          if (d === o)
            return Et(c), r;
          d = d.sibling;
        }
        throw Error(A(188));
      }
      if (l.return !== o.return)
        l = c, o = d;
      else {
        for (var m = !1, E = c.child; E; ) {
          if (E === l) {
            m = !0, l = c, o = d;
            break;
          }
          if (E === o) {
            m = !0, o = c, l = d;
            break;
          }
          E = E.sibling;
        }
        if (!m) {
          for (E = d.child; E; ) {
            if (E === l) {
              m = !0, l = d, o = c;
              break;
            }
            if (E === o) {
              m = !0, o = d, l = c;
              break;
            }
            E = E.sibling;
          }
          if (!m)
            throw Error(A(189));
        }
      }
      if (l.alternate !== o)
        throw Error(A(190));
    }
    if (l.tag !== 3)
      throw Error(A(188));
    return l.stateNode.current === l ? n : r;
  }
  function lt(n) {
    return n = Ae(n), n !== null ? An(n) : null;
  }
  function An(n) {
    if (n.tag === 5 || n.tag === 6)
      return n;
    for (n = n.child; n !== null; ) {
      var r = An(n);
      if (r !== null)
        return r;
      n = n.sibling;
    }
    return null;
  }
  var Kt = X.unstable_scheduleCallback, ln = X.unstable_cancelCallback, Er = X.unstable_shouldYield, mi = X.unstable_requestPaint, Dt = X.unstable_now, Kn = X.unstable_getCurrentPriorityLevel, Dr = X.unstable_ImmediatePriority, ut = X.unstable_UserBlockingPriority, Oa = X.unstable_NormalPriority, fl = X.unstable_LowPriority, Uu = X.unstable_IdlePriority, dl = null, Gr = null;
  function Wo(n) {
    if (Gr && typeof Gr.onCommitFiberRoot == "function")
      try {
        Gr.onCommitFiberRoot(dl, n, void 0, (n.current.flags & 128) === 128);
      } catch {
      }
  }
  var Or = Math.clz32 ? Math.clz32 : ec, Go = Math.log, qo = Math.LN2;
  function ec(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (Go(n) / qo | 0) | 0;
  }
  var Au = 64, pl = 4194304;
  function ni(n) {
    switch (n & -n) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function Lr(n, r) {
    var l = n.pendingLanes;
    if (l === 0)
      return 0;
    var o = 0, c = n.suspendedLanes, d = n.pingedLanes, m = l & 268435455;
    if (m !== 0) {
      var E = m & ~c;
      E !== 0 ? o = ni(E) : (d &= m, d !== 0 && (o = ni(d)));
    } else
      m = l & ~c, m !== 0 ? o = ni(m) : d !== 0 && (o = ni(d));
    if (o === 0)
      return 0;
    if (r !== 0 && r !== o && !(r & c) && (c = o & -o, d = r & -r, c >= d || c === 16 && (d & 4194240) !== 0))
      return r;
    if (o & 4 && (o |= l & 16), r = n.entangledLanes, r !== 0)
      for (n = n.entanglements, r &= o; 0 < r; )
        l = 31 - Or(r), c = 1 << l, o |= n[l], r &= ~c;
    return o;
  }
  function vl(n, r) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return r + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function hl(n, r) {
    for (var l = n.suspendedLanes, o = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes; 0 < d; ) {
      var m = 31 - Or(d), E = 1 << m, T = c[m];
      T === -1 ? (!(E & l) || E & o) && (c[m] = vl(E, r)) : T <= r && (n.expiredLanes |= E), d &= ~E;
    }
  }
  function ml(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function ju() {
    var n = Au;
    return Au <<= 1, !(Au & 4194240) && (Au = 64), n;
  }
  function Fu(n) {
    for (var r = [], l = 0; 31 > l; l++)
      r.push(n);
    return r;
  }
  function zi(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - Or(r), n[r] = l;
  }
  function Yf(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var o = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var c = 31 - Or(l), d = 1 << c;
      r[c] = 0, o[c] = -1, n[c] = -1, l &= ~d;
    }
  }
  function yi(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var o = 31 - Or(l), c = 1 << o;
      c & r | n[o] & r && (n[o] |= r), l &= ~c;
    }
  }
  var Ot = 0;
  function Hu(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var Gl, Vu, Ct, Pu, Bu, We = !1, ql = [], gn = null, qr = null, Mr = null, yl = /* @__PURE__ */ new Map(), Tn = /* @__PURE__ */ new Map(), Bt = [], tc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Kr(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        gn = null;
        break;
      case "dragenter":
      case "dragleave":
        qr = null;
        break;
      case "mouseover":
      case "mouseout":
        Mr = null;
        break;
      case "pointerover":
      case "pointerout":
        yl.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Tn.delete(r.pointerId);
    }
  }
  function Xn(n, r, l, o, c, d) {
    return n === null || n.nativeEvent !== d ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: o, nativeEvent: d, targetContainers: [c] }, r !== null && (r = cs(r), r !== null && Vu(r)), n) : (n.eventSystemFlags |= o, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function gi(n, r, l, o, c) {
    switch (r) {
      case "focusin":
        return gn = Xn(gn, n, r, l, o, c), !0;
      case "dragenter":
        return qr = Xn(qr, n, r, l, o, c), !0;
      case "mouseover":
        return Mr = Xn(Mr, n, r, l, o, c), !0;
      case "pointerover":
        var d = c.pointerId;
        return yl.set(d, Xn(yl.get(d) || null, n, r, l, o, c)), !0;
      case "gotpointercapture":
        return d = c.pointerId, Tn.set(d, Xn(Tn.get(d) || null, n, r, l, o, c)), !0;
    }
    return !1;
  }
  function nc(n) {
    var r = za(n.target);
    if (r !== null) {
      var l = xe(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = dt(l), r !== null) {
            n.blockedOn = r, Bu(n.priority, function() {
              Ct(l);
            });
            return;
          }
        } else if (r === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function Ui(n) {
    if (n.blockedOn !== null)
      return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = Iu(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var o = new l.constructor(l.type, l);
        Sr = o, l.target.dispatchEvent(o), Sr = null;
      } else
        return r = cs(l), r !== null && Vu(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function gl(n, r, l) {
    Ui(n) && l.delete(r);
  }
  function rc() {
    We = !1, gn !== null && Ui(gn) && (gn = null), qr !== null && Ui(qr) && (qr = null), Mr !== null && Ui(Mr) && (Mr = null), yl.forEach(gl), Tn.forEach(gl);
  }
  function La(n, r) {
    n.blockedOn === r && (n.blockedOn = null, We || (We = !0, X.unstable_scheduleCallback(X.unstable_NormalPriority, rc)));
  }
  function Sl(n) {
    function r(c) {
      return La(c, n);
    }
    if (0 < ql.length) {
      La(ql[0], n);
      for (var l = 1; l < ql.length; l++) {
        var o = ql[l];
        o.blockedOn === n && (o.blockedOn = null);
      }
    }
    for (gn !== null && La(gn, n), qr !== null && La(qr, n), Mr !== null && La(Mr, n), yl.forEach(r), Tn.forEach(r), l = 0; l < Bt.length; l++)
      o = Bt[l], o.blockedOn === n && (o.blockedOn = null);
    for (; 0 < Bt.length && (l = Bt[0], l.blockedOn === null); )
      nc(l), l.blockedOn === null && Bt.shift();
  }
  var Ai = mt.ReactCurrentBatchConfig, Ma = !0;
  function $u(n, r, l, o) {
    var c = Ot, d = Ai.transition;
    Ai.transition = null;
    try {
      Ot = 1, Cl(n, r, l, o);
    } finally {
      Ot = c, Ai.transition = d;
    }
  }
  function El(n, r, l, o) {
    var c = Ot, d = Ai.transition;
    Ai.transition = null;
    try {
      Ot = 4, Cl(n, r, l, o);
    } finally {
      Ot = c, Ai.transition = d;
    }
  }
  function Cl(n, r, l, o) {
    if (Ma) {
      var c = Iu(n, r, l, o);
      if (c === null)
        dc(n, r, o, Kl, l), Kr(n, o);
      else if (gi(c, n, r, l, o))
        o.stopPropagation();
      else if (Kr(n, o), r & 4 && -1 < tc.indexOf(n)) {
        for (; c !== null; ) {
          var d = cs(c);
          if (d !== null && Gl(d), d = Iu(n, r, l, o), d === null && dc(n, r, o, Kl, l), d === c)
            break;
          c = d;
        }
        c !== null && o.stopPropagation();
      } else
        dc(n, r, o, null, l);
    }
  }
  var Kl = null;
  function Iu(n, r, l, o) {
    if (Kl = null, n = Yt(o), n = za(n), n !== null)
      if (r = xe(n), r === null)
        n = null;
      else if (l = r.tag, l === 13) {
        if (n = dt(r), n !== null)
          return n;
        n = null;
      } else if (l === 3) {
        if (r.stateNode.current.memoizedState.isDehydrated)
          return r.tag === 3 ? r.stateNode.containerInfo : null;
        n = null;
      } else
        r !== n && (n = null);
    return Kl = n, null;
  }
  function Ko(n) {
    switch (n) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Kn()) {
          case Dr:
            return 1;
          case ut:
            return 4;
          case Oa:
          case fl:
            return 16;
          case Uu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var ri = null, h = null, C = null;
  function N() {
    if (C)
      return C;
    var n, r = h, l = r.length, o, c = "value" in ri ? ri.value : ri.textContent, d = c.length;
    for (n = 0; n < l && r[n] === c[n]; n++)
      ;
    var m = l - n;
    for (o = 1; o <= m && r[l - o] === c[d - o]; o++)
      ;
    return C = c.slice(n, 1 < o ? 1 - o : void 0);
  }
  function j(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function K() {
    return !0;
  }
  function je() {
    return !1;
  }
  function ie(n) {
    function r(l, o, c, d, m) {
      this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = d, this.target = m, this.currentTarget = null;
      for (var E in n)
        n.hasOwnProperty(E) && (l = n[E], this[E] = l ? l(d) : d[E]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? K : je, this.isPropagationStopped = je, this;
    }
    return ae(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = K);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = K);
    }, persist: function() {
    }, isPersistent: K }), r;
  }
  var Ne = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, pt = ie(Ne), _t = ae({}, Ne, { view: 0, detail: 0 }), Xt = ie(_t), Qt, Zt, tn, Rt = ae({}, _t, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Kf, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== tn && (tn && n.type === "mousemove" ? (Qt = n.screenX - tn.screenX, Zt = n.screenY - tn.screenY) : Zt = Qt = 0, tn = n), Qt);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : Zt;
  } }), ji = ie(Rt), Yu = ae({}, Rt, { dataTransfer: 0 }), Xo = ie(Yu), Qf = ae({}, _t, { relatedTarget: 0 }), ai = ie(Qf), Zo = ae({}, Ne, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Jo = ie(Zo), Wf = ae({}, Ne, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), Im = ie(Wf), Ym = ae({}, Ne, { data: 0 }), Gf = ie(Ym), qf = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Zp = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Jp = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function ev(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = Jp[n]) ? !!r[n] : !1;
  }
  function Kf() {
    return ev;
  }
  var Fi = ae({}, _t, { key: function(n) {
    if (n.key) {
      var r = qf[n.key] || n.key;
      if (r !== "Unidentified")
        return r;
    }
    return n.type === "keypress" ? (n = j(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? Zp[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Kf, charCode: function(n) {
    return n.type === "keypress" ? j(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? j(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), Qm = ie(Fi), Xf = ae({}, Rt, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ac = ie(Xf), Zf = ae({}, _t, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Kf }), Wm = ie(Zf), ic = ae({}, Ne, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), tv = ie(ic), Xr = ae({}, Rt, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Hi = ie(Xr), jn = [9, 13, 27, 32], ii = ct && "CompositionEvent" in window, Xl = null;
  ct && "documentMode" in document && (Xl = document.documentMode);
  var lc = ct && "TextEvent" in window && !Xl, nv = ct && (!ii || Xl && 8 < Xl && 11 >= Xl), Qu = String.fromCharCode(32), rv = !1;
  function av(n, r) {
    switch (n) {
      case "keyup":
        return jn.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function uc(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var Wu = !1;
  function Gm(n, r) {
    switch (n) {
      case "compositionend":
        return uc(r);
      case "keypress":
        return r.which !== 32 ? null : (rv = !0, Qu);
      case "textInput":
        return n = r.data, n === Qu && rv ? null : n;
      default:
        return null;
    }
  }
  function qm(n, r) {
    if (Wu)
      return n === "compositionend" || !ii && av(n, r) ? (n = N(), C = h = ri = null, Wu = !1, n) : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length)
            return r.char;
          if (r.which)
            return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return nv && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var iv = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function lv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!iv[n.type] : r === "textarea";
  }
  function uv(n, r, l, o) {
    Da(o), r = us(r, "onChange"), 0 < r.length && (l = new pt("onChange", "change", null, l, o), n.push({ event: l, listeners: r }));
  }
  var es = null, Gu = null;
  function qu(n) {
    fc(n, 0);
  }
  function Ku(n) {
    var r = Zu(n);
    if ($r(r))
      return n;
  }
  function ov(n, r) {
    if (n === "change")
      return r;
  }
  var Jf = !1;
  if (ct) {
    var ed;
    if (ct) {
      var td = "oninput" in document;
      if (!td) {
        var sv = document.createElement("div");
        sv.setAttribute("oninput", "return;"), td = typeof sv.oninput == "function";
      }
      ed = td;
    } else
      ed = !1;
    Jf = ed && (!document.documentMode || 9 < document.documentMode);
  }
  function cv() {
    es && (es.detachEvent("onpropertychange", fv), Gu = es = null);
  }
  function fv(n) {
    if (n.propertyName === "value" && Ku(Gu)) {
      var r = [];
      uv(r, Gu, n, Yt(n)), cl(qu, r);
    }
  }
  function Km(n, r, l) {
    n === "focusin" ? (cv(), es = r, Gu = l, es.attachEvent("onpropertychange", fv)) : n === "focusout" && cv();
  }
  function Xm(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown")
      return Ku(Gu);
  }
  function Zm(n, r) {
    if (n === "click")
      return Ku(r);
  }
  function dv(n, r) {
    if (n === "input" || n === "change")
      return Ku(r);
  }
  function Jm(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var Na = typeof Object.is == "function" ? Object.is : Jm;
  function ts(n, r) {
    if (Na(n, r))
      return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null)
      return !1;
    var l = Object.keys(n), o = Object.keys(r);
    if (l.length !== o.length)
      return !1;
    for (o = 0; o < l.length; o++) {
      var c = l[o];
      if (!de.call(r, c) || !Na(n[c], r[c]))
        return !1;
    }
    return !0;
  }
  function pv(n) {
    for (; n && n.firstChild; )
      n = n.firstChild;
    return n;
  }
  function vv(n, r) {
    var l = pv(n);
    n = 0;
    for (var o; l; ) {
      if (l.nodeType === 3) {
        if (o = n + l.textContent.length, n <= r && o >= r)
          return { node: l, offset: r - n };
        n = o;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = pv(l);
    }
  }
  function hv(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? hv(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function oc() {
    for (var n = window, r = hn(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l)
        n = r.contentWindow;
      else
        break;
      r = hn(n.document);
    }
    return r;
  }
  function Vi(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function sc(n) {
    var r = oc(), l = n.focusedElem, o = n.selectionRange;
    if (r !== l && l && l.ownerDocument && hv(l.ownerDocument.documentElement, l)) {
      if (o !== null && Vi(l)) {
        if (r = o.start, n = o.end, n === void 0 && (n = r), "selectionStart" in l)
          l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = l.textContent.length, d = Math.min(o.start, c);
          o = o.end === void 0 ? d : Math.min(o.end, c), !n.extend && d > o && (c = o, o = d, d = c), c = vv(l, d);
          var m = vv(
            l,
            o
          );
          c && m && (n.rangeCount !== 1 || n.anchorNode !== c.node || n.anchorOffset !== c.offset || n.focusNode !== m.node || n.focusOffset !== m.offset) && (r = r.createRange(), r.setStart(c.node, c.offset), n.removeAllRanges(), d > o ? (n.addRange(r), n.extend(m.node, m.offset)) : (r.setEnd(m.node, m.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; )
        n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++)
        n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var mv = ct && "documentMode" in document && 11 >= document.documentMode, li = null, nd = null, ns = null, rd = !1;
  function yv(n, r, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    rd || li == null || li !== hn(o) || (o = li, "selectionStart" in o && Vi(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), ns && ts(ns, o) || (ns = o, o = us(nd, "onSelect"), 0 < o.length && (r = new pt("onSelect", "select", null, r, l), n.push({ event: r, listeners: o }), r.target = li)));
  }
  function cc(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var Zl = { animationend: cc("Animation", "AnimationEnd"), animationiteration: cc("Animation", "AnimationIteration"), animationstart: cc("Animation", "AnimationStart"), transitionend: cc("Transition", "TransitionEnd") }, ad = {}, id = {};
  ct && (id = document.createElement("div").style, "AnimationEvent" in window || (delete Zl.animationend.animation, delete Zl.animationiteration.animation, delete Zl.animationstart.animation), "TransitionEvent" in window || delete Zl.transitionend.transition);
  function Zn(n) {
    if (ad[n])
      return ad[n];
    if (!Zl[n])
      return n;
    var r = Zl[n], l;
    for (l in r)
      if (r.hasOwnProperty(l) && l in id)
        return ad[n] = r[l];
    return n;
  }
  var ld = Zn("animationend"), gv = Zn("animationiteration"), Sv = Zn("animationstart"), Ev = Zn("transitionend"), Cv = /* @__PURE__ */ new Map(), Rv = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Pi(n, r) {
    Cv.set(n, r), Ie(r, [n]);
  }
  for (var rs = 0; rs < Rv.length; rs++) {
    var Jl = Rv[rs], ey = Jl.toLowerCase(), as = Jl[0].toUpperCase() + Jl.slice(1);
    Pi(ey, "on" + as);
  }
  Pi(ld, "onAnimationEnd"), Pi(gv, "onAnimationIteration"), Pi(Sv, "onAnimationStart"), Pi("dblclick", "onDoubleClick"), Pi("focusin", "onFocus"), Pi("focusout", "onBlur"), Pi(Ev, "onTransitionEnd"), S("onMouseEnter", ["mouseout", "mouseover"]), S("onMouseLeave", ["mouseout", "mouseover"]), S("onPointerEnter", ["pointerout", "pointerover"]), S("onPointerLeave", ["pointerout", "pointerover"]), Ie("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ie("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ie("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Ie("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Ie("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Ie("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var is = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), ty = new Set("cancel close invalid load scroll toggle".split(" ").concat(is));
  function Tv(n, r, l) {
    var o = n.type || "unknown-event";
    n.currentTarget = l, W(o, r, void 0, n), n.currentTarget = null;
  }
  function fc(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var o = n[l], c = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (r)
          for (var m = o.length - 1; 0 <= m; m--) {
            var E = o[m], T = E.instance, z = E.currentTarget;
            if (E = E.listener, T !== d && c.isPropagationStopped())
              break e;
            Tv(c, E, z), d = T;
          }
        else
          for (m = 0; m < o.length; m++) {
            if (E = o[m], T = E.instance, z = E.currentTarget, E = E.listener, T !== d && c.isPropagationStopped())
              break e;
            Tv(c, E, z), d = T;
          }
      }
    }
    if (vi)
      throw n = hi, vi = !1, hi = null, n;
  }
  function Jt(n, r) {
    var l = r[pd];
    l === void 0 && (l = r[pd] = /* @__PURE__ */ new Set());
    var o = n + "__bubble";
    l.has(o) || (xv(r, n, 2, !1), l.add(o));
  }
  function Rl(n, r, l) {
    var o = 0;
    r && (o |= 4), xv(l, n, o, r);
  }
  var Bi = "_reactListening" + Math.random().toString(36).slice(2);
  function Xu(n) {
    if (!n[Bi]) {
      n[Bi] = !0, zt.forEach(function(l) {
        l !== "selectionchange" && (ty.has(l) || Rl(l, !1, n), Rl(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[Bi] || (r[Bi] = !0, Rl("selectionchange", !1, r));
    }
  }
  function xv(n, r, l, o) {
    switch (Ko(r)) {
      case 1:
        var c = $u;
        break;
      case 4:
        c = El;
        break;
      default:
        c = Cl;
    }
    l = c.bind(null, r, l, n), c = void 0, !pi || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (c = !0), o ? c !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: c }) : n.addEventListener(r, l, !0) : c !== void 0 ? n.addEventListener(r, l, { passive: c }) : n.addEventListener(r, l, !1);
  }
  function dc(n, r, l, o, c) {
    var d = o;
    if (!(r & 1) && !(r & 2) && o !== null)
      e:
        for (; ; ) {
          if (o === null)
            return;
          var m = o.tag;
          if (m === 3 || m === 4) {
            var E = o.stateNode.containerInfo;
            if (E === c || E.nodeType === 8 && E.parentNode === c)
              break;
            if (m === 4)
              for (m = o.return; m !== null; ) {
                var T = m.tag;
                if ((T === 3 || T === 4) && (T = m.stateNode.containerInfo, T === c || T.nodeType === 8 && T.parentNode === c))
                  return;
                m = m.return;
              }
            for (; E !== null; ) {
              if (m = za(E), m === null)
                return;
              if (T = m.tag, T === 5 || T === 6) {
                o = d = m;
                continue e;
              }
              E = E.parentNode;
            }
          }
          o = o.return;
        }
    cl(function() {
      var z = d, Y = Yt(l), Q = [];
      e: {
        var I = Cv.get(n);
        if (I !== void 0) {
          var ce = pt, ye = n;
          switch (n) {
            case "keypress":
              if (j(l) === 0)
                break e;
            case "keydown":
            case "keyup":
              ce = Qm;
              break;
            case "focusin":
              ye = "focus", ce = ai;
              break;
            case "focusout":
              ye = "blur", ce = ai;
              break;
            case "beforeblur":
            case "afterblur":
              ce = ai;
              break;
            case "click":
              if (l.button === 2)
                break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              ce = ji;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ce = Xo;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ce = Wm;
              break;
            case ld:
            case gv:
            case Sv:
              ce = Jo;
              break;
            case Ev:
              ce = tv;
              break;
            case "scroll":
              ce = Xt;
              break;
            case "wheel":
              ce = Hi;
              break;
            case "copy":
            case "cut":
            case "paste":
              ce = Im;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ce = ac;
          }
          var Ce = (r & 4) !== 0, Nn = !Ce && n === "scroll", k = Ce ? I !== null ? I + "Capture" : null : I;
          Ce = [];
          for (var w = z, L; w !== null; ) {
            L = w;
            var Z = L.stateNode;
            if (L.tag === 5 && Z !== null && (L = Z, k !== null && (Z = ha(w, k), Z != null && Ce.push(ls(w, Z, L)))), Nn)
              break;
            w = w.return;
          }
          0 < Ce.length && (I = new ce(I, ye, null, l, Y), Q.push({ event: I, listeners: Ce }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (I = n === "mouseover" || n === "pointerover", ce = n === "mouseout" || n === "pointerout", I && l !== Sr && (ye = l.relatedTarget || l.fromElement) && (za(ye) || ye[$i]))
            break e;
          if ((ce || I) && (I = Y.window === Y ? Y : (I = Y.ownerDocument) ? I.defaultView || I.parentWindow : window, ce ? (ye = l.relatedTarget || l.toElement, ce = z, ye = ye ? za(ye) : null, ye !== null && (Nn = xe(ye), ye !== Nn || ye.tag !== 5 && ye.tag !== 6) && (ye = null)) : (ce = null, ye = z), ce !== ye)) {
            if (Ce = ji, Z = "onMouseLeave", k = "onMouseEnter", w = "mouse", (n === "pointerout" || n === "pointerover") && (Ce = ac, Z = "onPointerLeave", k = "onPointerEnter", w = "pointer"), Nn = ce == null ? I : Zu(ce), L = ye == null ? I : Zu(ye), I = new Ce(Z, w + "leave", ce, l, Y), I.target = Nn, I.relatedTarget = L, Z = null, za(Y) === z && (Ce = new Ce(k, w + "enter", ye, l, Y), Ce.target = L, Ce.relatedTarget = Nn, Z = Ce), Nn = Z, ce && ye)
              t: {
                for (Ce = ce, k = ye, w = 0, L = Ce; L; L = eu(L))
                  w++;
                for (L = 0, Z = k; Z; Z = eu(Z))
                  L++;
                for (; 0 < w - L; )
                  Ce = eu(Ce), w--;
                for (; 0 < L - w; )
                  k = eu(k), L--;
                for (; w--; ) {
                  if (Ce === k || k !== null && Ce === k.alternate)
                    break t;
                  Ce = eu(Ce), k = eu(k);
                }
                Ce = null;
              }
            else
              Ce = null;
            ce !== null && ud(Q, I, ce, Ce, !1), ye !== null && Nn !== null && ud(Q, Nn, ye, Ce, !0);
          }
        }
        e: {
          if (I = z ? Zu(z) : window, ce = I.nodeName && I.nodeName.toLowerCase(), ce === "select" || ce === "input" && I.type === "file")
            var Te = ov;
          else if (lv(I))
            if (Jf)
              Te = dv;
            else {
              Te = Xm;
              var Fe = Km;
            }
          else
            (ce = I.nodeName) && ce.toLowerCase() === "input" && (I.type === "checkbox" || I.type === "radio") && (Te = Zm);
          if (Te && (Te = Te(n, z))) {
            uv(Q, Te, l, Y);
            break e;
          }
          Fe && Fe(n, I, z), n === "focusout" && (Fe = I._wrapperState) && Fe.controlled && I.type === "number" && Yr(I, "number", I.value);
        }
        switch (Fe = z ? Zu(z) : window, n) {
          case "focusin":
            (lv(Fe) || Fe.contentEditable === "true") && (li = Fe, nd = z, ns = null);
            break;
          case "focusout":
            ns = nd = li = null;
            break;
          case "mousedown":
            rd = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            rd = !1, yv(Q, l, Y);
            break;
          case "selectionchange":
            if (mv)
              break;
          case "keydown":
          case "keyup":
            yv(Q, l, Y);
        }
        var ge;
        if (ii)
          e: {
            switch (n) {
              case "compositionstart":
                var He = "onCompositionStart";
                break e;
              case "compositionend":
                He = "onCompositionEnd";
                break e;
              case "compositionupdate":
                He = "onCompositionUpdate";
                break e;
            }
            He = void 0;
          }
        else
          Wu ? av(n, l) && (He = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (He = "onCompositionStart");
        He && (nv && l.locale !== "ko" && (Wu || He !== "onCompositionStart" ? He === "onCompositionEnd" && Wu && (ge = N()) : (ri = Y, h = "value" in ri ? ri.value : ri.textContent, Wu = !0)), Fe = us(z, He), 0 < Fe.length && (He = new Gf(He, n, null, l, Y), Q.push({ event: He, listeners: Fe }), ge ? He.data = ge : (ge = uc(l), ge !== null && (He.data = ge)))), (ge = lc ? Gm(n, l) : qm(n, l)) && (z = us(z, "onBeforeInput"), 0 < z.length && (Y = new Gf("onBeforeInput", "beforeinput", null, l, Y), Q.push({ event: Y, listeners: z }), Y.data = ge));
      }
      fc(Q, r);
    });
  }
  function ls(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function us(n, r) {
    for (var l = r + "Capture", o = []; n !== null; ) {
      var c = n, d = c.stateNode;
      c.tag === 5 && d !== null && (c = d, d = ha(n, l), d != null && o.unshift(ls(n, d, c)), d = ha(n, r), d != null && o.push(ls(n, d, c))), n = n.return;
    }
    return o;
  }
  function eu(n) {
    if (n === null)
      return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function ud(n, r, l, o, c) {
    for (var d = r._reactName, m = []; l !== null && l !== o; ) {
      var E = l, T = E.alternate, z = E.stateNode;
      if (T !== null && T === o)
        break;
      E.tag === 5 && z !== null && (E = z, c ? (T = ha(l, d), T != null && m.unshift(ls(l, T, E))) : c || (T = ha(l, d), T != null && m.push(ls(l, T, E)))), l = l.return;
    }
    m.length !== 0 && n.push({ event: r, listeners: m });
  }
  var od = /\r\n?/g, ny = /\u0000|\uFFFD/g;
  function sd(n) {
    return (typeof n == "string" ? n : "" + n).replace(od, `
`).replace(ny, "");
  }
  function pc(n, r, l) {
    if (r = sd(r), sd(n) !== r && l)
      throw Error(A(425));
  }
  function vc() {
  }
  var cd = null, tu = null;
  function os(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var nu = typeof setTimeout == "function" ? setTimeout : void 0, wv = typeof clearTimeout == "function" ? clearTimeout : void 0, fd = typeof Promise == "function" ? Promise : void 0, dd = typeof queueMicrotask == "function" ? queueMicrotask : typeof fd < "u" ? function(n) {
    return fd.resolve(null).then(n).catch(ry);
  } : nu;
  function ry(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function Tl(n, r) {
    var l = r, o = 0;
    do {
      var c = l.nextSibling;
      if (n.removeChild(l), c && c.nodeType === 8)
        if (l = c.data, l === "/$") {
          if (o === 0) {
            n.removeChild(c), Sl(r);
            return;
          }
          o--;
        } else
          l !== "$" && l !== "$?" && l !== "$!" || o++;
      l = c;
    } while (l);
    Sl(r);
  }
  function ui(n) {
    for (; n != null; n = n.nextSibling) {
      var r = n.nodeType;
      if (r === 1 || r === 3)
        break;
      if (r === 8) {
        if (r = n.data, r === "$" || r === "$!" || r === "$?")
          break;
        if (r === "/$")
          return null;
      }
    }
    return n;
  }
  function ss(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var l = n.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (r === 0)
            return n;
          r--;
        } else
          l === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var xl = Math.random().toString(36).slice(2), Si = "__reactFiber$" + xl, ru = "__reactProps$" + xl, $i = "__reactContainer$" + xl, pd = "__reactEvents$" + xl, ay = "__reactListeners$" + xl, vd = "__reactHandles$" + xl;
  function za(n) {
    var r = n[Si];
    if (r)
      return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[$i] || l[Si]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null)
          for (n = ss(n); n !== null; ) {
            if (l = n[Si])
              return l;
            n = ss(n);
          }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function cs(n) {
    return n = n[Si] || n[$i], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function Zu(n) {
    if (n.tag === 5 || n.tag === 6)
      return n.stateNode;
    throw Error(A(33));
  }
  function Le(n) {
    return n[ru] || null;
  }
  var wl = [], un = -1;
  function tt(n) {
    return { current: n };
  }
  function jt(n) {
    0 > un || (n.current = wl[un], wl[un] = null, un--);
  }
  function $t(n, r) {
    un++, wl[un] = n.current, n.current = r;
  }
  var Ei = {}, Ye = tt(Ei), xn = tt(!1), Zr = Ei;
  function Ua(n, r) {
    var l = n.type.contextTypes;
    if (!l)
      return Ei;
    var o = n.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === r)
      return o.__reactInternalMemoizedMaskedChildContext;
    var c = {}, d;
    for (d in l)
      c[d] = r[d];
    return o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function dn(n) {
    return n = n.childContextTypes, n != null;
  }
  function Aa() {
    jt(xn), jt(Ye);
  }
  function bl(n, r, l) {
    if (Ye.current !== Ei)
      throw Error(A(168));
    $t(Ye, r), $t(xn, l);
  }
  function fs(n, r, l) {
    var o = n.stateNode;
    if (r = r.childContextTypes, typeof o.getChildContext != "function")
      return l;
    o = o.getChildContext();
    for (var c in o)
      if (!(c in r))
        throw Error(A(108, St(n) || "Unknown", c));
    return ae({}, l, o);
  }
  function hc(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Ei, Zr = Ye.current, $t(Ye, n), $t(xn, xn.current), !0;
  }
  function bv(n, r, l) {
    var o = n.stateNode;
    if (!o)
      throw Error(A(169));
    l ? (n = fs(n, r, Zr), o.__reactInternalMemoizedMergedChildContext = n, jt(xn), jt(Ye), $t(Ye, n)) : jt(xn), $t(xn, l);
  }
  var ga = null, Jn = !1, ds = !1;
  function hd(n) {
    ga === null ? ga = [n] : ga.push(n);
  }
  function md(n) {
    Jn = !0, hd(n);
  }
  function Jr() {
    if (!ds && ga !== null) {
      ds = !0;
      var n = 0, r = Ot;
      try {
        var l = ga;
        for (Ot = 1; n < l.length; n++) {
          var o = l[n];
          do
            o = o(!0);
          while (o !== null);
        }
        ga = null, Jn = !1;
      } catch (c) {
        throw ga !== null && (ga = ga.slice(n + 1)), Kt(Dr, Jr), c;
      } finally {
        Ot = r, ds = !1;
      }
    }
    return null;
  }
  var _l = [], ea = 0, au = null, Ju = 0, ta = [], Cr = 0, ja = null, ir = 1, Ii = "";
  function Sa(n, r) {
    _l[ea++] = Ju, _l[ea++] = au, au = n, Ju = r;
  }
  function yd(n, r, l) {
    ta[Cr++] = ir, ta[Cr++] = Ii, ta[Cr++] = ja, ja = n;
    var o = ir;
    n = Ii;
    var c = 32 - Or(o) - 1;
    o &= ~(1 << c), l += 1;
    var d = 32 - Or(r) + c;
    if (30 < d) {
      var m = c - c % 5;
      d = (o & (1 << m) - 1).toString(32), o >>= m, c -= m, ir = 1 << 32 - Or(r) + c | l << c | o, Ii = d + n;
    } else
      ir = 1 << d | l << c | o, Ii = n;
  }
  function mc(n) {
    n.return !== null && (Sa(n, 1), yd(n, 1, 0));
  }
  function gd(n) {
    for (; n === au; )
      au = _l[--ea], _l[ea] = null, Ju = _l[--ea], _l[ea] = null;
    for (; n === ja; )
      ja = ta[--Cr], ta[Cr] = null, Ii = ta[--Cr], ta[Cr] = null, ir = ta[--Cr], ta[Cr] = null;
  }
  var Ea = null, na = null, on = !1, Fa = null;
  function Sd(n, r) {
    var l = Qa(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function _v(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, Ea = n, na = ui(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, Ea = n, na = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = ja !== null ? { id: ir, overflow: Ii } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = Qa(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, Ea = n, na = null, !0) : !1;
      default:
        return !1;
    }
  }
  function yc(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function gc(n) {
    if (on) {
      var r = na;
      if (r) {
        var l = r;
        if (!_v(n, r)) {
          if (yc(n))
            throw Error(A(418));
          r = ui(l.nextSibling);
          var o = Ea;
          r && _v(n, r) ? Sd(o, l) : (n.flags = n.flags & -4097 | 2, on = !1, Ea = n);
        }
      } else {
        if (yc(n))
          throw Error(A(418));
        n.flags = n.flags & -4097 | 2, on = !1, Ea = n;
      }
    }
  }
  function kv(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; )
      n = n.return;
    Ea = n;
  }
  function Sc(n) {
    if (n !== Ea)
      return !1;
    if (!on)
      return kv(n), on = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !os(n.type, n.memoizedProps)), r && (r = na)) {
      if (yc(n))
        throw Dv(), Error(A(418));
      for (; r; )
        Sd(n, r), r = ui(r.nextSibling);
    }
    if (kv(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n)
        throw Error(A(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                na = ui(n.nextSibling);
                break e;
              }
              r--;
            } else
              l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        na = null;
      }
    } else
      na = Ea ? ui(n.stateNode.nextSibling) : null;
    return !0;
  }
  function Dv() {
    for (var n = na; n; )
      n = ui(n.nextSibling);
  }
  function Sn() {
    na = Ea = null, on = !1;
  }
  function Ed(n) {
    Fa === null ? Fa = [n] : Fa.push(n);
  }
  var Ec = mt.ReactCurrentBatchConfig;
  function iu(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1)
            throw Error(A(309));
          var o = l.stateNode;
        }
        if (!o)
          throw Error(A(147, n));
        var c = o, d = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === d ? r.ref : (r = function(m) {
          var E = c.refs;
          m === null ? delete E[d] : E[d] = m;
        }, r._stringRef = d, r);
      }
      if (typeof n != "string")
        throw Error(A(284));
      if (!l._owner)
        throw Error(A(290, n));
    }
    return n;
  }
  function Ci(n, r) {
    throw n = Object.prototype.toString.call(r), Error(A(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function Ov(n) {
    var r = n._init;
    return r(n._payload);
  }
  function Cc(n) {
    function r(k, w) {
      if (n) {
        var L = k.deletions;
        L === null ? (k.deletions = [w], k.flags |= 16) : L.push(w);
      }
    }
    function l(k, w) {
      if (!n)
        return null;
      for (; w !== null; )
        r(k, w), w = w.sibling;
      return null;
    }
    function o(k, w) {
      for (k = /* @__PURE__ */ new Map(); w !== null; )
        w.key !== null ? k.set(w.key, w) : k.set(w.index, w), w = w.sibling;
      return k;
    }
    function c(k, w) {
      return k = Ul(k, w), k.index = 0, k.sibling = null, k;
    }
    function d(k, w, L) {
      return k.index = L, n ? (L = k.alternate, L !== null ? (L = L.index, L < w ? (k.flags |= 2, w) : L) : (k.flags |= 2, w)) : (k.flags |= 1048576, w);
    }
    function m(k) {
      return n && k.alternate === null && (k.flags |= 2), k;
    }
    function E(k, w, L, Z) {
      return w === null || w.tag !== 6 ? (w = sf(L, k.mode, Z), w.return = k, w) : (w = c(w, L), w.return = k, w);
    }
    function T(k, w, L, Z) {
      var Te = L.type;
      return Te === Pe ? Y(k, w, L.props.children, Z, L.key) : w !== null && (w.elementType === Te || typeof Te == "object" && Te !== null && Te.$$typeof === bt && Ov(Te) === w.type) ? (Z = c(w, L.props), Z.ref = iu(k, w, L), Z.return = k, Z) : (Z = uf(L.type, L.key, L.props, null, k.mode, Z), Z.ref = iu(k, w, L), Z.return = k, Z);
    }
    function z(k, w, L, Z) {
      return w === null || w.tag !== 4 || w.stateNode.containerInfo !== L.containerInfo || w.stateNode.implementation !== L.implementation ? (w = Os(L, k.mode, Z), w.return = k, w) : (w = c(w, L.children || []), w.return = k, w);
    }
    function Y(k, w, L, Z, Te) {
      return w === null || w.tag !== 7 ? (w = Eu(L, k.mode, Z, Te), w.return = k, w) : (w = c(w, L), w.return = k, w);
    }
    function Q(k, w, L) {
      if (typeof w == "string" && w !== "" || typeof w == "number")
        return w = sf("" + w, k.mode, L), w.return = k, w;
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case Oe:
            return L = uf(w.type, w.key, w.props, null, k.mode, L), L.ref = iu(k, null, w), L.return = k, L;
          case ft:
            return w = Os(w, k.mode, L), w.return = k, w;
          case bt:
            var Z = w._init;
            return Q(k, Z(w._payload), L);
        }
        if (qn(w) || _e(w))
          return w = Eu(w, k.mode, L, null), w.return = k, w;
        Ci(k, w);
      }
      return null;
    }
    function I(k, w, L, Z) {
      var Te = w !== null ? w.key : null;
      if (typeof L == "string" && L !== "" || typeof L == "number")
        return Te !== null ? null : E(k, w, "" + L, Z);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case Oe:
            return L.key === Te ? T(k, w, L, Z) : null;
          case ft:
            return L.key === Te ? z(k, w, L, Z) : null;
          case bt:
            return Te = L._init, I(
              k,
              w,
              Te(L._payload),
              Z
            );
        }
        if (qn(L) || _e(L))
          return Te !== null ? null : Y(k, w, L, Z, null);
        Ci(k, L);
      }
      return null;
    }
    function ce(k, w, L, Z, Te) {
      if (typeof Z == "string" && Z !== "" || typeof Z == "number")
        return k = k.get(L) || null, E(w, k, "" + Z, Te);
      if (typeof Z == "object" && Z !== null) {
        switch (Z.$$typeof) {
          case Oe:
            return k = k.get(Z.key === null ? L : Z.key) || null, T(w, k, Z, Te);
          case ft:
            return k = k.get(Z.key === null ? L : Z.key) || null, z(w, k, Z, Te);
          case bt:
            var Fe = Z._init;
            return ce(k, w, L, Fe(Z._payload), Te);
        }
        if (qn(Z) || _e(Z))
          return k = k.get(L) || null, Y(w, k, Z, Te, null);
        Ci(w, Z);
      }
      return null;
    }
    function ye(k, w, L, Z) {
      for (var Te = null, Fe = null, ge = w, He = w = 0, Qn = null; ge !== null && He < L.length; He++) {
        ge.index > He ? (Qn = ge, ge = null) : Qn = ge.sibling;
        var Lt = I(k, ge, L[He], Z);
        if (Lt === null) {
          ge === null && (ge = Qn);
          break;
        }
        n && ge && Lt.alternate === null && r(k, ge), w = d(Lt, w, He), Fe === null ? Te = Lt : Fe.sibling = Lt, Fe = Lt, ge = Qn;
      }
      if (He === L.length)
        return l(k, ge), on && Sa(k, He), Te;
      if (ge === null) {
        for (; He < L.length; He++)
          ge = Q(k, L[He], Z), ge !== null && (w = d(ge, w, He), Fe === null ? Te = ge : Fe.sibling = ge, Fe = ge);
        return on && Sa(k, He), Te;
      }
      for (ge = o(k, ge); He < L.length; He++)
        Qn = ce(ge, k, He, L[He], Z), Qn !== null && (n && Qn.alternate !== null && ge.delete(Qn.key === null ? He : Qn.key), w = d(Qn, w, He), Fe === null ? Te = Qn : Fe.sibling = Qn, Fe = Qn);
      return n && ge.forEach(function(Xi) {
        return r(k, Xi);
      }), on && Sa(k, He), Te;
    }
    function Ce(k, w, L, Z) {
      var Te = _e(L);
      if (typeof Te != "function")
        throw Error(A(150));
      if (L = Te.call(L), L == null)
        throw Error(A(151));
      for (var Fe = Te = null, ge = w, He = w = 0, Qn = null, Lt = L.next(); ge !== null && !Lt.done; He++, Lt = L.next()) {
        ge.index > He ? (Qn = ge, ge = null) : Qn = ge.sibling;
        var Xi = I(k, ge, Lt.value, Z);
        if (Xi === null) {
          ge === null && (ge = Qn);
          break;
        }
        n && ge && Xi.alternate === null && r(k, ge), w = d(Xi, w, He), Fe === null ? Te = Xi : Fe.sibling = Xi, Fe = Xi, ge = Qn;
      }
      if (Lt.done)
        return l(
          k,
          ge
        ), on && Sa(k, He), Te;
      if (ge === null) {
        for (; !Lt.done; He++, Lt = L.next())
          Lt = Q(k, Lt.value, Z), Lt !== null && (w = d(Lt, w, He), Fe === null ? Te = Lt : Fe.sibling = Lt, Fe = Lt);
        return on && Sa(k, He), Te;
      }
      for (ge = o(k, ge); !Lt.done; He++, Lt = L.next())
        Lt = ce(ge, k, He, Lt.value, Z), Lt !== null && (n && Lt.alternate !== null && ge.delete(Lt.key === null ? He : Lt.key), w = d(Lt, w, He), Fe === null ? Te = Lt : Fe.sibling = Lt, Fe = Lt);
      return n && ge.forEach(function(Ry) {
        return r(k, Ry);
      }), on && Sa(k, He), Te;
    }
    function Nn(k, w, L, Z) {
      if (typeof L == "object" && L !== null && L.type === Pe && L.key === null && (L = L.props.children), typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case Oe:
            e: {
              for (var Te = L.key, Fe = w; Fe !== null; ) {
                if (Fe.key === Te) {
                  if (Te = L.type, Te === Pe) {
                    if (Fe.tag === 7) {
                      l(k, Fe.sibling), w = c(Fe, L.props.children), w.return = k, k = w;
                      break e;
                    }
                  } else if (Fe.elementType === Te || typeof Te == "object" && Te !== null && Te.$$typeof === bt && Ov(Te) === Fe.type) {
                    l(k, Fe.sibling), w = c(Fe, L.props), w.ref = iu(k, Fe, L), w.return = k, k = w;
                    break e;
                  }
                  l(k, Fe);
                  break;
                } else
                  r(k, Fe);
                Fe = Fe.sibling;
              }
              L.type === Pe ? (w = Eu(L.props.children, k.mode, Z, L.key), w.return = k, k = w) : (Z = uf(L.type, L.key, L.props, null, k.mode, Z), Z.ref = iu(k, w, L), Z.return = k, k = Z);
            }
            return m(k);
          case ft:
            e: {
              for (Fe = L.key; w !== null; ) {
                if (w.key === Fe)
                  if (w.tag === 4 && w.stateNode.containerInfo === L.containerInfo && w.stateNode.implementation === L.implementation) {
                    l(k, w.sibling), w = c(w, L.children || []), w.return = k, k = w;
                    break e;
                  } else {
                    l(k, w);
                    break;
                  }
                else
                  r(k, w);
                w = w.sibling;
              }
              w = Os(L, k.mode, Z), w.return = k, k = w;
            }
            return m(k);
          case bt:
            return Fe = L._init, Nn(k, w, Fe(L._payload), Z);
        }
        if (qn(L))
          return ye(k, w, L, Z);
        if (_e(L))
          return Ce(k, w, L, Z);
        Ci(k, L);
      }
      return typeof L == "string" && L !== "" || typeof L == "number" ? (L = "" + L, w !== null && w.tag === 6 ? (l(k, w.sibling), w = c(w, L), w.return = k, k = w) : (l(k, w), w = sf(L, k.mode, Z), w.return = k, k = w), m(k)) : l(k, w);
    }
    return Nn;
  }
  var eo = Cc(!0), Lv = Cc(!1), Yi = tt(null), Bn = null, ne = null, Ha = null;
  function Ca() {
    Ha = ne = Bn = null;
  }
  function Cd(n) {
    var r = Yi.current;
    jt(Yi), n._currentValue = r;
  }
  function Rd(n, r, l) {
    for (; n !== null; ) {
      var o = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, o !== null && (o.childLanes |= r)) : o !== null && (o.childLanes & r) !== r && (o.childLanes |= r), n === l)
        break;
      n = n.return;
    }
  }
  function to(n, r) {
    Bn = n, Ha = ne = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (ia = !0), n.firstContext = null);
  }
  function Va(n) {
    var r = n._currentValue;
    if (Ha !== n)
      if (n = { context: n, memoizedValue: r, next: null }, ne === null) {
        if (Bn === null)
          throw Error(A(308));
        ne = n, Bn.dependencies = { lanes: 0, firstContext: n };
      } else
        ne = ne.next = n;
    return r;
  }
  var lu = null;
  function Fn(n) {
    lu === null ? lu = [n] : lu.push(n);
  }
  function Mv(n, r, l, o) {
    var c = r.interleaved;
    return c === null ? (l.next = l, Fn(r)) : (l.next = c.next, c.next = l), r.interleaved = l, Qi(n, o);
  }
  function Qi(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; )
      n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var kl = !1;
  function Rc(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function no(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function ra(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function Dl(n, r, l) {
    var o = n.updateQueue;
    if (o === null)
      return null;
    if (o = o.shared, yt & 2) {
      var c = o.pending;
      return c === null ? r.next = r : (r.next = c.next, c.next = r), o.pending = r, Qi(n, l);
    }
    return c = o.interleaved, c === null ? (r.next = r, Fn(o)) : (r.next = c.next, c.next = r), o.interleaved = r, Qi(n, l);
  }
  function Tc(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, yi(n, l);
    }
  }
  function Nv(n, r) {
    var l = n.updateQueue, o = n.alternate;
    if (o !== null && (o = o.updateQueue, l === o)) {
      var c = null, d = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var m = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          d === null ? c = d = m : d = d.next = m, l = l.next;
        } while (l !== null);
        d === null ? c = d = r : d = d.next = r;
      } else
        c = d = r;
      l = { baseState: o.baseState, firstBaseUpdate: c, lastBaseUpdate: d, shared: o.shared, effects: o.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function xc(n, r, l, o) {
    var c = n.updateQueue;
    kl = !1;
    var d = c.firstBaseUpdate, m = c.lastBaseUpdate, E = c.shared.pending;
    if (E !== null) {
      c.shared.pending = null;
      var T = E, z = T.next;
      T.next = null, m === null ? d = z : m.next = z, m = T;
      var Y = n.alternate;
      Y !== null && (Y = Y.updateQueue, E = Y.lastBaseUpdate, E !== m && (E === null ? Y.firstBaseUpdate = z : E.next = z, Y.lastBaseUpdate = T));
    }
    if (d !== null) {
      var Q = c.baseState;
      m = 0, Y = z = T = null, E = d;
      do {
        var I = E.lane, ce = E.eventTime;
        if ((o & I) === I) {
          Y !== null && (Y = Y.next = {
            eventTime: ce,
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          });
          e: {
            var ye = n, Ce = E;
            switch (I = r, ce = l, Ce.tag) {
              case 1:
                if (ye = Ce.payload, typeof ye == "function") {
                  Q = ye.call(ce, Q, I);
                  break e;
                }
                Q = ye;
                break e;
              case 3:
                ye.flags = ye.flags & -65537 | 128;
              case 0:
                if (ye = Ce.payload, I = typeof ye == "function" ? ye.call(ce, Q, I) : ye, I == null)
                  break e;
                Q = ae({}, Q, I);
                break e;
              case 2:
                kl = !0;
            }
          }
          E.callback !== null && E.lane !== 0 && (n.flags |= 64, I = c.effects, I === null ? c.effects = [E] : I.push(E));
        } else
          ce = { eventTime: ce, lane: I, tag: E.tag, payload: E.payload, callback: E.callback, next: null }, Y === null ? (z = Y = ce, T = Q) : Y = Y.next = ce, m |= I;
        if (E = E.next, E === null) {
          if (E = c.shared.pending, E === null)
            break;
          I = E, E = I.next, I.next = null, c.lastBaseUpdate = I, c.shared.pending = null;
        }
      } while (1);
      if (Y === null && (T = Q), c.baseState = T, c.firstBaseUpdate = z, c.lastBaseUpdate = Y, r = c.shared.interleaved, r !== null) {
        c = r;
        do
          m |= c.lane, c = c.next;
        while (c !== r);
      } else
        d === null && (c.shared.lanes = 0);
      mu |= m, n.lanes = m, n.memoizedState = Q;
    }
  }
  function zv(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null)
      for (r = 0; r < n.length; r++) {
        var o = n[r], c = o.callback;
        if (c !== null) {
          if (o.callback = null, o = l, typeof c != "function")
            throw Error(A(191, c));
          c.call(o);
        }
      }
  }
  var ps = {}, oi = tt(ps), ro = tt(ps), vs = tt(ps);
  function uu(n) {
    if (n === ps)
      throw Error(A(174));
    return n;
  }
  function Td(n, r) {
    switch ($t(vs, r), $t(ro, n), $t(oi, ps), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : mn(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = mn(r, n);
    }
    jt(oi), $t(oi, r);
  }
  function ao() {
    jt(oi), jt(ro), jt(vs);
  }
  function Uv(n) {
    uu(vs.current);
    var r = uu(oi.current), l = mn(r, n.type);
    r !== l && ($t(ro, n), $t(oi, l));
  }
  function xd(n) {
    ro.current === n && (jt(oi), jt(ro));
  }
  var pn = tt(0);
  function wc(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var l = r.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || l.data === "$?" || l.data === "$!"))
          return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if (r.flags & 128)
          return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === n)
        break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === n)
          return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  var bc = [];
  function wd() {
    for (var n = 0; n < bc.length; n++)
      bc[n]._workInProgressVersionPrimary = null;
    bc.length = 0;
  }
  var _c = mt.ReactCurrentDispatcher, hs = mt.ReactCurrentBatchConfig, Re = 0, we = null, Qe = null, vt = null, Ra = !1, io = !1, ms = 0, iy = 0;
  function Rr() {
    throw Error(A(321));
  }
  function ys(n, r) {
    if (r === null)
      return !1;
    for (var l = 0; l < r.length && l < n.length; l++)
      if (!Na(n[l], r[l]))
        return !1;
    return !0;
  }
  function B(n, r, l, o, c, d) {
    if (Re = d, we = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, _c.current = n === null || n.memoizedState === null ? ly : nn, n = l(o, c), io) {
      d = 0;
      do {
        if (io = !1, ms = 0, 25 <= d)
          throw Error(A(301));
        d += 1, vt = Qe = null, r.updateQueue = null, _c.current = Bc, n = l(o, c);
      } while (io);
    }
    if (_c.current = Tr, r = Qe !== null && Qe.next !== null, Re = 0, vt = Qe = we = null, Ra = !1, r)
      throw Error(A(300));
    return n;
  }
  function Hn() {
    var n = ms !== 0;
    return ms = 0, n;
  }
  function De() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return vt === null ? we.memoizedState = vt = n : vt = vt.next = n, vt;
  }
  function lr() {
    if (Qe === null) {
      var n = we.alternate;
      n = n !== null ? n.memoizedState : null;
    } else
      n = Qe.next;
    var r = vt === null ? we.memoizedState : vt.next;
    if (r !== null)
      vt = r, Qe = n;
    else {
      if (n === null)
        throw Error(A(310));
      Qe = n, n = { memoizedState: Qe.memoizedState, baseState: Qe.baseState, baseQueue: Qe.baseQueue, queue: Qe.queue, next: null }, vt === null ? we.memoizedState = vt = n : vt = vt.next = n;
    }
    return vt;
  }
  function Ta(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Wi(n) {
    var r = lr(), l = r.queue;
    if (l === null)
      throw Error(A(311));
    l.lastRenderedReducer = n;
    var o = Qe, c = o.baseQueue, d = l.pending;
    if (d !== null) {
      if (c !== null) {
        var m = c.next;
        c.next = d.next, d.next = m;
      }
      o.baseQueue = c = d, l.pending = null;
    }
    if (c !== null) {
      d = c.next, o = o.baseState;
      var E = m = null, T = null, z = d;
      do {
        var Y = z.lane;
        if ((Re & Y) === Y)
          T !== null && (T = T.next = { lane: 0, action: z.action, hasEagerState: z.hasEagerState, eagerState: z.eagerState, next: null }), o = z.hasEagerState ? z.eagerState : n(o, z.action);
        else {
          var Q = {
            lane: Y,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          };
          T === null ? (E = T = Q, m = o) : T = T.next = Q, we.lanes |= Y, mu |= Y;
        }
        z = z.next;
      } while (z !== null && z !== d);
      T === null ? m = o : T.next = E, Na(o, r.memoizedState) || (ia = !0), r.memoizedState = o, r.baseState = m, r.baseQueue = T, l.lastRenderedState = o;
    }
    if (n = l.interleaved, n !== null) {
      c = n;
      do
        d = c.lane, we.lanes |= d, mu |= d, c = c.next;
      while (c !== n);
    } else
      c === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Pa(n) {
    var r = lr(), l = r.queue;
    if (l === null)
      throw Error(A(311));
    l.lastRenderedReducer = n;
    var o = l.dispatch, c = l.pending, d = r.memoizedState;
    if (c !== null) {
      l.pending = null;
      var m = c = c.next;
      do
        d = n(d, m.action), m = m.next;
      while (m !== c);
      Na(d, r.memoizedState) || (ia = !0), r.memoizedState = d, r.baseQueue === null && (r.baseState = d), l.lastRenderedState = d;
    }
    return [d, o];
  }
  function lo() {
  }
  function ou(n, r) {
    var l = we, o = lr(), c = r(), d = !Na(o.memoizedState, c);
    if (d && (o.memoizedState = c, ia = !0), o = o.queue, gs(Dc.bind(null, l, o, n), [n]), o.getSnapshot !== r || d || vt !== null && vt.memoizedState.tag & 1) {
      if (l.flags |= 2048, su(9, kc.bind(null, l, o, c, r), void 0, null), bn === null)
        throw Error(A(349));
      Re & 30 || uo(l, r, c);
    }
    return c;
  }
  function uo(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = we.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, we.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function kc(n, r, l, o) {
    r.value = l, r.getSnapshot = o, Oc(r) && Lc(n);
  }
  function Dc(n, r, l) {
    return l(function() {
      Oc(r) && Lc(n);
    });
  }
  function Oc(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !Na(n, l);
    } catch {
      return !0;
    }
  }
  function Lc(n) {
    var r = Qi(n, 1);
    r !== null && En(r, n, 1, -1);
  }
  function Mc(n) {
    var r = De();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ta, lastRenderedState: n }, r.queue = n, n = n.dispatch = Ss.bind(null, we, n), [r.memoizedState, n];
  }
  function su(n, r, l, o) {
    return n = { tag: n, create: r, destroy: l, deps: o, next: null }, r = we.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, we.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (o = l.next, l.next = n, n.next = o, r.lastEffect = n)), n;
  }
  function Nc() {
    return lr().memoizedState;
  }
  function oo(n, r, l, o) {
    var c = De();
    we.flags |= n, c.memoizedState = su(1 | r, l, void 0, o === void 0 ? null : o);
  }
  function so(n, r, l, o) {
    var c = lr();
    o = o === void 0 ? null : o;
    var d = void 0;
    if (Qe !== null) {
      var m = Qe.memoizedState;
      if (d = m.destroy, o !== null && ys(o, m.deps)) {
        c.memoizedState = su(r, l, d, o);
        return;
      }
    }
    we.flags |= n, c.memoizedState = su(1 | r, l, d, o);
  }
  function zc(n, r) {
    return oo(8390656, 8, n, r);
  }
  function gs(n, r) {
    return so(2048, 8, n, r);
  }
  function Uc(n, r) {
    return so(4, 2, n, r);
  }
  function Ac(n, r) {
    return so(4, 4, n, r);
  }
  function jc(n, r) {
    if (typeof r == "function")
      return n = n(), r(n), function() {
        r(null);
      };
    if (r != null)
      return n = n(), r.current = n, function() {
        r.current = null;
      };
  }
  function Fc(n, r, l) {
    return l = l != null ? l.concat([n]) : null, so(4, 4, jc.bind(null, r, n), l);
  }
  function co() {
  }
  function cu(n, r) {
    var l = lr();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && ys(r, o[1]) ? o[0] : (l.memoizedState = [n, r], n);
  }
  function Hc(n, r) {
    var l = lr();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && ys(r, o[1]) ? o[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function Vc(n, r, l) {
    return Re & 21 ? (Na(l, r) || (l = ju(), we.lanes |= l, mu |= l, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, ia = !0), n.memoizedState = l);
  }
  function bd(n, r) {
    var l = Ot;
    Ot = l !== 0 && 4 > l ? l : 4, n(!0);
    var o = hs.transition;
    hs.transition = {};
    try {
      n(!1), r();
    } finally {
      Ot = l, hs.transition = o;
    }
  }
  function Pc() {
    return lr().memoizedState;
  }
  function Av(n, r, l) {
    var o = Ki(n);
    if (l = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null }, _d(n))
      fo(r, l);
    else if (l = Mv(n, r, l, o), l !== null) {
      var c = nr();
      En(l, n, o, c), Ol(l, r, o);
    }
  }
  function Ss(n, r, l) {
    var o = Ki(n), c = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (_d(n))
      fo(r, c);
    else {
      var d = n.alternate;
      if (n.lanes === 0 && (d === null || d.lanes === 0) && (d = r.lastRenderedReducer, d !== null))
        try {
          var m = r.lastRenderedState, E = d(m, l);
          if (c.hasEagerState = !0, c.eagerState = E, Na(E, m)) {
            var T = r.interleaved;
            T === null ? (c.next = c, Fn(r)) : (c.next = T.next, T.next = c), r.interleaved = c;
            return;
          }
        } catch {
        } finally {
        }
      l = Mv(n, r, c, o), l !== null && (c = nr(), En(l, n, o, c), Ol(l, r, o));
    }
  }
  function _d(n) {
    var r = n.alternate;
    return n === we || r !== null && r === we;
  }
  function fo(n, r) {
    io = Ra = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function Ol(n, r, l) {
    if (l & 4194240) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, yi(n, l);
    }
  }
  var Tr = { readContext: Va, useCallback: Rr, useContext: Rr, useEffect: Rr, useImperativeHandle: Rr, useInsertionEffect: Rr, useLayoutEffect: Rr, useMemo: Rr, useReducer: Rr, useRef: Rr, useState: Rr, useDebugValue: Rr, useDeferredValue: Rr, useTransition: Rr, useMutableSource: Rr, useSyncExternalStore: Rr, useId: Rr, unstable_isNewReconciler: !1 }, ly = { readContext: Va, useCallback: function(n, r) {
    return De().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: Va, useEffect: zc, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, oo(
      4194308,
      4,
      jc.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return oo(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return oo(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = De();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var o = De();
    return r = l !== void 0 ? l(r) : r, o.memoizedState = o.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, o.queue = n, n = n.dispatch = Av.bind(null, we, n), [o.memoizedState, n];
  }, useRef: function(n) {
    var r = De();
    return n = { current: n }, r.memoizedState = n;
  }, useState: Mc, useDebugValue: co, useDeferredValue: function(n) {
    return De().memoizedState = n;
  }, useTransition: function() {
    var n = Mc(!1), r = n[0];
    return n = bd.bind(null, n[1]), De().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var o = we, c = De();
    if (on) {
      if (l === void 0)
        throw Error(A(407));
      l = l();
    } else {
      if (l = r(), bn === null)
        throw Error(A(349));
      Re & 30 || uo(o, r, l);
    }
    c.memoizedState = l;
    var d = { value: l, getSnapshot: r };
    return c.queue = d, zc(Dc.bind(
      null,
      o,
      d,
      n
    ), [n]), o.flags |= 2048, su(9, kc.bind(null, o, d, l, r), void 0, null), l;
  }, useId: function() {
    var n = De(), r = bn.identifierPrefix;
    if (on) {
      var l = Ii, o = ir;
      l = (o & ~(1 << 32 - Or(o) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = ms++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else
      l = iy++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, nn = {
    readContext: Va,
    useCallback: cu,
    useContext: Va,
    useEffect: gs,
    useImperativeHandle: Fc,
    useInsertionEffect: Uc,
    useLayoutEffect: Ac,
    useMemo: Hc,
    useReducer: Wi,
    useRef: Nc,
    useState: function() {
      return Wi(Ta);
    },
    useDebugValue: co,
    useDeferredValue: function(n) {
      var r = lr();
      return Vc(r, Qe.memoizedState, n);
    },
    useTransition: function() {
      var n = Wi(Ta)[0], r = lr().memoizedState;
      return [n, r];
    },
    useMutableSource: lo,
    useSyncExternalStore: ou,
    useId: Pc,
    unstable_isNewReconciler: !1
  }, Bc = { readContext: Va, useCallback: cu, useContext: Va, useEffect: gs, useImperativeHandle: Fc, useInsertionEffect: Uc, useLayoutEffect: Ac, useMemo: Hc, useReducer: Pa, useRef: Nc, useState: function() {
    return Pa(Ta);
  }, useDebugValue: co, useDeferredValue: function(n) {
    var r = lr();
    return Qe === null ? r.memoizedState = n : Vc(r, Qe.memoizedState, n);
  }, useTransition: function() {
    var n = Pa(Ta)[0], r = lr().memoizedState;
    return [n, r];
  }, useMutableSource: lo, useSyncExternalStore: ou, useId: Pc, unstable_isNewReconciler: !1 };
  function aa(n, r) {
    if (n && n.defaultProps) {
      r = ae({}, r), n = n.defaultProps;
      for (var l in n)
        r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function fu(n, r, l, o) {
    r = n.memoizedState, l = l(o, r), l = l == null ? r : ae({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var du = { isMounted: function(n) {
    return (n = n._reactInternals) ? xe(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var o = nr(), c = Ki(n), d = ra(o, c);
    d.payload = r, l != null && (d.callback = l), r = Dl(n, d, c), r !== null && (En(r, n, c, o), Tc(r, n, c));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var o = nr(), c = Ki(n), d = ra(o, c);
    d.tag = 1, d.payload = r, l != null && (d.callback = l), r = Dl(n, d, c), r !== null && (En(r, n, c, o), Tc(r, n, c));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = nr(), o = Ki(n), c = ra(l, o);
    c.tag = 2, r != null && (c.callback = r), r = Dl(n, c, o), r !== null && (En(r, n, o, l), Tc(r, n, o));
  } };
  function jv(n, r, l, o, c, d, m) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(o, d, m) : r.prototype && r.prototype.isPureReactComponent ? !ts(l, o) || !ts(c, d) : !0;
  }
  function Fv(n, r, l) {
    var o = !1, c = Ei, d = r.contextType;
    return typeof d == "object" && d !== null ? d = Va(d) : (c = dn(r) ? Zr : Ye.current, o = r.contextTypes, d = (o = o != null) ? Ua(n, c) : Ei), r = new r(l, d), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = du, n.stateNode = r, r._reactInternals = n, o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = d), r;
  }
  function Hv(n, r, l, o) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, o), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, o), r.state !== n && du.enqueueReplaceState(r, r.state, null);
  }
  function kd(n, r, l, o) {
    var c = n.stateNode;
    c.props = l, c.state = n.memoizedState, c.refs = {}, Rc(n);
    var d = r.contextType;
    typeof d == "object" && d !== null ? c.context = Va(d) : (d = dn(r) ? Zr : Ye.current, c.context = Ua(n, d)), c.state = n.memoizedState, d = r.getDerivedStateFromProps, typeof d == "function" && (fu(n, r, d, l), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && du.enqueueReplaceState(c, c.state, null), xc(n, l, c, o), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function Ll(n, r) {
    try {
      var l = "", o = r;
      do
        l += at(o), o = o.return;
      while (o);
      var c = l;
    } catch (d) {
      c = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: n, source: r, stack: c, digest: null };
  }
  function Dd(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function Es(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var Vv = typeof WeakMap == "function" ? WeakMap : Map;
  function Pv(n, r, l) {
    l = ra(-1, l), l.tag = 3, l.payload = { element: null };
    var o = r.value;
    return l.callback = function() {
      ef || (ef = !0, Fd = o), Es(n, r);
    }, l;
  }
  function Bv(n, r, l) {
    l = ra(-1, l), l.tag = 3;
    var o = n.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = r.value;
      l.payload = function() {
        return o(c);
      }, l.callback = function() {
        Es(n, r);
      };
    }
    var d = n.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (l.callback = function() {
      Es(n, r), typeof o != "function" && (Ia === null ? Ia = /* @__PURE__ */ new Set([this]) : Ia.add(this));
      var m = r.stack;
      this.componentDidCatch(r.value, { componentStack: m !== null ? m : "" });
    }), l;
  }
  function Cs(n, r, l) {
    var o = n.pingCache;
    if (o === null) {
      o = n.pingCache = new Vv();
      var c = /* @__PURE__ */ new Set();
      o.set(r, c);
    } else
      c = o.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(r, c));
    c.has(l) || (c.add(l), n = my.bind(null, n, r, l), r.then(n, n));
  }
  function $v(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r)
        return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function Od(n, r, l, o, c) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = c, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = ra(-1, 1), r.tag = 2, Dl(l, r, 1))), l.lanes |= 1), n);
  }
  var Iv = mt.ReactCurrentOwner, ia = !1;
  function Ln(n, r, l, o) {
    r.child = n === null ? Lv(r, null, l, o) : eo(r, n.child, l, o);
  }
  function po(n, r, l, o, c) {
    l = l.render;
    var d = r.ref;
    return to(r, c), o = B(n, r, l, o, d, c), l = Hn(), n !== null && !ia ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Mn(n, r, c)) : (on && l && mc(r), r.flags |= 1, Ln(n, r, o, c), r.child);
  }
  function Ml(n, r, l, o, c) {
    if (n === null) {
      var d = l.type;
      return typeof d == "function" && !$d(d) && d.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = d, $c(n, r, d, o, c)) : (n = uf(l.type, null, o, r, r.mode, c), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (d = n.child, !(n.lanes & c)) {
      var m = d.memoizedProps;
      if (l = l.compare, l = l !== null ? l : ts, l(m, o) && n.ref === r.ref)
        return Mn(n, r, c);
    }
    return r.flags |= 1, n = Ul(d, o), n.ref = r.ref, n.return = r, r.child = n;
  }
  function $c(n, r, l, o, c) {
    if (n !== null) {
      var d = n.memoizedProps;
      if (ts(d, o) && n.ref === r.ref)
        if (ia = !1, r.pendingProps = o = d, (n.lanes & c) !== 0)
          n.flags & 131072 && (ia = !0);
        else
          return r.lanes = n.lanes, Mn(n, r, c);
    }
    return Je(n, r, l, o, c);
  }
  function la(n, r, l) {
    var o = r.pendingProps, c = o.children, d = n !== null ? n.memoizedState : null;
    if (o.mode === "hidden")
      if (!(r.mode & 1))
        r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, $t(To, ua), ua |= l;
      else {
        if (!(l & 1073741824))
          return n = d !== null ? d.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, $t(To, ua), ua |= n, null;
        r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = d !== null ? d.baseLanes : l, $t(To, ua), ua |= o;
      }
    else
      d !== null ? (o = d.baseLanes | l, r.memoizedState = null) : o = l, $t(To, ua), ua |= o;
    return Ln(n, r, c, l), r.child;
  }
  function pu(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function Je(n, r, l, o, c) {
    var d = dn(l) ? Zr : Ye.current;
    return d = Ua(r, d), to(r, c), l = B(n, r, l, o, d, c), o = Hn(), n !== null && !ia ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Mn(n, r, c)) : (on && o && mc(r), r.flags |= 1, Ln(n, r, l, c), r.child);
  }
  function Rs(n, r, l, o, c) {
    if (dn(l)) {
      var d = !0;
      hc(r);
    } else
      d = !1;
    if (to(r, c), r.stateNode === null)
      xs(n, r), Fv(r, l, o), kd(r, l, o, c), o = !0;
    else if (n === null) {
      var m = r.stateNode, E = r.memoizedProps;
      m.props = E;
      var T = m.context, z = l.contextType;
      typeof z == "object" && z !== null ? z = Va(z) : (z = dn(l) ? Zr : Ye.current, z = Ua(r, z));
      var Y = l.getDerivedStateFromProps, Q = typeof Y == "function" || typeof m.getSnapshotBeforeUpdate == "function";
      Q || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== o || T !== z) && Hv(r, m, o, z), kl = !1;
      var I = r.memoizedState;
      m.state = I, xc(r, o, m, c), T = r.memoizedState, E !== o || I !== T || xn.current || kl ? (typeof Y == "function" && (fu(r, l, Y, o), T = r.memoizedState), (E = kl || jv(r, l, E, o, I, T, z)) ? (Q || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = o, r.memoizedState = T), m.props = o, m.state = T, m.context = z, o = E) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), o = !1);
    } else {
      m = r.stateNode, no(n, r), E = r.memoizedProps, z = r.type === r.elementType ? E : aa(r.type, E), m.props = z, Q = r.pendingProps, I = m.context, T = l.contextType, typeof T == "object" && T !== null ? T = Va(T) : (T = dn(l) ? Zr : Ye.current, T = Ua(r, T));
      var ce = l.getDerivedStateFromProps;
      (Y = typeof ce == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== Q || I !== T) && Hv(r, m, o, T), kl = !1, I = r.memoizedState, m.state = I, xc(r, o, m, c);
      var ye = r.memoizedState;
      E !== Q || I !== ye || xn.current || kl ? (typeof ce == "function" && (fu(r, l, ce, o), ye = r.memoizedState), (z = kl || jv(r, l, z, o, I, ye, T) || !1) ? (Y || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(o, ye, T), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(o, ye, T)), typeof m.componentDidUpdate == "function" && (r.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || E === n.memoizedProps && I === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === n.memoizedProps && I === n.memoizedState || (r.flags |= 1024), r.memoizedProps = o, r.memoizedState = ye), m.props = o, m.state = ye, m.context = T, o = z) : (typeof m.componentDidUpdate != "function" || E === n.memoizedProps && I === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === n.memoizedProps && I === n.memoizedState || (r.flags |= 1024), o = !1);
    }
    return Ic(n, r, l, o, d, c);
  }
  function Ic(n, r, l, o, c, d) {
    pu(n, r);
    var m = (r.flags & 128) !== 0;
    if (!o && !m)
      return c && bv(r, l, !1), Mn(n, r, d);
    o = r.stateNode, Iv.current = r;
    var E = m && typeof l.getDerivedStateFromError != "function" ? null : o.render();
    return r.flags |= 1, n !== null && m ? (r.child = eo(r, n.child, null, d), r.child = eo(r, null, E, d)) : Ln(n, r, E, d), r.memoizedState = o.state, c && bv(r, l, !0), r.child;
  }
  function uy(n) {
    var r = n.stateNode;
    r.pendingContext ? bl(n, r.pendingContext, r.pendingContext !== r.context) : r.context && bl(n, r.context, !1), Td(n, r.containerInfo);
  }
  function Yv(n, r, l, o, c) {
    return Sn(), Ed(c), r.flags |= 256, Ln(n, r, l, o), r.child;
  }
  var Ts = { dehydrated: null, treeContext: null, retryLane: 0 };
  function vu(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function Qv(n, r, l) {
    var o = r.pendingProps, c = pn.current, d = !1, m = (r.flags & 128) !== 0, E;
    if ((E = m) || (E = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), E ? (d = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), $t(pn, c & 1), n === null)
      return gc(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (m = o.children, n = o.fallback, d ? (o = r.mode, d = r.child, m = { mode: "hidden", children: m }, !(o & 1) && d !== null ? (d.childLanes = 0, d.pendingProps = m) : d = of(m, o, 0, null), n = Eu(n, o, l, null), d.return = r, n.return = r, d.sibling = n, r.child = d, r.child.memoizedState = vu(l), r.memoizedState = Ts, n) : Yc(r, m));
    if (c = n.memoizedState, c !== null && (E = c.dehydrated, E !== null))
      return Ld(n, r, m, o, E, c, l);
    if (d) {
      d = o.fallback, m = r.mode, c = n.child, E = c.sibling;
      var T = { mode: "hidden", children: o.children };
      return !(m & 1) && r.child !== c ? (o = r.child, o.childLanes = 0, o.pendingProps = T, r.deletions = null) : (o = Ul(c, T), o.subtreeFlags = c.subtreeFlags & 14680064), E !== null ? d = Ul(E, d) : (d = Eu(d, m, l, null), d.flags |= 2), d.return = r, o.return = r, o.sibling = d, r.child = o, o = d, d = r.child, m = n.child.memoizedState, m = m === null ? vu(l) : { baseLanes: m.baseLanes | l, cachePool: null, transitions: m.transitions }, d.memoizedState = m, d.childLanes = n.childLanes & ~l, r.memoizedState = Ts, o;
    }
    return d = n.child, n = d.sibling, o = Ul(d, { mode: "visible", children: o.children }), !(r.mode & 1) && (o.lanes = l), o.return = r, o.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = o, r.memoizedState = null, o;
  }
  function Yc(n, r) {
    return r = of({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function Qc(n, r, l, o) {
    return o !== null && Ed(o), eo(r, n.child, null, l), n = Yc(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function Ld(n, r, l, o, c, d, m) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, o = Dd(Error(A(422))), Qc(n, r, m, o)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (d = o.fallback, c = r.mode, o = of({ mode: "visible", children: o.children }, c, 0, null), d = Eu(d, c, m, null), d.flags |= 2, o.return = r, d.return = r, o.sibling = d, r.child = o, r.mode & 1 && eo(r, n.child, null, m), r.child.memoizedState = vu(m), r.memoizedState = Ts, d);
    if (!(r.mode & 1))
      return Qc(n, r, m, null);
    if (c.data === "$!") {
      if (o = c.nextSibling && c.nextSibling.dataset, o)
        var E = o.dgst;
      return o = E, d = Error(A(419)), o = Dd(d, o, void 0), Qc(n, r, m, o);
    }
    if (E = (m & n.childLanes) !== 0, ia || E) {
      if (o = bn, o !== null) {
        switch (m & -m) {
          case 4:
            c = 2;
            break;
          case 16:
            c = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            c = 32;
            break;
          case 536870912:
            c = 268435456;
            break;
          default:
            c = 0;
        }
        c = c & (o.suspendedLanes | m) ? 0 : c, c !== 0 && c !== d.retryLane && (d.retryLane = c, Qi(n, c), En(o, n, c, -1));
      }
      return Ds(), o = Dd(Error(A(421))), Qc(n, r, m, o);
    }
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = Bd.bind(null, n), c._reactRetry = r, null) : (n = d.treeContext, na = ui(c.nextSibling), Ea = r, on = !0, Fa = null, n !== null && (ta[Cr++] = ir, ta[Cr++] = Ii, ta[Cr++] = ja, ir = n.id, Ii = n.overflow, ja = r), r = Yc(r, o.children), r.flags |= 4096, r);
  }
  function Wv(n, r, l) {
    n.lanes |= r;
    var o = n.alternate;
    o !== null && (o.lanes |= r), Rd(n.return, r, l);
  }
  function Wc(n, r, l, o, c) {
    var d = n.memoizedState;
    d === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: o, tail: l, tailMode: c } : (d.isBackwards = r, d.rendering = null, d.renderingStartTime = 0, d.last = o, d.tail = l, d.tailMode = c);
  }
  function Md(n, r, l) {
    var o = r.pendingProps, c = o.revealOrder, d = o.tail;
    if (Ln(n, r, o.children, l), o = pn.current, o & 2)
      o = o & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128)
        e:
          for (n = r.child; n !== null; ) {
            if (n.tag === 13)
              n.memoizedState !== null && Wv(n, l, r);
            else if (n.tag === 19)
              Wv(n, l, r);
            else if (n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === r)
              break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === r)
                break e;
              n = n.return;
            }
            n.sibling.return = n.return, n = n.sibling;
          }
      o &= 1;
    }
    if ($t(pn, o), !(r.mode & 1))
      r.memoizedState = null;
    else
      switch (c) {
        case "forwards":
          for (l = r.child, c = null; l !== null; )
            n = l.alternate, n !== null && wc(n) === null && (c = l), l = l.sibling;
          l = c, l === null ? (c = r.child, r.child = null) : (c = l.sibling, l.sibling = null), Wc(r, !1, c, l, d);
          break;
        case "backwards":
          for (l = null, c = r.child, r.child = null; c !== null; ) {
            if (n = c.alternate, n !== null && wc(n) === null) {
              r.child = c;
              break;
            }
            n = c.sibling, c.sibling = l, l = c, c = n;
          }
          Wc(r, !0, l, null, d);
          break;
        case "together":
          Wc(r, !1, null, null, void 0);
          break;
        default:
          r.memoizedState = null;
      }
    return r.child;
  }
  function xs(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function Mn(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), mu |= r.lanes, !(l & r.childLanes))
      return null;
    if (n !== null && r.child !== n.child)
      throw Error(A(153));
    if (r.child !== null) {
      for (n = r.child, l = Ul(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; )
        n = n.sibling, l = l.sibling = Ul(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function Gi(n, r, l) {
    switch (r.tag) {
      case 3:
        uy(r), Sn();
        break;
      case 5:
        Uv(r);
        break;
      case 1:
        dn(r.type) && hc(r);
        break;
      case 4:
        Td(r, r.stateNode.containerInfo);
        break;
      case 10:
        var o = r.type._context, c = r.memoizedProps.value;
        $t(Yi, o._currentValue), o._currentValue = c;
        break;
      case 13:
        if (o = r.memoizedState, o !== null)
          return o.dehydrated !== null ? ($t(pn, pn.current & 1), r.flags |= 128, null) : l & r.child.childLanes ? Qv(n, r, l) : ($t(pn, pn.current & 1), n = Mn(n, r, l), n !== null ? n.sibling : null);
        $t(pn, pn.current & 1);
        break;
      case 19:
        if (o = (l & r.childLanes) !== 0, n.flags & 128) {
          if (o)
            return Md(n, r, l);
          r.flags |= 128;
        }
        if (c = r.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), $t(pn, pn.current), o)
          break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, la(n, r, l);
    }
    return Mn(n, r, l);
  }
  var Ri, vo, ho, Ba;
  Ri = function(n, r) {
    for (var l = r.child; l !== null; ) {
      if (l.tag === 5 || l.tag === 6)
        n.appendChild(l.stateNode);
      else if (l.tag !== 4 && l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === r)
        break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === r)
          return;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
  }, vo = function() {
  }, ho = function(n, r, l, o) {
    var c = n.memoizedProps;
    if (c !== o) {
      n = r.stateNode, uu(oi.current);
      var d = null;
      switch (l) {
        case "input":
          c = Gn(n, c), o = Gn(n, o), d = [];
          break;
        case "select":
          c = ae({}, c, { value: void 0 }), o = ae({}, o, { value: void 0 }), d = [];
          break;
        case "textarea":
          c = Qr(n, c), o = Qr(n, o), d = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (n.onclick = vc);
      }
      On(l, o);
      var m;
      l = null;
      for (z in c)
        if (!o.hasOwnProperty(z) && c.hasOwnProperty(z) && c[z] != null)
          if (z === "style") {
            var E = c[z];
            for (m in E)
              E.hasOwnProperty(m) && (l || (l = {}), l[m] = "");
          } else
            z !== "dangerouslySetInnerHTML" && z !== "children" && z !== "suppressContentEditableWarning" && z !== "suppressHydrationWarning" && z !== "autoFocus" && (Ut.hasOwnProperty(z) ? d || (d = []) : (d = d || []).push(z, null));
      for (z in o) {
        var T = o[z];
        if (E = c != null ? c[z] : void 0, o.hasOwnProperty(z) && T !== E && (T != null || E != null))
          if (z === "style")
            if (E) {
              for (m in E)
                !E.hasOwnProperty(m) || T && T.hasOwnProperty(m) || (l || (l = {}), l[m] = "");
              for (m in T)
                T.hasOwnProperty(m) && E[m] !== T[m] && (l || (l = {}), l[m] = T[m]);
            } else
              l || (d || (d = []), d.push(
                z,
                l
              )), l = T;
          else
            z === "dangerouslySetInnerHTML" ? (T = T ? T.__html : void 0, E = E ? E.__html : void 0, T != null && E !== T && (d = d || []).push(z, T)) : z === "children" ? typeof T != "string" && typeof T != "number" || (d = d || []).push(z, "" + T) : z !== "suppressContentEditableWarning" && z !== "suppressHydrationWarning" && (Ut.hasOwnProperty(z) ? (T != null && z === "onScroll" && Jt("scroll", n), d || E === T || (d = [])) : (d = d || []).push(z, T));
      }
      l && (d = d || []).push("style", l);
      var z = d;
      (r.updateQueue = z) && (r.flags |= 4);
    }
  }, Ba = function(n, r, l, o) {
    l !== o && (r.flags |= 4);
  };
  function wn(n, r) {
    if (!on)
      switch (n.tailMode) {
        case "hidden":
          r = n.tail;
          for (var l = null; r !== null; )
            r.alternate !== null && (l = r), r = r.sibling;
          l === null ? n.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = n.tail;
          for (var o = null; l !== null; )
            l.alternate !== null && (o = l), l = l.sibling;
          o === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : o.sibling = null;
      }
  }
  function xr(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, o = 0;
    if (r)
      for (var c = n.child; c !== null; )
        l |= c.lanes | c.childLanes, o |= c.subtreeFlags & 14680064, o |= c.flags & 14680064, c.return = n, c = c.sibling;
    else
      for (c = n.child; c !== null; )
        l |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = n, c = c.sibling;
    return n.subtreeFlags |= o, n.childLanes = l, r;
  }
  function oy(n, r, l) {
    var o = r.pendingProps;
    switch (gd(r), r.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return xr(r), null;
      case 1:
        return dn(r.type) && Aa(), xr(r), null;
      case 3:
        return o = r.stateNode, ao(), jt(xn), jt(Ye), wd(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (n === null || n.child === null) && (Sc(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, Fa !== null && (Hd(Fa), Fa = null))), vo(n, r), xr(r), null;
      case 5:
        xd(r);
        var c = uu(vs.current);
        if (l = r.type, n !== null && r.stateNode != null)
          ho(n, r, l, o, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!o) {
            if (r.stateNode === null)
              throw Error(A(166));
            return xr(r), null;
          }
          if (n = uu(oi.current), Sc(r)) {
            o = r.stateNode, l = r.type;
            var d = r.memoizedProps;
            switch (o[Si] = r, o[ru] = d, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                Jt("cancel", o), Jt("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                Jt("load", o);
                break;
              case "video":
              case "audio":
                for (c = 0; c < is.length; c++)
                  Jt(is[c], o);
                break;
              case "source":
                Jt("error", o);
                break;
              case "img":
              case "image":
              case "link":
                Jt(
                  "error",
                  o
                ), Jt("load", o);
                break;
              case "details":
                Jt("toggle", o);
                break;
              case "input":
                Pn(o, d), Jt("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!d.multiple }, Jt("invalid", o);
                break;
              case "textarea":
                gr(o, d), Jt("invalid", o);
            }
            On(l, d), c = null;
            for (var m in d)
              if (d.hasOwnProperty(m)) {
                var E = d[m];
                m === "children" ? typeof E == "string" ? o.textContent !== E && (d.suppressHydrationWarning !== !0 && pc(o.textContent, E, n), c = ["children", E]) : typeof E == "number" && o.textContent !== "" + E && (d.suppressHydrationWarning !== !0 && pc(
                  o.textContent,
                  E,
                  n
                ), c = ["children", "" + E]) : Ut.hasOwnProperty(m) && E != null && m === "onScroll" && Jt("scroll", o);
              }
            switch (l) {
              case "input":
                mr(o), Ir(o, d, !0);
                break;
              case "textarea":
                mr(o), ar(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (o.onclick = vc);
            }
            o = c, r.updateQueue = o, o !== null && (r.flags |= 4);
          } else {
            m = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = Wr(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = m.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof o.is == "string" ? n = m.createElement(l, { is: o.is }) : (n = m.createElement(l), l === "select" && (m = n, o.multiple ? m.multiple = !0 : o.size && (m.size = o.size))) : n = m.createElementNS(n, l), n[Si] = r, n[ru] = o, Ri(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (m = yn(l, o), l) {
                case "dialog":
                  Jt("cancel", n), Jt("close", n), c = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Jt("load", n), c = o;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < is.length; c++)
                    Jt(is[c], n);
                  c = o;
                  break;
                case "source":
                  Jt("error", n), c = o;
                  break;
                case "img":
                case "image":
                case "link":
                  Jt(
                    "error",
                    n
                  ), Jt("load", n), c = o;
                  break;
                case "details":
                  Jt("toggle", n), c = o;
                  break;
                case "input":
                  Pn(n, o), c = Gn(n, o), Jt("invalid", n);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!o.multiple }, c = ae({}, o, { value: void 0 }), Jt("invalid", n);
                  break;
                case "textarea":
                  gr(n, o), c = Qr(n, o), Jt("invalid", n);
                  break;
                default:
                  c = o;
              }
              On(l, c), E = c;
              for (d in E)
                if (E.hasOwnProperty(d)) {
                  var T = E[d];
                  d === "style" ? At(n, T) : d === "dangerouslySetInnerHTML" ? (T = T ? T.__html : void 0, T != null && di(n, T)) : d === "children" ? typeof T == "string" ? (l !== "textarea" || T !== "") && va(n, T) : typeof T == "number" && va(n, "" + T) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Ut.hasOwnProperty(d) ? T != null && d === "onScroll" && Jt("scroll", n) : T != null && qe(n, d, T, m));
                }
              switch (l) {
                case "input":
                  mr(n), Ir(n, o, !1);
                  break;
                case "textarea":
                  mr(n), ar(n);
                  break;
                case "option":
                  o.value != null && n.setAttribute("value", "" + ot(o.value));
                  break;
                case "select":
                  n.multiple = !!o.multiple, d = o.value, d != null ? yr(n, !!o.multiple, d, !1) : o.defaultValue != null && yr(
                    n,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (n.onclick = vc);
              }
              switch (l) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  o = !!o.autoFocus;
                  break e;
                case "img":
                  o = !0;
                  break e;
                default:
                  o = !1;
              }
            }
            o && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return xr(r), null;
      case 6:
        if (n && r.stateNode != null)
          Ba(n, r, n.memoizedProps, o);
        else {
          if (typeof o != "string" && r.stateNode === null)
            throw Error(A(166));
          if (l = uu(vs.current), uu(oi.current), Sc(r)) {
            if (o = r.stateNode, l = r.memoizedProps, o[Si] = r, (d = o.nodeValue !== l) && (n = Ea, n !== null))
              switch (n.tag) {
                case 3:
                  pc(o.nodeValue, l, (n.mode & 1) !== 0);
                  break;
                case 5:
                  n.memoizedProps.suppressHydrationWarning !== !0 && pc(o.nodeValue, l, (n.mode & 1) !== 0);
              }
            d && (r.flags |= 4);
          } else
            o = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(o), o[Si] = r, r.stateNode = o;
        }
        return xr(r), null;
      case 13:
        if (jt(pn), o = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (on && na !== null && r.mode & 1 && !(r.flags & 128))
            Dv(), Sn(), r.flags |= 98560, d = !1;
          else if (d = Sc(r), o !== null && o.dehydrated !== null) {
            if (n === null) {
              if (!d)
                throw Error(A(318));
              if (d = r.memoizedState, d = d !== null ? d.dehydrated : null, !d)
                throw Error(A(317));
              d[Si] = r;
            } else
              Sn(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            xr(r), d = !1;
          } else
            Fa !== null && (Hd(Fa), Fa = null), d = !0;
          if (!d)
            return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = l, r) : (o = o !== null, o !== (n !== null && n.memoizedState !== null) && o && (r.child.flags |= 8192, r.mode & 1 && (n === null || pn.current & 1 ? In === 0 && (In = 3) : Ds())), r.updateQueue !== null && (r.flags |= 4), xr(r), null);
      case 4:
        return ao(), vo(n, r), n === null && Xu(r.stateNode.containerInfo), xr(r), null;
      case 10:
        return Cd(r.type._context), xr(r), null;
      case 17:
        return dn(r.type) && Aa(), xr(r), null;
      case 19:
        if (jt(pn), d = r.memoizedState, d === null)
          return xr(r), null;
        if (o = (r.flags & 128) !== 0, m = d.rendering, m === null)
          if (o)
            wn(d, !1);
          else {
            if (In !== 0 || n !== null && n.flags & 128)
              for (n = r.child; n !== null; ) {
                if (m = wc(n), m !== null) {
                  for (r.flags |= 128, wn(d, !1), o = m.updateQueue, o !== null && (r.updateQueue = o, r.flags |= 4), r.subtreeFlags = 0, o = l, l = r.child; l !== null; )
                    d = l, n = o, d.flags &= 14680066, m = d.alternate, m === null ? (d.childLanes = 0, d.lanes = n, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = m.childLanes, d.lanes = m.lanes, d.child = m.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = m.memoizedProps, d.memoizedState = m.memoizedState, d.updateQueue = m.updateQueue, d.type = m.type, n = m.dependencies, d.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
                  return $t(pn, pn.current & 1 | 2), r.child;
                }
                n = n.sibling;
              }
            d.tail !== null && Dt() > wo && (r.flags |= 128, o = !0, wn(d, !1), r.lanes = 4194304);
          }
        else {
          if (!o)
            if (n = wc(m), n !== null) {
              if (r.flags |= 128, o = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), wn(d, !0), d.tail === null && d.tailMode === "hidden" && !m.alternate && !on)
                return xr(r), null;
            } else
              2 * Dt() - d.renderingStartTime > wo && l !== 1073741824 && (r.flags |= 128, o = !0, wn(d, !1), r.lanes = 4194304);
          d.isBackwards ? (m.sibling = r.child, r.child = m) : (l = d.last, l !== null ? l.sibling = m : r.child = m, d.last = m);
        }
        return d.tail !== null ? (r = d.tail, d.rendering = r, d.tail = r.sibling, d.renderingStartTime = Dt(), r.sibling = null, l = pn.current, $t(pn, o ? l & 1 | 2 : l & 1), r) : (xr(r), null);
      case 22:
      case 23:
        return af(), o = r.memoizedState !== null, n !== null && n.memoizedState !== null !== o && (r.flags |= 8192), o && r.mode & 1 ? ua & 1073741824 && (xr(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : xr(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(A(156, r.tag));
  }
  function sy(n, r) {
    switch (gd(r), r.tag) {
      case 1:
        return dn(r.type) && Aa(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return ao(), jt(xn), jt(Ye), wd(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return xd(r), null;
      case 13:
        if (jt(pn), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null)
            throw Error(A(340));
          Sn();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return jt(pn), null;
      case 4:
        return ao(), null;
      case 10:
        return Cd(r.type._context), null;
      case 22:
      case 23:
        return af(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var mo = !1, ur = !1, Gc = typeof WeakSet == "function" ? WeakSet : Set, he = null;
  function yo(n, r) {
    var l = n.ref;
    if (l !== null)
      if (typeof l == "function")
        try {
          l(null);
        } catch (o) {
          _n(n, r, o);
        }
      else
        l.current = null;
  }
  function Nd(n, r, l) {
    try {
      l();
    } catch (o) {
      _n(n, r, o);
    }
  }
  var qc = !1;
  function cy(n, r) {
    if (cd = Ma, n = oc(), Vi(n)) {
      if ("selectionStart" in n)
        var l = { start: n.selectionStart, end: n.selectionEnd };
      else
        e: {
          l = (l = n.ownerDocument) && l.defaultView || window;
          var o = l.getSelection && l.getSelection();
          if (o && o.rangeCount !== 0) {
            l = o.anchorNode;
            var c = o.anchorOffset, d = o.focusNode;
            o = o.focusOffset;
            try {
              l.nodeType, d.nodeType;
            } catch {
              l = null;
              break e;
            }
            var m = 0, E = -1, T = -1, z = 0, Y = 0, Q = n, I = null;
            t:
              for (; ; ) {
                for (var ce; Q !== l || c !== 0 && Q.nodeType !== 3 || (E = m + c), Q !== d || o !== 0 && Q.nodeType !== 3 || (T = m + o), Q.nodeType === 3 && (m += Q.nodeValue.length), (ce = Q.firstChild) !== null; )
                  I = Q, Q = ce;
                for (; ; ) {
                  if (Q === n)
                    break t;
                  if (I === l && ++z === c && (E = m), I === d && ++Y === o && (T = m), (ce = Q.nextSibling) !== null)
                    break;
                  Q = I, I = Q.parentNode;
                }
                Q = ce;
              }
            l = E === -1 || T === -1 ? null : { start: E, end: T };
          } else
            l = null;
        }
      l = l || { start: 0, end: 0 };
    } else
      l = null;
    for (tu = { focusedElem: n, selectionRange: l }, Ma = !1, he = r; he !== null; )
      if (r = he, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null)
        n.return = r, he = n;
      else
        for (; he !== null; ) {
          r = he;
          try {
            var ye = r.alternate;
            if (r.flags & 1024)
              switch (r.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (ye !== null) {
                    var Ce = ye.memoizedProps, Nn = ye.memoizedState, k = r.stateNode, w = k.getSnapshotBeforeUpdate(r.elementType === r.type ? Ce : aa(r.type, Ce), Nn);
                    k.__reactInternalSnapshotBeforeUpdate = w;
                  }
                  break;
                case 3:
                  var L = r.stateNode.containerInfo;
                  L.nodeType === 1 ? L.textContent = "" : L.nodeType === 9 && L.documentElement && L.removeChild(L.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(A(163));
              }
          } catch (Z) {
            _n(r, r.return, Z);
          }
          if (n = r.sibling, n !== null) {
            n.return = r.return, he = n;
            break;
          }
          he = r.return;
        }
    return ye = qc, qc = !1, ye;
  }
  function go(n, r, l) {
    var o = r.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var c = o = o.next;
      do {
        if ((c.tag & n) === n) {
          var d = c.destroy;
          c.destroy = void 0, d !== void 0 && Nd(r, l, d);
        }
        c = c.next;
      } while (c !== o);
    }
  }
  function Kc(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & n) === n) {
          var o = l.create;
          l.destroy = o();
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function Xc(n) {
    var r = n.ref;
    if (r !== null) {
      var l = n.stateNode;
      switch (n.tag) {
        case 5:
          n = l;
          break;
        default:
          n = l;
      }
      typeof r == "function" ? r(n) : r.current = n;
    }
  }
  function Gv(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, Gv(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Si], delete r[ru], delete r[pd], delete r[ay], delete r[vd])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function zd(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function qv(n) {
    e:
      for (; ; ) {
        for (; n.sibling === null; ) {
          if (n.return === null || zd(n.return))
            return null;
          n = n.return;
        }
        for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
          if (n.flags & 2 || n.child === null || n.tag === 4)
            continue e;
          n.child.return = n, n = n.child;
        }
        if (!(n.flags & 2))
          return n.stateNode;
      }
  }
  function ws(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6)
      n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = vc));
    else if (o !== 4 && (n = n.child, n !== null))
      for (ws(n, r, l), n = n.sibling; n !== null; )
        ws(n, r, l), n = n.sibling;
  }
  function So(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6)
      n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (o !== 4 && (n = n.child, n !== null))
      for (So(n, r, l), n = n.sibling; n !== null; )
        So(n, r, l), n = n.sibling;
  }
  var vn = null, er = !1;
  function Nr(n, r, l) {
    for (l = l.child; l !== null; )
      Eo(n, r, l), l = l.sibling;
  }
  function Eo(n, r, l) {
    if (Gr && typeof Gr.onCommitFiberUnmount == "function")
      try {
        Gr.onCommitFiberUnmount(dl, l);
      } catch {
      }
    switch (l.tag) {
      case 5:
        ur || yo(l, r);
      case 6:
        var o = vn, c = er;
        vn = null, Nr(n, r, l), vn = o, er = c, vn !== null && (er ? (n = vn, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : vn.removeChild(l.stateNode));
        break;
      case 18:
        vn !== null && (er ? (n = vn, l = l.stateNode, n.nodeType === 8 ? Tl(n.parentNode, l) : n.nodeType === 1 && Tl(n, l), Sl(n)) : Tl(vn, l.stateNode));
        break;
      case 4:
        o = vn, c = er, vn = l.stateNode.containerInfo, er = !0, Nr(n, r, l), vn = o, er = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!ur && (o = l.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          c = o = o.next;
          do {
            var d = c, m = d.destroy;
            d = d.tag, m !== void 0 && (d & 2 || d & 4) && Nd(l, r, m), c = c.next;
          } while (c !== o);
        }
        Nr(n, r, l);
        break;
      case 1:
        if (!ur && (yo(l, r), o = l.stateNode, typeof o.componentWillUnmount == "function"))
          try {
            o.props = l.memoizedProps, o.state = l.memoizedState, o.componentWillUnmount();
          } catch (E) {
            _n(l, r, E);
          }
        Nr(n, r, l);
        break;
      case 21:
        Nr(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (ur = (o = ur) || l.memoizedState !== null, Nr(n, r, l), ur = o) : Nr(n, r, l);
        break;
      default:
        Nr(n, r, l);
    }
  }
  function Co(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new Gc()), r.forEach(function(o) {
        var c = yy.bind(null, n, o);
        l.has(o) || (l.add(o), o.then(c, c));
      });
    }
  }
  function tr(n, r) {
    var l = r.deletions;
    if (l !== null)
      for (var o = 0; o < l.length; o++) {
        var c = l[o];
        try {
          var d = n, m = r, E = m;
          e:
            for (; E !== null; ) {
              switch (E.tag) {
                case 5:
                  vn = E.stateNode, er = !1;
                  break e;
                case 3:
                  vn = E.stateNode.containerInfo, er = !0;
                  break e;
                case 4:
                  vn = E.stateNode.containerInfo, er = !0;
                  break e;
              }
              E = E.return;
            }
          if (vn === null)
            throw Error(A(160));
          Eo(d, m, c), vn = null, er = !1;
          var T = c.alternate;
          T !== null && (T.return = null), c.return = null;
        } catch (z) {
          _n(c, r, z);
        }
      }
    if (r.subtreeFlags & 12854)
      for (r = r.child; r !== null; )
        Kv(r, n), r = r.sibling;
  }
  function Kv(n, r) {
    var l = n.alternate, o = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (tr(r, n), Ti(n), o & 4) {
          try {
            go(3, n, n.return), Kc(3, n);
          } catch (Ce) {
            _n(n, n.return, Ce);
          }
          try {
            go(5, n, n.return);
          } catch (Ce) {
            _n(n, n.return, Ce);
          }
        }
        break;
      case 1:
        tr(r, n), Ti(n), o & 512 && l !== null && yo(l, l.return);
        break;
      case 5:
        if (tr(r, n), Ti(n), o & 512 && l !== null && yo(l, l.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            va(c, "");
          } catch (Ce) {
            _n(n, n.return, Ce);
          }
        }
        if (o & 4 && (c = n.stateNode, c != null)) {
          var d = n.memoizedProps, m = l !== null ? l.memoizedProps : d, E = n.type, T = n.updateQueue;
          if (n.updateQueue = null, T !== null)
            try {
              E === "input" && d.type === "radio" && d.name != null && Un(c, d), yn(E, m);
              var z = yn(E, d);
              for (m = 0; m < T.length; m += 2) {
                var Y = T[m], Q = T[m + 1];
                Y === "style" ? At(c, Q) : Y === "dangerouslySetInnerHTML" ? di(c, Q) : Y === "children" ? va(c, Q) : qe(c, Y, Q, z);
              }
              switch (E) {
                case "input":
                  Dn(c, d);
                  break;
                case "textarea":
                  pa(c, d);
                  break;
                case "select":
                  var I = c._wrapperState.wasMultiple;
                  c._wrapperState.wasMultiple = !!d.multiple;
                  var ce = d.value;
                  ce != null ? yr(c, !!d.multiple, ce, !1) : I !== !!d.multiple && (d.defaultValue != null ? yr(
                    c,
                    !!d.multiple,
                    d.defaultValue,
                    !0
                  ) : yr(c, !!d.multiple, d.multiple ? [] : "", !1));
              }
              c[ru] = d;
            } catch (Ce) {
              _n(n, n.return, Ce);
            }
        }
        break;
      case 6:
        if (tr(r, n), Ti(n), o & 4) {
          if (n.stateNode === null)
            throw Error(A(162));
          c = n.stateNode, d = n.memoizedProps;
          try {
            c.nodeValue = d;
          } catch (Ce) {
            _n(n, n.return, Ce);
          }
        }
        break;
      case 3:
        if (tr(r, n), Ti(n), o & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Sl(r.containerInfo);
          } catch (Ce) {
            _n(n, n.return, Ce);
          }
        break;
      case 4:
        tr(r, n), Ti(n);
        break;
      case 13:
        tr(r, n), Ti(n), c = n.child, c.flags & 8192 && (d = c.memoizedState !== null, c.stateNode.isHidden = d, !d || c.alternate !== null && c.alternate.memoizedState !== null || (Jc = Dt())), o & 4 && Co(n);
        break;
      case 22:
        if (Y = l !== null && l.memoizedState !== null, n.mode & 1 ? (ur = (z = ur) || Y, tr(r, n), ur = z) : tr(r, n), Ti(n), o & 8192) {
          if (z = n.memoizedState !== null, (n.stateNode.isHidden = z) && !Y && n.mode & 1)
            for (he = n, Y = n.child; Y !== null; ) {
              for (Q = he = Y; he !== null; ) {
                switch (I = he, ce = I.child, I.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    go(4, I, I.return);
                    break;
                  case 1:
                    yo(I, I.return);
                    var ye = I.stateNode;
                    if (typeof ye.componentWillUnmount == "function") {
                      o = I, l = I.return;
                      try {
                        r = o, ye.props = r.memoizedProps, ye.state = r.memoizedState, ye.componentWillUnmount();
                      } catch (Ce) {
                        _n(o, l, Ce);
                      }
                    }
                    break;
                  case 5:
                    yo(I, I.return);
                    break;
                  case 22:
                    if (I.memoizedState !== null) {
                      Xv(Q);
                      continue;
                    }
                }
                ce !== null ? (ce.return = I, he = ce) : Xv(Q);
              }
              Y = Y.sibling;
            }
          e:
            for (Y = null, Q = n; ; ) {
              if (Q.tag === 5) {
                if (Y === null) {
                  Y = Q;
                  try {
                    c = Q.stateNode, z ? (d = c.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (E = Q.stateNode, T = Q.memoizedProps.style, m = T != null && T.hasOwnProperty("display") ? T.display : null, E.style.display = it("display", m));
                  } catch (Ce) {
                    _n(n, n.return, Ce);
                  }
                }
              } else if (Q.tag === 6) {
                if (Y === null)
                  try {
                    Q.stateNode.nodeValue = z ? "" : Q.memoizedProps;
                  } catch (Ce) {
                    _n(n, n.return, Ce);
                  }
              } else if ((Q.tag !== 22 && Q.tag !== 23 || Q.memoizedState === null || Q === n) && Q.child !== null) {
                Q.child.return = Q, Q = Q.child;
                continue;
              }
              if (Q === n)
                break e;
              for (; Q.sibling === null; ) {
                if (Q.return === null || Q.return === n)
                  break e;
                Y === Q && (Y = null), Q = Q.return;
              }
              Y === Q && (Y = null), Q.sibling.return = Q.return, Q = Q.sibling;
            }
        }
        break;
      case 19:
        tr(r, n), Ti(n), o & 4 && Co(n);
        break;
      case 21:
        break;
      default:
        tr(
          r,
          n
        ), Ti(n);
    }
  }
  function Ti(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (zd(l)) {
              var o = l;
              break e;
            }
            l = l.return;
          }
          throw Error(A(160));
        }
        switch (o.tag) {
          case 5:
            var c = o.stateNode;
            o.flags & 32 && (va(c, ""), o.flags &= -33);
            var d = qv(n);
            So(n, d, c);
            break;
          case 3:
          case 4:
            var m = o.stateNode.containerInfo, E = qv(n);
            ws(n, E, m);
            break;
          default:
            throw Error(A(161));
        }
      } catch (T) {
        _n(n, n.return, T);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function fy(n, r, l) {
    he = n, Ud(n);
  }
  function Ud(n, r, l) {
    for (var o = (n.mode & 1) !== 0; he !== null; ) {
      var c = he, d = c.child;
      if (c.tag === 22 && o) {
        var m = c.memoizedState !== null || mo;
        if (!m) {
          var E = c.alternate, T = E !== null && E.memoizedState !== null || ur;
          E = mo;
          var z = ur;
          if (mo = m, (ur = T) && !z)
            for (he = c; he !== null; )
              m = he, T = m.child, m.tag === 22 && m.memoizedState !== null ? Ad(c) : T !== null ? (T.return = m, he = T) : Ad(c);
          for (; d !== null; )
            he = d, Ud(d), d = d.sibling;
          he = c, mo = E, ur = z;
        }
        Ro(n);
      } else
        c.subtreeFlags & 8772 && d !== null ? (d.return = c, he = d) : Ro(n);
    }
  }
  function Ro(n) {
    for (; he !== null; ) {
      var r = he;
      if (r.flags & 8772) {
        var l = r.alternate;
        try {
          if (r.flags & 8772)
            switch (r.tag) {
              case 0:
              case 11:
              case 15:
                ur || Kc(5, r);
                break;
              case 1:
                var o = r.stateNode;
                if (r.flags & 4 && !ur)
                  if (l === null)
                    o.componentDidMount();
                  else {
                    var c = r.elementType === r.type ? l.memoizedProps : aa(r.type, l.memoizedProps);
                    o.componentDidUpdate(c, l.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
                  }
                var d = r.updateQueue;
                d !== null && zv(r, d, o);
                break;
              case 3:
                var m = r.updateQueue;
                if (m !== null) {
                  if (l = null, r.child !== null)
                    switch (r.child.tag) {
                      case 5:
                        l = r.child.stateNode;
                        break;
                      case 1:
                        l = r.child.stateNode;
                    }
                  zv(r, m, l);
                }
                break;
              case 5:
                var E = r.stateNode;
                if (l === null && r.flags & 4) {
                  l = E;
                  var T = r.memoizedProps;
                  switch (r.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      T.autoFocus && l.focus();
                      break;
                    case "img":
                      T.src && (l.src = T.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (r.memoizedState === null) {
                  var z = r.alternate;
                  if (z !== null) {
                    var Y = z.memoizedState;
                    if (Y !== null) {
                      var Q = Y.dehydrated;
                      Q !== null && Sl(Q);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(A(163));
            }
          ur || r.flags & 512 && Xc(r);
        } catch (I) {
          _n(r, r.return, I);
        }
      }
      if (r === n) {
        he = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, he = l;
        break;
      }
      he = r.return;
    }
  }
  function Xv(n) {
    for (; he !== null; ) {
      var r = he;
      if (r === n) {
        he = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, he = l;
        break;
      }
      he = r.return;
    }
  }
  function Ad(n) {
    for (; he !== null; ) {
      var r = he;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              Kc(4, r);
            } catch (T) {
              _n(r, l, T);
            }
            break;
          case 1:
            var o = r.stateNode;
            if (typeof o.componentDidMount == "function") {
              var c = r.return;
              try {
                o.componentDidMount();
              } catch (T) {
                _n(r, c, T);
              }
            }
            var d = r.return;
            try {
              Xc(r);
            } catch (T) {
              _n(r, d, T);
            }
            break;
          case 5:
            var m = r.return;
            try {
              Xc(r);
            } catch (T) {
              _n(r, m, T);
            }
        }
      } catch (T) {
        _n(r, r.return, T);
      }
      if (r === n) {
        he = null;
        break;
      }
      var E = r.sibling;
      if (E !== null) {
        E.return = r.return, he = E;
        break;
      }
      he = r.return;
    }
  }
  var dy = Math.ceil, hu = mt.ReactCurrentDispatcher, Zc = mt.ReactCurrentOwner, $a = mt.ReactCurrentBatchConfig, yt = 0, bn = null, sn = null, $n = 0, ua = 0, To = tt(0), In = 0, bs = null, mu = 0, xo = 0, jd = 0, Nl = null, wr = null, Jc = 0, wo = 1 / 0, qi = null, ef = !1, Fd = null, Ia = null, bo = !1, Ya = null, tf = 0, _s = 0, nf = null, ks = -1, yu = 0;
  function nr() {
    return yt & 6 ? Dt() : ks !== -1 ? ks : ks = Dt();
  }
  function Ki(n) {
    return n.mode & 1 ? yt & 2 && $n !== 0 ? $n & -$n : Ec.transition !== null ? (yu === 0 && (yu = ju()), yu) : (n = Ot, n !== 0 || (n = window.event, n = n === void 0 ? 16 : Ko(n.type)), n) : 1;
  }
  function En(n, r, l, o) {
    if (50 < _s)
      throw _s = 0, nf = null, Error(A(185));
    zi(n, l, o), (!(yt & 2) || n !== bn) && (n === bn && (!(yt & 2) && (xo |= l), In === 4 && xi(n, $n)), Yn(n, o), l === 1 && yt === 0 && !(r.mode & 1) && (wo = Dt() + 500, Jn && Jr()));
  }
  function Yn(n, r) {
    var l = n.callbackNode;
    hl(n, r);
    var o = Lr(n, n === bn ? $n : 0);
    if (o === 0)
      l !== null && ln(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = o & -o, n.callbackPriority !== r) {
      if (l != null && ln(l), r === 1)
        n.tag === 0 ? md(_o.bind(null, n)) : hd(_o.bind(null, n)), dd(function() {
          !(yt & 6) && Jr();
        }), l = null;
      else {
        switch (Hu(o)) {
          case 1:
            l = Dr;
            break;
          case 4:
            l = ut;
            break;
          case 16:
            l = Oa;
            break;
          case 536870912:
            l = Uu;
            break;
          default:
            l = Oa;
        }
        l = ih(l, rf.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function rf(n, r) {
    if (ks = -1, yu = 0, yt & 6)
      throw Error(A(327));
    var l = n.callbackNode;
    if (ko() && n.callbackNode !== l)
      return null;
    var o = Lr(n, n === bn ? $n : 0);
    if (o === 0)
      return null;
    if (o & 30 || o & n.expiredLanes || r)
      r = lf(n, o);
    else {
      r = o;
      var c = yt;
      yt |= 2;
      var d = Jv();
      (bn !== n || $n !== r) && (qi = null, wo = Dt() + 500, Su(n, r));
      do
        try {
          vy();
          break;
        } catch (E) {
          Zv(n, E);
        }
      while (1);
      Ca(), hu.current = d, yt = c, sn !== null ? r = 0 : (bn = null, $n = 0, r = In);
    }
    if (r !== 0) {
      if (r === 2 && (c = ml(n), c !== 0 && (o = c, r = gu(n, c))), r === 1)
        throw l = bs, Su(n, 0), xi(n, o), Yn(n, Dt()), l;
      if (r === 6)
        xi(n, o);
      else {
        if (c = n.current.alternate, !(o & 30) && !Vd(c) && (r = lf(n, o), r === 2 && (d = ml(n), d !== 0 && (o = d, r = gu(n, d))), r === 1))
          throw l = bs, Su(n, 0), xi(n, o), Yn(n, Dt()), l;
        switch (n.finishedWork = c, n.finishedLanes = o, r) {
          case 0:
          case 1:
            throw Error(A(345));
          case 2:
            zl(n, wr, qi);
            break;
          case 3:
            if (xi(n, o), (o & 130023424) === o && (r = Jc + 500 - Dt(), 10 < r)) {
              if (Lr(n, 0) !== 0)
                break;
              if (c = n.suspendedLanes, (c & o) !== o) {
                nr(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = nu(zl.bind(null, n, wr, qi), r);
              break;
            }
            zl(n, wr, qi);
            break;
          case 4:
            if (xi(n, o), (o & 4194240) === o)
              break;
            for (r = n.eventTimes, c = -1; 0 < o; ) {
              var m = 31 - Or(o);
              d = 1 << m, m = r[m], m > c && (c = m), o &= ~d;
            }
            if (o = c, o = Dt() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * dy(o / 1960)) - o, 10 < o) {
              n.timeoutHandle = nu(zl.bind(null, n, wr, qi), o);
              break;
            }
            zl(n, wr, qi);
            break;
          case 5:
            zl(n, wr, qi);
            break;
          default:
            throw Error(A(329));
        }
      }
    }
    return Yn(n, Dt()), n.callbackNode === l ? rf.bind(null, n) : null;
  }
  function gu(n, r) {
    var l = Nl;
    return n.current.memoizedState.isDehydrated && (Su(n, r).flags |= 256), n = lf(n, r), n !== 2 && (r = wr, wr = l, r !== null && Hd(r)), n;
  }
  function Hd(n) {
    wr === null ? wr = n : wr.push.apply(wr, n);
  }
  function Vd(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null))
          for (var o = 0; o < l.length; o++) {
            var c = l[o], d = c.getSnapshot;
            c = c.value;
            try {
              if (!Na(d(), c))
                return !1;
            } catch {
              return !1;
            }
          }
      }
      if (l = r.child, r.subtreeFlags & 16384 && l !== null)
        l.return = r, r = l;
      else {
        if (r === n)
          break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n)
            return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function xi(n, r) {
    for (r &= ~jd, r &= ~xo, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - Or(r), o = 1 << l;
      n[l] = -1, r &= ~o;
    }
  }
  function _o(n) {
    if (yt & 6)
      throw Error(A(327));
    ko();
    var r = Lr(n, 0);
    if (!(r & 1))
      return Yn(n, Dt()), null;
    var l = lf(n, r);
    if (n.tag !== 0 && l === 2) {
      var o = ml(n);
      o !== 0 && (r = o, l = gu(n, o));
    }
    if (l === 1)
      throw l = bs, Su(n, 0), xi(n, r), Yn(n, Dt()), l;
    if (l === 6)
      throw Error(A(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, zl(n, wr, qi), Yn(n, Dt()), null;
  }
  function Pd(n, r) {
    var l = yt;
    yt |= 1;
    try {
      return n(r);
    } finally {
      yt = l, yt === 0 && (wo = Dt() + 500, Jn && Jr());
    }
  }
  function wi(n) {
    Ya !== null && Ya.tag === 0 && !(yt & 6) && ko();
    var r = yt;
    yt |= 1;
    var l = $a.transition, o = Ot;
    try {
      if ($a.transition = null, Ot = 1, n)
        return n();
    } finally {
      Ot = o, $a.transition = l, yt = r, !(yt & 6) && Jr();
    }
  }
  function af() {
    ua = To.current, jt(To);
  }
  function Su(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, wv(l)), sn !== null)
      for (l = sn.return; l !== null; ) {
        var o = l;
        switch (gd(o), o.tag) {
          case 1:
            o = o.type.childContextTypes, o != null && Aa();
            break;
          case 3:
            ao(), jt(xn), jt(Ye), wd();
            break;
          case 5:
            xd(o);
            break;
          case 4:
            ao();
            break;
          case 13:
            jt(pn);
            break;
          case 19:
            jt(pn);
            break;
          case 10:
            Cd(o.type._context);
            break;
          case 22:
          case 23:
            af();
        }
        l = l.return;
      }
    if (bn = n, sn = n = Ul(n.current, null), $n = ua = r, In = 0, bs = null, jd = xo = mu = 0, wr = Nl = null, lu !== null) {
      for (r = 0; r < lu.length; r++)
        if (l = lu[r], o = l.interleaved, o !== null) {
          l.interleaved = null;
          var c = o.next, d = l.pending;
          if (d !== null) {
            var m = d.next;
            d.next = c, o.next = m;
          }
          l.pending = o;
        }
      lu = null;
    }
    return n;
  }
  function Zv(n, r) {
    do {
      var l = sn;
      try {
        if (Ca(), _c.current = Tr, Ra) {
          for (var o = we.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          Ra = !1;
        }
        if (Re = 0, vt = Qe = we = null, io = !1, ms = 0, Zc.current = null, l === null || l.return === null) {
          In = 1, bs = r, sn = null;
          break;
        }
        e: {
          var d = n, m = l.return, E = l, T = r;
          if (r = $n, E.flags |= 32768, T !== null && typeof T == "object" && typeof T.then == "function") {
            var z = T, Y = E, Q = Y.tag;
            if (!(Y.mode & 1) && (Q === 0 || Q === 11 || Q === 15)) {
              var I = Y.alternate;
              I ? (Y.updateQueue = I.updateQueue, Y.memoizedState = I.memoizedState, Y.lanes = I.lanes) : (Y.updateQueue = null, Y.memoizedState = null);
            }
            var ce = $v(m);
            if (ce !== null) {
              ce.flags &= -257, Od(ce, m, E, d, r), ce.mode & 1 && Cs(d, z, r), r = ce, T = z;
              var ye = r.updateQueue;
              if (ye === null) {
                var Ce = /* @__PURE__ */ new Set();
                Ce.add(T), r.updateQueue = Ce;
              } else
                ye.add(T);
              break e;
            } else {
              if (!(r & 1)) {
                Cs(d, z, r), Ds();
                break e;
              }
              T = Error(A(426));
            }
          } else if (on && E.mode & 1) {
            var Nn = $v(m);
            if (Nn !== null) {
              !(Nn.flags & 65536) && (Nn.flags |= 256), Od(Nn, m, E, d, r), Ed(Ll(T, E));
              break e;
            }
          }
          d = T = Ll(T, E), In !== 4 && (In = 2), Nl === null ? Nl = [d] : Nl.push(d), d = m;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, r &= -r, d.lanes |= r;
                var k = Pv(d, T, r);
                Nv(d, k);
                break e;
              case 1:
                E = T;
                var w = d.type, L = d.stateNode;
                if (!(d.flags & 128) && (typeof w.getDerivedStateFromError == "function" || L !== null && typeof L.componentDidCatch == "function" && (Ia === null || !Ia.has(L)))) {
                  d.flags |= 65536, r &= -r, d.lanes |= r;
                  var Z = Bv(d, E, r);
                  Nv(d, Z);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        th(l);
      } catch (Te) {
        r = Te, sn === l && l !== null && (sn = l = l.return);
        continue;
      }
      break;
    } while (1);
  }
  function Jv() {
    var n = hu.current;
    return hu.current = Tr, n === null ? Tr : n;
  }
  function Ds() {
    (In === 0 || In === 3 || In === 2) && (In = 4), bn === null || !(mu & 268435455) && !(xo & 268435455) || xi(bn, $n);
  }
  function lf(n, r) {
    var l = yt;
    yt |= 2;
    var o = Jv();
    (bn !== n || $n !== r) && (qi = null, Su(n, r));
    do
      try {
        py();
        break;
      } catch (c) {
        Zv(n, c);
      }
    while (1);
    if (Ca(), yt = l, hu.current = o, sn !== null)
      throw Error(A(261));
    return bn = null, $n = 0, In;
  }
  function py() {
    for (; sn !== null; )
      eh(sn);
  }
  function vy() {
    for (; sn !== null && !Er(); )
      eh(sn);
  }
  function eh(n) {
    var r = ah(n.alternate, n, ua);
    n.memoizedProps = n.pendingProps, r === null ? th(n) : sn = r, Zc.current = null;
  }
  function th(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (l = sy(l, r), l !== null) {
          l.flags &= 32767, sn = l;
          return;
        }
        if (n !== null)
          n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          In = 6, sn = null;
          return;
        }
      } else if (l = oy(l, r, ua), l !== null) {
        sn = l;
        return;
      }
      if (r = r.sibling, r !== null) {
        sn = r;
        return;
      }
      sn = r = n;
    } while (r !== null);
    In === 0 && (In = 5);
  }
  function zl(n, r, l) {
    var o = Ot, c = $a.transition;
    try {
      $a.transition = null, Ot = 1, hy(n, r, l, o);
    } finally {
      $a.transition = c, Ot = o;
    }
    return null;
  }
  function hy(n, r, l, o) {
    do
      ko();
    while (Ya !== null);
    if (yt & 6)
      throw Error(A(327));
    l = n.finishedWork;
    var c = n.finishedLanes;
    if (l === null)
      return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current)
      throw Error(A(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var d = l.lanes | l.childLanes;
    if (Yf(n, d), n === bn && (sn = bn = null, $n = 0), !(l.subtreeFlags & 2064) && !(l.flags & 2064) || bo || (bo = !0, ih(Oa, function() {
      return ko(), null;
    })), d = (l.flags & 15990) !== 0, l.subtreeFlags & 15990 || d) {
      d = $a.transition, $a.transition = null;
      var m = Ot;
      Ot = 1;
      var E = yt;
      yt |= 4, Zc.current = null, cy(n, l), Kv(l, n), sc(tu), Ma = !!cd, tu = cd = null, n.current = l, fy(l), mi(), yt = E, Ot = m, $a.transition = d;
    } else
      n.current = l;
    if (bo && (bo = !1, Ya = n, tf = c), d = n.pendingLanes, d === 0 && (Ia = null), Wo(l.stateNode), Yn(n, Dt()), r !== null)
      for (o = n.onRecoverableError, l = 0; l < r.length; l++)
        c = r[l], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (ef)
      throw ef = !1, n = Fd, Fd = null, n;
    return tf & 1 && n.tag !== 0 && ko(), d = n.pendingLanes, d & 1 ? n === nf ? _s++ : (_s = 0, nf = n) : _s = 0, Jr(), null;
  }
  function ko() {
    if (Ya !== null) {
      var n = Hu(tf), r = $a.transition, l = Ot;
      try {
        if ($a.transition = null, Ot = 16 > n ? 16 : n, Ya === null)
          var o = !1;
        else {
          if (n = Ya, Ya = null, tf = 0, yt & 6)
            throw Error(A(331));
          var c = yt;
          for (yt |= 4, he = n.current; he !== null; ) {
            var d = he, m = d.child;
            if (he.flags & 16) {
              var E = d.deletions;
              if (E !== null) {
                for (var T = 0; T < E.length; T++) {
                  var z = E[T];
                  for (he = z; he !== null; ) {
                    var Y = he;
                    switch (Y.tag) {
                      case 0:
                      case 11:
                      case 15:
                        go(8, Y, d);
                    }
                    var Q = Y.child;
                    if (Q !== null)
                      Q.return = Y, he = Q;
                    else
                      for (; he !== null; ) {
                        Y = he;
                        var I = Y.sibling, ce = Y.return;
                        if (Gv(Y), Y === z) {
                          he = null;
                          break;
                        }
                        if (I !== null) {
                          I.return = ce, he = I;
                          break;
                        }
                        he = ce;
                      }
                  }
                }
                var ye = d.alternate;
                if (ye !== null) {
                  var Ce = ye.child;
                  if (Ce !== null) {
                    ye.child = null;
                    do {
                      var Nn = Ce.sibling;
                      Ce.sibling = null, Ce = Nn;
                    } while (Ce !== null);
                  }
                }
                he = d;
              }
            }
            if (d.subtreeFlags & 2064 && m !== null)
              m.return = d, he = m;
            else
              e:
                for (; he !== null; ) {
                  if (d = he, d.flags & 2048)
                    switch (d.tag) {
                      case 0:
                      case 11:
                      case 15:
                        go(9, d, d.return);
                    }
                  var k = d.sibling;
                  if (k !== null) {
                    k.return = d.return, he = k;
                    break e;
                  }
                  he = d.return;
                }
          }
          var w = n.current;
          for (he = w; he !== null; ) {
            m = he;
            var L = m.child;
            if (m.subtreeFlags & 2064 && L !== null)
              L.return = m, he = L;
            else
              e:
                for (m = w; he !== null; ) {
                  if (E = he, E.flags & 2048)
                    try {
                      switch (E.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Kc(9, E);
                      }
                    } catch (Te) {
                      _n(E, E.return, Te);
                    }
                  if (E === m) {
                    he = null;
                    break e;
                  }
                  var Z = E.sibling;
                  if (Z !== null) {
                    Z.return = E.return, he = Z;
                    break e;
                  }
                  he = E.return;
                }
          }
          if (yt = c, Jr(), Gr && typeof Gr.onPostCommitFiberRoot == "function")
            try {
              Gr.onPostCommitFiberRoot(dl, n);
            } catch {
            }
          o = !0;
        }
        return o;
      } finally {
        Ot = l, $a.transition = r;
      }
    }
    return !1;
  }
  function nh(n, r, l) {
    r = Ll(l, r), r = Pv(n, r, 1), n = Dl(n, r, 1), r = nr(), n !== null && (zi(n, 1, r), Yn(n, r));
  }
  function _n(n, r, l) {
    if (n.tag === 3)
      nh(n, n, l);
    else
      for (; r !== null; ) {
        if (r.tag === 3) {
          nh(r, n, l);
          break;
        } else if (r.tag === 1) {
          var o = r.stateNode;
          if (typeof r.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Ia === null || !Ia.has(o))) {
            n = Ll(l, n), n = Bv(r, n, 1), r = Dl(r, n, 1), n = nr(), r !== null && (zi(r, 1, n), Yn(r, n));
            break;
          }
        }
        r = r.return;
      }
  }
  function my(n, r, l) {
    var o = n.pingCache;
    o !== null && o.delete(r), r = nr(), n.pingedLanes |= n.suspendedLanes & l, bn === n && ($n & l) === l && (In === 4 || In === 3 && ($n & 130023424) === $n && 500 > Dt() - Jc ? Su(n, 0) : jd |= l), Yn(n, r);
  }
  function rh(n, r) {
    r === 0 && (n.mode & 1 ? (r = pl, pl <<= 1, !(pl & 130023424) && (pl = 4194304)) : r = 1);
    var l = nr();
    n = Qi(n, r), n !== null && (zi(n, r, l), Yn(n, l));
  }
  function Bd(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), rh(n, l);
  }
  function yy(n, r) {
    var l = 0;
    switch (n.tag) {
      case 13:
        var o = n.stateNode, c = n.memoizedState;
        c !== null && (l = c.retryLane);
        break;
      case 19:
        o = n.stateNode;
        break;
      default:
        throw Error(A(314));
    }
    o !== null && o.delete(r), rh(n, l);
  }
  var ah;
  ah = function(n, r, l) {
    if (n !== null)
      if (n.memoizedProps !== r.pendingProps || xn.current)
        ia = !0;
      else {
        if (!(n.lanes & l) && !(r.flags & 128))
          return ia = !1, Gi(n, r, l);
        ia = !!(n.flags & 131072);
      }
    else
      ia = !1, on && r.flags & 1048576 && yd(r, Ju, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var o = r.type;
        xs(n, r), n = r.pendingProps;
        var c = Ua(r, Ye.current);
        to(r, l), c = B(null, r, o, n, c, l);
        var d = Hn();
        return r.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, dn(o) ? (d = !0, hc(r)) : d = !1, r.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, Rc(r), c.updater = du, r.stateNode = c, c._reactInternals = r, kd(r, o, n, l), r = Ic(null, r, o, !0, d, l)) : (r.tag = 0, on && d && mc(r), Ln(null, r, c, l), r = r.child), r;
      case 16:
        o = r.elementType;
        e: {
          switch (xs(n, r), n = r.pendingProps, c = o._init, o = c(o._payload), r.type = o, c = r.tag = gy(o), n = aa(o, n), c) {
            case 0:
              r = Je(null, r, o, n, l);
              break e;
            case 1:
              r = Rs(null, r, o, n, l);
              break e;
            case 11:
              r = po(null, r, o, n, l);
              break e;
            case 14:
              r = Ml(null, r, o, aa(o.type, n), l);
              break e;
          }
          throw Error(A(
            306,
            o,
            ""
          ));
        }
        return r;
      case 0:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : aa(o, c), Je(n, r, o, c, l);
      case 1:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : aa(o, c), Rs(n, r, o, c, l);
      case 3:
        e: {
          if (uy(r), n === null)
            throw Error(A(387));
          o = r.pendingProps, d = r.memoizedState, c = d.element, no(n, r), xc(r, o, null, l);
          var m = r.memoizedState;
          if (o = m.element, d.isDehydrated)
            if (d = { element: o, isDehydrated: !1, cache: m.cache, pendingSuspenseBoundaries: m.pendingSuspenseBoundaries, transitions: m.transitions }, r.updateQueue.baseState = d, r.memoizedState = d, r.flags & 256) {
              c = Ll(Error(A(423)), r), r = Yv(n, r, o, l, c);
              break e;
            } else if (o !== c) {
              c = Ll(Error(A(424)), r), r = Yv(n, r, o, l, c);
              break e;
            } else
              for (na = ui(r.stateNode.containerInfo.firstChild), Ea = r, on = !0, Fa = null, l = Lv(r, null, o, l), r.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Sn(), o === c) {
              r = Mn(n, r, l);
              break e;
            }
            Ln(n, r, o, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return Uv(r), n === null && gc(r), o = r.type, c = r.pendingProps, d = n !== null ? n.memoizedProps : null, m = c.children, os(o, c) ? m = null : d !== null && os(o, d) && (r.flags |= 32), pu(n, r), Ln(n, r, m, l), r.child;
      case 6:
        return n === null && gc(r), null;
      case 13:
        return Qv(n, r, l);
      case 4:
        return Td(r, r.stateNode.containerInfo), o = r.pendingProps, n === null ? r.child = eo(r, null, o, l) : Ln(n, r, o, l), r.child;
      case 11:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : aa(o, c), po(n, r, o, c, l);
      case 7:
        return Ln(n, r, r.pendingProps, l), r.child;
      case 8:
        return Ln(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return Ln(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (o = r.type._context, c = r.pendingProps, d = r.memoizedProps, m = c.value, $t(Yi, o._currentValue), o._currentValue = m, d !== null)
            if (Na(d.value, m)) {
              if (d.children === c.children && !xn.current) {
                r = Mn(n, r, l);
                break e;
              }
            } else
              for (d = r.child, d !== null && (d.return = r); d !== null; ) {
                var E = d.dependencies;
                if (E !== null) {
                  m = d.child;
                  for (var T = E.firstContext; T !== null; ) {
                    if (T.context === o) {
                      if (d.tag === 1) {
                        T = ra(-1, l & -l), T.tag = 2;
                        var z = d.updateQueue;
                        if (z !== null) {
                          z = z.shared;
                          var Y = z.pending;
                          Y === null ? T.next = T : (T.next = Y.next, Y.next = T), z.pending = T;
                        }
                      }
                      d.lanes |= l, T = d.alternate, T !== null && (T.lanes |= l), Rd(
                        d.return,
                        l,
                        r
                      ), E.lanes |= l;
                      break;
                    }
                    T = T.next;
                  }
                } else if (d.tag === 10)
                  m = d.type === r.type ? null : d.child;
                else if (d.tag === 18) {
                  if (m = d.return, m === null)
                    throw Error(A(341));
                  m.lanes |= l, E = m.alternate, E !== null && (E.lanes |= l), Rd(m, l, r), m = d.sibling;
                } else
                  m = d.child;
                if (m !== null)
                  m.return = d;
                else
                  for (m = d; m !== null; ) {
                    if (m === r) {
                      m = null;
                      break;
                    }
                    if (d = m.sibling, d !== null) {
                      d.return = m.return, m = d;
                      break;
                    }
                    m = m.return;
                  }
                d = m;
              }
          Ln(n, r, c.children, l), r = r.child;
        }
        return r;
      case 9:
        return c = r.type, o = r.pendingProps.children, to(r, l), c = Va(c), o = o(c), r.flags |= 1, Ln(n, r, o, l), r.child;
      case 14:
        return o = r.type, c = aa(o, r.pendingProps), c = aa(o.type, c), Ml(n, r, o, c, l);
      case 15:
        return $c(n, r, r.type, r.pendingProps, l);
      case 17:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : aa(o, c), xs(n, r), r.tag = 1, dn(o) ? (n = !0, hc(r)) : n = !1, to(r, l), Fv(r, o, c), kd(r, o, c, l), Ic(null, r, o, !0, n, l);
      case 19:
        return Md(n, r, l);
      case 22:
        return la(n, r, l);
    }
    throw Error(A(156, r.tag));
  };
  function ih(n, r) {
    return Kt(n, r);
  }
  function lh(n, r, l, o) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Qa(n, r, l, o) {
    return new lh(n, r, l, o);
  }
  function $d(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function gy(n) {
    if (typeof n == "function")
      return $d(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === Rn)
        return 11;
      if (n === Ft)
        return 14;
    }
    return 2;
  }
  function Ul(n, r) {
    var l = n.alternate;
    return l === null ? (l = Qa(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function uf(n, r, l, o, c, d) {
    var m = 2;
    if (o = n, typeof n == "function")
      $d(n) && (m = 1);
    else if (typeof n == "string")
      m = 5;
    else
      e:
        switch (n) {
          case Pe:
            return Eu(l.children, c, d, r);
          case an:
            m = 8, c |= 8;
            break;
          case kn:
            return n = Qa(12, l, r, c | 2), n.elementType = kn, n.lanes = d, n;
          case ze:
            return n = Qa(13, l, r, c), n.elementType = ze, n.lanes = d, n;
          case et:
            return n = Qa(19, l, r, c), n.elementType = et, n.lanes = d, n;
          case me:
            return of(l, c, d, r);
          default:
            if (typeof n == "object" && n !== null)
              switch (n.$$typeof) {
                case Wt:
                  m = 10;
                  break e;
                case kt:
                  m = 9;
                  break e;
                case Rn:
                  m = 11;
                  break e;
                case Ft:
                  m = 14;
                  break e;
                case bt:
                  m = 16, o = null;
                  break e;
              }
            throw Error(A(130, n == null ? n : typeof n, ""));
        }
    return r = Qa(m, l, r, c), r.elementType = n, r.type = o, r.lanes = d, r;
  }
  function Eu(n, r, l, o) {
    return n = Qa(7, n, o, r), n.lanes = l, n;
  }
  function of(n, r, l, o) {
    return n = Qa(22, n, o, r), n.elementType = me, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function sf(n, r, l) {
    return n = Qa(6, n, null, r), n.lanes = l, n;
  }
  function Os(n, r, l) {
    return r = Qa(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function Ls(n, r, l, o, c) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Fu(0), this.expirationTimes = Fu(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Fu(0), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function Id(n, r, l, o, c, d, m, E, T) {
    return n = new Ls(n, r, l, E, T), r === 1 ? (r = 1, d === !0 && (r |= 8)) : r = 0, d = Qa(3, null, null, r), n.current = d, d.stateNode = n, d.memoizedState = { element: o, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Rc(d), n;
  }
  function uh(n, r, l) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ft, key: o == null ? null : "" + o, children: n, containerInfo: r, implementation: l };
  }
  function Yd(n) {
    if (!n)
      return Ei;
    n = n._reactInternals;
    e: {
      if (xe(n) !== n || n.tag !== 1)
        throw Error(A(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (dn(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(A(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (dn(l))
        return fs(n, l, r);
    }
    return r;
  }
  function Qd(n, r, l, o, c, d, m, E, T) {
    return n = Id(l, o, !0, n, c, d, m, E, T), n.context = Yd(null), l = n.current, o = nr(), c = Ki(l), d = ra(o, c), d.callback = r ?? null, Dl(l, d, c), n.current.lanes = c, zi(n, c, o), Yn(n, o), n;
  }
  function cf(n, r, l, o) {
    var c = r.current, d = nr(), m = Ki(c);
    return l = Yd(l), r.context === null ? r.context = l : r.pendingContext = l, r = ra(d, m), r.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (r.callback = o), n = Dl(c, r, m), n !== null && (En(n, c, m, d), Tc(n, c, m)), m;
  }
  function Ms(n) {
    if (n = n.current, !n.child)
      return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function oh(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function Wd(n, r) {
    oh(n, r), (n = n.alternate) && oh(n, r);
  }
  function Sy() {
    return null;
  }
  var Gd = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function ff(n) {
    this._internalRoot = n;
  }
  Ns.prototype.render = ff.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null)
      throw Error(A(409));
    cf(n, r, null, null);
  }, Ns.prototype.unmount = ff.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      wi(function() {
        cf(null, n, null, null);
      }), r[$i] = null;
    }
  };
  function Ns(n) {
    this._internalRoot = n;
  }
  Ns.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = Pu();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < Bt.length && r !== 0 && r < Bt[l].priority; l++)
        ;
      Bt.splice(l, 0, n), l === 0 && nc(n);
    }
  };
  function Al(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function df(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function sh() {
  }
  function Ey(n, r, l, o, c) {
    if (c) {
      if (typeof o == "function") {
        var d = o;
        o = function() {
          var z = Ms(m);
          d.call(z);
        };
      }
      var m = Qd(r, o, n, 0, null, !1, !1, "", sh);
      return n._reactRootContainer = m, n[$i] = m.current, Xu(n.nodeType === 8 ? n.parentNode : n), wi(), m;
    }
    for (; c = n.lastChild; )
      n.removeChild(c);
    if (typeof o == "function") {
      var E = o;
      o = function() {
        var z = Ms(T);
        E.call(z);
      };
    }
    var T = Id(n, 0, !1, null, null, !1, !1, "", sh);
    return n._reactRootContainer = T, n[$i] = T.current, Xu(n.nodeType === 8 ? n.parentNode : n), wi(function() {
      cf(r, T, l, o);
    }), T;
  }
  function pf(n, r, l, o, c) {
    var d = l._reactRootContainer;
    if (d) {
      var m = d;
      if (typeof c == "function") {
        var E = c;
        c = function() {
          var T = Ms(m);
          E.call(T);
        };
      }
      cf(r, m, n, c);
    } else
      m = Ey(l, r, n, c, o);
    return Ms(m);
  }
  Gl = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = ni(r.pendingLanes);
          l !== 0 && (yi(r, l | 1), Yn(r, Dt()), !(yt & 6) && (wo = Dt() + 500, Jr()));
        }
        break;
      case 13:
        wi(function() {
          var o = Qi(n, 1);
          if (o !== null) {
            var c = nr();
            En(o, n, 1, c);
          }
        }), Wd(n, 1);
    }
  }, Vu = function(n) {
    if (n.tag === 13) {
      var r = Qi(n, 134217728);
      if (r !== null) {
        var l = nr();
        En(r, n, 134217728, l);
      }
      Wd(n, 134217728);
    }
  }, Ct = function(n) {
    if (n.tag === 13) {
      var r = Ki(n), l = Qi(n, r);
      if (l !== null) {
        var o = nr();
        En(l, n, r, o);
      }
      Wd(n, r);
    }
  }, Pu = function() {
    return Ot;
  }, Bu = function(n, r) {
    var l = Ot;
    try {
      return Ot = n, r();
    } finally {
      Ot = l;
    }
  }, _r = function(n, r, l) {
    switch (r) {
      case "input":
        if (Dn(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; )
            l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var o = l[r];
            if (o !== n && o.form === n.form) {
              var c = Le(o);
              if (!c)
                throw Error(A(90));
              $r(o), Dn(o, c);
            }
          }
        }
        break;
      case "textarea":
        pa(n, l);
        break;
      case "select":
        r = l.value, r != null && yr(n, !!l.multiple, r, !1);
    }
  }, Wl = Pd, zu = wi;
  var Cy = { usingClientEntryPoint: !1, Events: [cs, Zu, Le, Da, sl, Pd] }, zs = { findFiberByHostInstance: za, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, ch = { bundleType: zs.bundleType, version: zs.version, rendererPackageName: zs.rendererPackageName, rendererConfig: zs.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: mt.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = lt(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: zs.findFiberByHostInstance || Sy, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var vf = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vf.isDisabled && vf.supportsFiber)
      try {
        dl = vf.inject(ch), Gr = vf;
      } catch {
      }
  }
  return Za.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Cy, Za.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Al(r))
      throw Error(A(200));
    return uh(n, r, null, l);
  }, Za.createRoot = function(n, r) {
    if (!Al(n))
      throw Error(A(299));
    var l = !1, o = "", c = Gd;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (o = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), r = Id(n, 1, !1, null, null, l, !1, o, c), n[$i] = r.current, Xu(n.nodeType === 8 ? n.parentNode : n), new ff(r);
  }, Za.findDOMNode = function(n) {
    if (n == null)
      return null;
    if (n.nodeType === 1)
      return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(A(188)) : (n = Object.keys(n).join(","), Error(A(268, n)));
    return n = lt(r), n = n === null ? null : n.stateNode, n;
  }, Za.flushSync = function(n) {
    return wi(n);
  }, Za.hydrate = function(n, r, l) {
    if (!df(r))
      throw Error(A(200));
    return pf(null, n, r, !0, l);
  }, Za.hydrateRoot = function(n, r, l) {
    if (!Al(n))
      throw Error(A(405));
    var o = l != null && l.hydratedSources || null, c = !1, d = "", m = Gd;
    if (l != null && (l.unstable_strictMode === !0 && (c = !0), l.identifierPrefix !== void 0 && (d = l.identifierPrefix), l.onRecoverableError !== void 0 && (m = l.onRecoverableError)), r = Qd(r, null, n, 1, l ?? null, c, !1, d, m), n[$i] = r.current, Xu(n), o)
      for (n = 0; n < o.length; n++)
        l = o[n], c = l._getVersion, c = c(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, c] : r.mutableSourceEagerHydrationData.push(
          l,
          c
        );
    return new Ns(r);
  }, Za.render = function(n, r, l) {
    if (!df(r))
      throw Error(A(200));
    return pf(null, n, r, !1, l);
  }, Za.unmountComponentAtNode = function(n) {
    if (!df(n))
      throw Error(A(40));
    return n._reactRootContainer ? (wi(function() {
      pf(null, null, n, !1, function() {
        n._reactRootContainer = null, n[$i] = null;
      });
    }), !0) : !1;
  }, Za.unstable_batchedUpdates = Pd, Za.unstable_renderSubtreeIntoContainer = function(n, r, l, o) {
    if (!df(l))
      throw Error(A(200));
    if (n == null || n._reactInternals === void 0)
      throw Error(A(38));
    return pf(n, r, l, !1, o);
  }, Za.version = "18.3.1-next-f1338f8080-20240426", Za;
}
var Ja = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cR;
function dk() {
  return cR || (cR = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var q = Xp(), X = pR(), A = q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, zt = !1;
    function Ut(e) {
      zt = e;
    }
    function Ie(e) {
      if (!zt) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        ct("warn", e, a);
      }
    }
    function S(e) {
      if (!zt) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        ct("error", e, a);
      }
    }
    function ct(e, t, a) {
      {
        var i = A.ReactDebugCurrentFrame, u = i.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var de = 0, oe = 1, Xe = 2, te = 3, ve = 4, le = 5, Ve = 6, Ee = 7, Ze = 8, rn = 9, nt = 10, qe = 11, mt = 12, Oe = 13, ft = 14, Pe = 15, an = 16, kn = 17, Wt = 18, kt = 19, Rn = 21, ze = 22, et = 23, Ft = 24, bt = 25, me = !0, J = !1, _e = !1, ae = !1, _ = !1, V = !0, Ue = !1, Be = !0, at = !0, rt = !0, St = !0, ot = /* @__PURE__ */ new Set(), st = {}, en = {};
    function mr(e, t) {
      $r(e, t), $r(e + "Capture", t);
    }
    function $r(e, t) {
      st[e] && S("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), st[e] = t;
      {
        var a = e.toLowerCase();
        en[a] = e, e === "onDoubleClick" && (en.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        ot.add(t[i]);
    }
    var hn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Gn = Object.prototype.hasOwnProperty;
    function Pn(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function Un(e) {
      try {
        return Dn(e), !1;
      } catch {
        return !0;
      }
    }
    function Dn(e) {
      return "" + e;
    }
    function Ir(e, t) {
      if (Un(e))
        return S("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Pn(e)), Dn(e);
    }
    function Yr(e) {
      if (Un(e))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Pn(e)), Dn(e);
    }
    function qn(e, t) {
      if (Un(e))
        return S("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Pn(e)), Dn(e);
    }
    function yr(e, t) {
      if (Un(e))
        return S("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Pn(e)), Dn(e);
    }
    function Qr(e) {
      if (Un(e))
        return S("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Pn(e)), Dn(e);
    }
    function gr(e) {
      if (Un(e))
        return S("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Pn(e)), Dn(e);
    }
    var pa = 0, ar = 1, Wr = 2, mn = 3, br = 4, di = 5, va = 6, ee = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ke = ee + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", it = new RegExp("^[" + ee + "][" + ke + "]*$"), At = {}, Ht = {};
    function On(e) {
      return Gn.call(Ht, e) ? !0 : Gn.call(At, e) ? !1 : it.test(e) ? (Ht[e] = !0, !0) : (At[e] = !0, S("Invalid attribute name: `%s`", e), !1);
    }
    function yn(e, t, a) {
      return t !== null ? t.type === pa : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function Sr(e, t, a, i) {
      if (a !== null && a.type === pa)
        return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean": {
          if (i)
            return !1;
          if (a !== null)
            return !a.acceptsBooleans;
          var u = e.toLowerCase().slice(0, 5);
          return u !== "data-" && u !== "aria-";
        }
        default:
          return !1;
      }
    }
    function Yt(e, t, a, i) {
      if (t === null || typeof t > "u" || Sr(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case mn:
            return !t;
          case br:
            return t === !1;
          case di:
            return isNaN(t);
          case va:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function _r(e) {
      return Pt.hasOwnProperty(e) ? Pt[e] : null;
    }
    function Vt(e, t, a, i, u, s, f) {
      this.acceptsBooleans = t === Wr || t === mn || t === br, this.attributeName = i, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = f;
    }
    var Pt = {}, ei = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    ei.forEach(function(e) {
      Pt[e] = new Vt(
        e,
        pa,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], a = e[1];
      Pt[t] = new Vt(
        t,
        ar,
        !1,
        // mustUseProperty
        a,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      Pt[e] = new Vt(
        e,
        Wr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      Pt[e] = new Vt(
        e,
        Wr,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      Pt[e] = new Vt(
        e,
        mn,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Pt[e] = new Vt(
        e,
        mn,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Pt[e] = new Vt(
        e,
        br,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Pt[e] = new Vt(
        e,
        va,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      Pt[e] = new Vt(
        e,
        di,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var Da = /[\-\:]([a-z])/g, sl = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Da, sl);
      Pt[t] = new Vt(
        t,
        ar,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Da, sl);
      Pt[t] = new Vt(
        t,
        ar,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Da, sl);
      Pt[t] = new Vt(
        t,
        ar,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      Pt[e] = new Vt(
        e,
        ar,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var Wl = "xlinkHref";
    Pt[Wl] = new Vt(
      "xlinkHref",
      ar,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      Pt[e] = new Vt(
        e,
        ar,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var zu = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Ni = !1;
    function cl(e) {
      !Ni && zu.test(e) && (Ni = !0, S("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function ha(e, t, a, i) {
      if (i.mustUseProperty) {
        var u = i.propertyName;
        return e[u];
      } else {
        Ir(a, t), i.sanitizeURL && cl("" + a);
        var s = i.attributeName, f = null;
        if (i.type === br) {
          if (e.hasAttribute(s)) {
            var p = e.getAttribute(s);
            return p === "" ? !0 : Yt(t, a, i, !1) ? p : p === "" + a ? a : p;
          }
        } else if (e.hasAttribute(s)) {
          if (Yt(t, a, i, !1))
            return e.getAttribute(s);
          if (i.type === mn)
            return a;
          f = e.getAttribute(s);
        }
        return Yt(t, a, i, !1) ? f === null ? a : f : f === "" + a ? a : f;
      }
    }
    function pi(e, t, a, i) {
      {
        if (!On(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return Ir(a, t), u === "" + a ? a : u;
      }
    }
    function ma(e, t, a, i) {
      var u = _r(t);
      if (!yn(t, u, i)) {
        if (Yt(t, a, u, i) && (a = null), i || u === null) {
          if (On(t)) {
            var s = t;
            a === null ? e.removeAttribute(s) : (Ir(a, t), e.setAttribute(s, "" + a));
          }
          return;
        }
        var f = u.mustUseProperty;
        if (f) {
          var p = u.propertyName;
          if (a === null) {
            var v = u.type;
            e[p] = v === mn ? !1 : "";
          } else
            e[p] = a;
          return;
        }
        var y = u.attributeName, g = u.attributeNamespace;
        if (a === null)
          e.removeAttribute(y);
        else {
          var b = u.type, x;
          b === mn || b === br && a === !0 ? x = "" : (Ir(a, y), x = "" + a, u.sanitizeURL && cl(x.toString())), g ? e.setAttributeNS(g, y, x) : e.setAttribute(y, x);
        }
      }
    }
    var ti = Symbol.for("react.element"), kr = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), vi = Symbol.for("react.strict_mode"), hi = Symbol.for("react.profiler"), R = Symbol.for("react.provider"), $ = Symbol.for("react.context"), W = Symbol.for("react.forward_ref"), xe = Symbol.for("react.suspense"), dt = Symbol.for("react.suspense_list"), Et = Symbol.for("react.memo"), Ae = Symbol.for("react.lazy"), lt = Symbol.for("react.scope"), An = Symbol.for("react.debug_trace_mode"), Kt = Symbol.for("react.offscreen"), ln = Symbol.for("react.legacy_hidden"), Er = Symbol.for("react.cache"), mi = Symbol.for("react.tracing_marker"), Dt = Symbol.iterator, Kn = "@@iterator";
    function Dr(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Dt && e[Dt] || e[Kn];
      return typeof t == "function" ? t : null;
    }
    var ut = Object.assign, Oa = 0, fl, Uu, dl, Gr, Wo, Or, Go;
    function qo() {
    }
    qo.__reactDisabledLog = !0;
    function ec() {
      {
        if (Oa === 0) {
          fl = console.log, Uu = console.info, dl = console.warn, Gr = console.error, Wo = console.group, Or = console.groupCollapsed, Go = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: qo,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        Oa++;
      }
    }
    function Au() {
      {
        if (Oa--, Oa === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ut({}, e, {
              value: fl
            }),
            info: ut({}, e, {
              value: Uu
            }),
            warn: ut({}, e, {
              value: dl
            }),
            error: ut({}, e, {
              value: Gr
            }),
            group: ut({}, e, {
              value: Wo
            }),
            groupCollapsed: ut({}, e, {
              value: Or
            }),
            groupEnd: ut({}, e, {
              value: Go
            })
          });
        }
        Oa < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var pl = A.ReactCurrentDispatcher, ni;
    function Lr(e, t, a) {
      {
        if (ni === void 0)
          try {
            throw Error();
          } catch (u) {
            var i = u.stack.trim().match(/\n( *(at )?)/);
            ni = i && i[1] || "";
          }
        return `
` + ni + e;
      }
    }
    var vl = !1, hl;
    {
      var ml = typeof WeakMap == "function" ? WeakMap : Map;
      hl = new ml();
    }
    function ju(e, t) {
      if (!e || vl)
        return "";
      {
        var a = hl.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      vl = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = pl.current, pl.current = null, ec();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (U) {
              i = U;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (U) {
              i = U;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (U) {
            i = U;
          }
          e();
        }
      } catch (U) {
        if (U && i && typeof U.stack == "string") {
          for (var p = U.stack.split(`
`), v = i.stack.split(`
`), y = p.length - 1, g = v.length - 1; y >= 1 && g >= 0 && p[y] !== v[g]; )
            g--;
          for (; y >= 1 && g >= 0; y--, g--)
            if (p[y] !== v[g]) {
              if (y !== 1 || g !== 1)
                do
                  if (y--, g--, g < 0 || p[y] !== v[g]) {
                    var b = `
` + p[y].replace(" at new ", " at ");
                    return e.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", e.displayName)), typeof e == "function" && hl.set(e, b), b;
                  }
                while (y >= 1 && g >= 0);
              break;
            }
        }
      } finally {
        vl = !1, pl.current = s, Au(), Error.prepareStackTrace = u;
      }
      var x = e ? e.displayName || e.name : "", M = x ? Lr(x) : "";
      return typeof e == "function" && hl.set(e, M), M;
    }
    function Fu(e, t, a) {
      return ju(e, !0);
    }
    function zi(e, t, a) {
      return ju(e, !1);
    }
    function Yf(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function yi(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ju(e, Yf(e));
      if (typeof e == "string")
        return Lr(e);
      switch (e) {
        case xe:
          return Lr("Suspense");
        case dt:
          return Lr("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case W:
            return zi(e.render);
          case Et:
            return yi(e.type, t, a);
          case Ae: {
            var i = e, u = i._payload, s = i._init;
            try {
              return yi(s(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function Ot(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case le:
          return Lr(e.type);
        case an:
          return Lr("Lazy");
        case Oe:
          return Lr("Suspense");
        case kt:
          return Lr("SuspenseList");
        case de:
        case Xe:
        case Pe:
          return zi(e.type);
        case qe:
          return zi(e.type.render);
        case oe:
          return Fu(e.type);
        default:
          return "";
      }
    }
    function Hu(e) {
      try {
        var t = "", a = e;
        do
          t += Ot(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function Gl(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function Vu(e) {
      return e.displayName || "Context";
    }
    function Ct(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case ya:
          return "Fragment";
        case kr:
          return "Portal";
        case hi:
          return "Profiler";
        case vi:
          return "StrictMode";
        case xe:
          return "Suspense";
        case dt:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case $:
            var t = e;
            return Vu(t) + ".Consumer";
          case R:
            var a = e;
            return Vu(a._context) + ".Provider";
          case W:
            return Gl(e, e.render, "ForwardRef");
          case Et:
            var i = e.displayName || null;
            return i !== null ? i : Ct(e.type) || "Memo";
          case Ae: {
            var u = e, s = u._payload, f = u._init;
            try {
              return Ct(f(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Pu(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function Bu(e) {
      return e.displayName || "Context";
    }
    function We(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case Ft:
          return "Cache";
        case rn:
          var i = a;
          return Bu(i) + ".Consumer";
        case nt:
          var u = a;
          return Bu(u._context) + ".Provider";
        case Wt:
          return "DehydratedFragment";
        case qe:
          return Pu(a, a.render, "ForwardRef");
        case Ee:
          return "Fragment";
        case le:
          return a;
        case ve:
          return "Portal";
        case te:
          return "Root";
        case Ve:
          return "Text";
        case an:
          return Ct(a);
        case Ze:
          return a === vi ? "StrictMode" : "Mode";
        case ze:
          return "Offscreen";
        case mt:
          return "Profiler";
        case Rn:
          return "Scope";
        case Oe:
          return "Suspense";
        case kt:
          return "SuspenseList";
        case bt:
          return "TracingMarker";
        case oe:
        case de:
        case kn:
        case Xe:
        case ft:
        case Pe:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var ql = A.ReactDebugCurrentFrame, gn = null, qr = !1;
    function Mr() {
      {
        if (gn === null)
          return null;
        var e = gn._debugOwner;
        if (e !== null && typeof e < "u")
          return We(e);
      }
      return null;
    }
    function yl() {
      return gn === null ? "" : Hu(gn);
    }
    function Tn() {
      ql.getCurrentStack = null, gn = null, qr = !1;
    }
    function Bt(e) {
      ql.getCurrentStack = e === null ? null : yl, gn = e, qr = !1;
    }
    function tc() {
      return gn;
    }
    function Kr(e) {
      qr = e;
    }
    function Xn(e) {
      return "" + e;
    }
    function gi(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return gr(e), e;
        default:
          return "";
      }
    }
    var nc = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Ui(e, t) {
      nc[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || S("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || S("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function gl(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function rc(e) {
      return e._valueTracker;
    }
    function La(e) {
      e._valueTracker = null;
    }
    function Sl(e) {
      var t = "";
      return e && (gl(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function Ai(e) {
      var t = gl(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      gr(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var u = a.get, s = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return u.call(this);
          },
          set: function(p) {
            gr(p), i = "" + p, s.call(this, p);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var f = {
          getValue: function() {
            return i;
          },
          setValue: function(p) {
            gr(p), i = "" + p;
          },
          stopTracking: function() {
            La(e), delete e[t];
          }
        };
        return f;
      }
    }
    function Ma(e) {
      rc(e) || (e._valueTracker = Ai(e));
    }
    function $u(e) {
      if (!e)
        return !1;
      var t = rc(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = Sl(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function El(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Cl = !1, Kl = !1, Iu = !1, Ko = !1;
    function ri(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function h(e, t) {
      var a = e, i = t.checked, u = ut({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return u;
    }
    function C(e, t) {
      Ui("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !Kl && (S("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mr() || "A component", t.type), Kl = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Cl && (S("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mr() || "A component", t.type), Cl = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: gi(t.value != null ? t.value : i),
        controlled: ri(t)
      };
    }
    function N(e, t) {
      var a = e, i = t.checked;
      i != null && ma(a, "checked", i, !1);
    }
    function j(e, t) {
      var a = e;
      {
        var i = ri(t);
        !a._wrapperState.controlled && i && !Ko && (S("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Ko = !0), a._wrapperState.controlled && !i && !Iu && (S("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Iu = !0);
      }
      N(e, t);
      var u = gi(t.value), s = t.type;
      if (u != null)
        s === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = Xn(u)) : a.value !== Xn(u) && (a.value = Xn(u));
      else if (s === "submit" || s === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Ne(a, t.type, u) : t.hasOwnProperty("defaultValue") && Ne(a, t.type, gi(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function K(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var u = t.type, s = u === "submit" || u === "reset";
        if (s && (t.value === void 0 || t.value === null))
          return;
        var f = Xn(i._wrapperState.initialValue);
        a || f !== i.value && (i.value = f), i.defaultValue = f;
      }
      var p = i.name;
      p !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, p !== "" && (i.name = p);
    }
    function je(e, t) {
      var a = e;
      j(a, t), ie(a, t);
    }
    function ie(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        Ir(a, "name");
        for (var u = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < u.length; s++) {
          var f = u[s];
          if (!(f === e || f.form !== e.form)) {
            var p = _h(f);
            if (!p)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            $u(f), j(f, p);
          }
        }
      }
    }
    function Ne(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || El(e.ownerDocument) !== e) && (a == null ? e.defaultValue = Xn(e._wrapperState.initialValue) : e.defaultValue !== Xn(a) && (e.defaultValue = Xn(a)));
    }
    var pt = !1, _t = !1, Xt = !1;
    function Qt(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? q.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || _t || (_t = !0, S("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (Xt || (Xt = !0, S("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !pt && (S("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), pt = !0);
    }
    function Zt(e, t) {
      t.value != null && e.setAttribute("value", Xn(gi(t.value)));
    }
    var tn = Array.isArray;
    function Rt(e) {
      return tn(e);
    }
    var ji;
    ji = !1;
    function Yu() {
      var e = Mr();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var Xo = ["value", "defaultValue"];
    function Qf(e) {
      {
        Ui("select", e);
        for (var t = 0; t < Xo.length; t++) {
          var a = Xo[t];
          if (e[a] != null) {
            var i = Rt(e[a]);
            e.multiple && !i ? S("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, Yu()) : !e.multiple && i && S("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, Yu());
          }
        }
      }
    }
    function ai(e, t, a, i) {
      var u = e.options;
      if (t) {
        for (var s = a, f = {}, p = 0; p < s.length; p++)
          f["$" + s[p]] = !0;
        for (var v = 0; v < u.length; v++) {
          var y = f.hasOwnProperty("$" + u[v].value);
          u[v].selected !== y && (u[v].selected = y), y && i && (u[v].defaultSelected = !0);
        }
      } else {
        for (var g = Xn(gi(a)), b = null, x = 0; x < u.length; x++) {
          if (u[x].value === g) {
            u[x].selected = !0, i && (u[x].defaultSelected = !0);
            return;
          }
          b === null && !u[x].disabled && (b = u[x]);
        }
        b !== null && (b.selected = !0);
      }
    }
    function Zo(e, t) {
      return ut({}, t, {
        value: void 0
      });
    }
    function Jo(e, t) {
      var a = e;
      Qf(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !ji && (S("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), ji = !0);
    }
    function Wf(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? ai(a, !!t.multiple, i, !1) : t.defaultValue != null && ai(a, !!t.multiple, t.defaultValue, !0);
    }
    function Im(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? ai(a, !!t.multiple, u, !1) : i !== !!t.multiple && (t.defaultValue != null ? ai(a, !!t.multiple, t.defaultValue, !0) : ai(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function Ym(e, t) {
      var a = e, i = t.value;
      i != null && ai(a, !!t.multiple, i, !1);
    }
    var Gf = !1;
    function qf(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = ut({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: Xn(a._wrapperState.initialValue)
      });
      return i;
    }
    function Zp(e, t) {
      var a = e;
      Ui("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Gf && (S("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mr() || "A component"), Gf = !0);
      var i = t.value;
      if (i == null) {
        var u = t.children, s = t.defaultValue;
        if (u != null) {
          S("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (s != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (Rt(u)) {
              if (u.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              u = u[0];
            }
            s = u;
          }
        }
        s == null && (s = ""), i = s;
      }
      a._wrapperState = {
        initialValue: gi(i)
      };
    }
    function Jp(e, t) {
      var a = e, i = gi(t.value), u = gi(t.defaultValue);
      if (i != null) {
        var s = Xn(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      u != null && (a.defaultValue = Xn(u));
    }
    function ev(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function Kf(e, t) {
      Jp(e, t);
    }
    var Fi = "http://www.w3.org/1999/xhtml", Qm = "http://www.w3.org/1998/Math/MathML", Xf = "http://www.w3.org/2000/svg";
    function ac(e) {
      switch (e) {
        case "svg":
          return Xf;
        case "math":
          return Qm;
        default:
          return Fi;
      }
    }
    function Zf(e, t) {
      return e == null || e === Fi ? ac(t) : e === Xf && t === "foreignObject" ? Fi : e;
    }
    var Wm = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, u);
        });
      } : e;
    }, ic, tv = Wm(function(e, t) {
      if (e.namespaceURI === Xf && !("innerHTML" in e)) {
        ic = ic || document.createElement("div"), ic.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = ic.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Xr = 1, Hi = 3, jn = 8, ii = 9, Xl = 11, lc = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === Hi) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, nv = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, Qu = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function rv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var av = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Qu).forEach(function(e) {
      av.forEach(function(t) {
        Qu[rv(t, e)] = Qu[e];
      });
    });
    function uc(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(Qu.hasOwnProperty(e) && Qu[e]) ? t + "px" : (yr(t, e), ("" + t).trim());
    }
    var Wu = /([A-Z])/g, Gm = /^ms-/;
    function qm(e) {
      return e.replace(Wu, "-$1").toLowerCase().replace(Gm, "-ms-");
    }
    var iv = function() {
    };
    {
      var lv = /^(?:webkit|moz|o)[A-Z]/, uv = /^-ms-/, es = /-(.)/g, Gu = /;\s*$/, qu = {}, Ku = {}, ov = !1, Jf = !1, ed = function(e) {
        return e.replace(es, function(t, a) {
          return a.toUpperCase();
        });
      }, td = function(e) {
        qu.hasOwnProperty(e) && qu[e] || (qu[e] = !0, S(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          ed(e.replace(uv, "ms-"))
        ));
      }, sv = function(e) {
        qu.hasOwnProperty(e) && qu[e] || (qu[e] = !0, S("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, cv = function(e, t) {
        Ku.hasOwnProperty(t) && Ku[t] || (Ku[t] = !0, S(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Gu, "")));
      }, fv = function(e, t) {
        ov || (ov = !0, S("`NaN` is an invalid value for the `%s` css style property.", e));
      }, Km = function(e, t) {
        Jf || (Jf = !0, S("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      iv = function(e, t) {
        e.indexOf("-") > -1 ? td(e) : lv.test(e) ? sv(e) : Gu.test(t) && cv(e, t), typeof t == "number" && (isNaN(t) ? fv(e, t) : isFinite(t) || Km(e, t));
      };
    }
    var Xm = iv;
    function Zm(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var u = e[i];
            if (u != null) {
              var s = i.indexOf("--") === 0;
              t += a + (s ? i : qm(i)) + ":", t += uc(i, u, s), a = ";";
            }
          }
        return t || null;
      }
    }
    function dv(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var u = i.indexOf("--") === 0;
          u || Xm(i, t[i]);
          var s = uc(i, t[i], u);
          i === "float" && (i = "cssFloat"), u ? a.setProperty(i, s) : a[i] = s;
        }
    }
    function Jm(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function Na(e) {
      var t = {};
      for (var a in e)
        for (var i = nv[a] || [a], u = 0; u < i.length; u++)
          t[i[u]] = a;
      return t;
    }
    function ts(e, t) {
      {
        if (!t)
          return;
        var a = Na(e), i = Na(t), u = {};
        for (var s in a) {
          var f = a[s], p = i[s];
          if (p && f !== p) {
            var v = f + "," + p;
            if (u[v])
              continue;
            u[v] = !0, S("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", Jm(e[f]) ? "Removing" : "Updating", f, p);
          }
        }
      }
    }
    var pv = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, vv = ut({
      menuitem: !0
    }, pv), hv = "__html";
    function oc(e, t) {
      if (t) {
        if (vv[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(hv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && S("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Vi(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var sc = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, mv = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, li = {}, nd = new RegExp("^(aria)-[" + ke + "]*$"), ns = new RegExp("^(aria)[A-Z][" + ke + "]*$");
    function rd(e, t) {
      {
        if (Gn.call(li, t) && li[t])
          return !0;
        if (ns.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = mv.hasOwnProperty(a) ? a : null;
          if (i == null)
            return S("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), li[t] = !0, !0;
          if (t !== i)
            return S("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), li[t] = !0, !0;
        }
        if (nd.test(t)) {
          var u = t.toLowerCase(), s = mv.hasOwnProperty(u) ? u : null;
          if (s == null)
            return li[t] = !0, !1;
          if (t !== s)
            return S("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), li[t] = !0, !0;
        }
      }
      return !0;
    }
    function yv(e, t) {
      {
        var a = [];
        for (var i in t) {
          var u = rd(e, i);
          u || a.push(i);
        }
        var s = a.map(function(f) {
          return "`" + f + "`";
        }).join(", ");
        a.length === 1 ? S("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e) : a.length > 1 && S("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e);
      }
    }
    function cc(e, t) {
      Vi(e, t) || yv(e, t);
    }
    var Zl = !1;
    function ad(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !Zl && (Zl = !0, e === "select" && t.multiple ? S("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : S("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var id = function() {
    };
    {
      var Zn = {}, ld = /^on./, gv = /^on[^A-Z]/, Sv = new RegExp("^(aria)-[" + ke + "]*$"), Ev = new RegExp("^(aria)[A-Z][" + ke + "]*$");
      id = function(e, t, a, i) {
        if (Gn.call(Zn, t) && Zn[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return S("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Zn[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var p = f.hasOwnProperty(u) ? f[u] : null;
          if (p != null)
            return S("Invalid event handler property `%s`. Did you mean `%s`?", t, p), Zn[t] = !0, !0;
          if (ld.test(t))
            return S("Unknown event handler property `%s`. It will be ignored.", t), Zn[t] = !0, !0;
        } else if (ld.test(t))
          return gv.test(t) && S("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Zn[t] = !0, !0;
        if (Sv.test(t) || Ev.test(t))
          return !0;
        if (u === "innerhtml")
          return S("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Zn[t] = !0, !0;
        if (u === "aria")
          return S("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Zn[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return S("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), Zn[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return S("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Zn[t] = !0, !0;
        var v = _r(t), y = v !== null && v.type === pa;
        if (sc.hasOwnProperty(u)) {
          var g = sc[u];
          if (g !== t)
            return S("Invalid DOM property `%s`. Did you mean `%s`?", t, g), Zn[t] = !0, !0;
        } else if (!y && t !== u)
          return S("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), Zn[t] = !0, !0;
        return typeof a == "boolean" && Sr(t, a, v, !1) ? (a ? S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), Zn[t] = !0, !0) : y ? !0 : Sr(t, a, v, !1) ? (Zn[t] = !0, !1) : ((a === "false" || a === "true") && v !== null && v.type === mn && (S("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), Zn[t] = !0), !0);
      };
    }
    var Cv = function(e, t, a) {
      {
        var i = [];
        for (var u in t) {
          var s = id(e, u, t[u], a);
          s || i.push(u);
        }
        var f = i.map(function(p) {
          return "`" + p + "`";
        }).join(", ");
        i.length === 1 ? S("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && S("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
      }
    };
    function Rv(e, t, a) {
      Vi(e, t) || Cv(e, t, a);
    }
    var Pi = 1, rs = 2, Jl = 4, ey = Pi | rs | Jl, as = null;
    function is(e) {
      as !== null && S("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), as = e;
    }
    function ty() {
      as === null && S("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), as = null;
    }
    function Tv(e) {
      return e === as;
    }
    function fc(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === Hi ? t.parentNode : t;
    }
    var Jt = null, Rl = null, Bi = null;
    function Xu(e) {
      var t = Lo(e);
      if (t) {
        if (typeof Jt != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = _h(a);
          Jt(t.stateNode, t.type, i);
        }
      }
    }
    function xv(e) {
      Jt = e;
    }
    function dc(e) {
      Rl ? Bi ? Bi.push(e) : Bi = [e] : Rl = e;
    }
    function ls() {
      return Rl !== null || Bi !== null;
    }
    function us() {
      if (Rl) {
        var e = Rl, t = Bi;
        if (Rl = null, Bi = null, Xu(e), t)
          for (var a = 0; a < t.length; a++)
            Xu(t[a]);
      }
    }
    var eu = function(e, t) {
      return e(t);
    }, ud = function() {
    }, od = !1;
    function ny() {
      var e = ls();
      e && (ud(), us());
    }
    function sd(e, t, a) {
      if (od)
        return e(t, a);
      od = !0;
      try {
        return eu(e, t, a);
      } finally {
        od = !1, ny();
      }
    }
    function pc(e, t, a) {
      eu = e, ud = a;
    }
    function vc(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function cd(e, t, a) {
      switch (e) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          return !!(a.disabled && vc(t));
        default:
          return !1;
      }
    }
    function tu(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = _h(a);
      if (i === null)
        return null;
      var u = i[t];
      if (cd(t, e.type, i))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var os = !1;
    if (hn)
      try {
        var nu = {};
        Object.defineProperty(nu, "passive", {
          get: function() {
            os = !0;
          }
        }), window.addEventListener("test", nu, nu), window.removeEventListener("test", nu, nu);
      } catch {
        os = !1;
      }
    function wv(e, t, a, i, u, s, f, p, v) {
      var y = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, y);
      } catch (g) {
        this.onError(g);
      }
    }
    var fd = wv;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var dd = document.createElement("react");
      fd = function(t, a, i, u, s, f, p, v, y) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var g = document.createEvent("Event"), b = !1, x = !0, M = window.event, U = Object.getOwnPropertyDescriptor(window, "event");
        function F() {
          dd.removeEventListener(H, Me, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = M);
        }
        var ue = Array.prototype.slice.call(arguments, 3);
        function Me() {
          b = !0, F(), a.apply(i, ue), x = !1;
        }
        var be, wt = !1, gt = !1;
        function D(O) {
          if (be = O.error, wt = !0, be === null && O.colno === 0 && O.lineno === 0 && (gt = !0), O.defaultPrevented && be != null && typeof be == "object")
            try {
              be._suppressLogging = !0;
            } catch {
            }
        }
        var H = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", D), dd.addEventListener(H, Me, !1), g.initEvent(H, !1, !1), dd.dispatchEvent(g), U && Object.defineProperty(window, "event", U), b && x && (wt ? gt && (be = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : be = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(be)), window.removeEventListener("error", D), !b)
          return F(), wv.apply(this, arguments);
      };
    }
    var ry = fd, Tl = !1, ui = null, ss = !1, xl = null, Si = {
      onError: function(e) {
        Tl = !0, ui = e;
      }
    };
    function ru(e, t, a, i, u, s, f, p, v) {
      Tl = !1, ui = null, ry.apply(Si, arguments);
    }
    function $i(e, t, a, i, u, s, f, p, v) {
      if (ru.apply(this, arguments), Tl) {
        var y = vd();
        ss || (ss = !0, xl = y);
      }
    }
    function pd() {
      if (ss) {
        var e = xl;
        throw ss = !1, xl = null, e;
      }
    }
    function ay() {
      return Tl;
    }
    function vd() {
      if (Tl) {
        var e = ui;
        return Tl = !1, ui = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function za(e) {
      return e._reactInternals;
    }
    function cs(e) {
      return e._reactInternals !== void 0;
    }
    function Zu(e, t) {
      e._reactInternals = t;
    }
    var Le = (
      /*                      */
      0
    ), wl = (
      /*                */
      1
    ), un = (
      /*                    */
      2
    ), tt = (
      /*                       */
      4
    ), jt = (
      /*                */
      16
    ), $t = (
      /*                 */
      32
    ), Ei = (
      /*                     */
      64
    ), Ye = (
      /*                   */
      128
    ), xn = (
      /*            */
      256
    ), Zr = (
      /*                          */
      512
    ), Ua = (
      /*                     */
      1024
    ), dn = (
      /*                      */
      2048
    ), Aa = (
      /*                    */
      4096
    ), bl = (
      /*                   */
      8192
    ), fs = (
      /*             */
      16384
    ), hc = dn | tt | Ei | Zr | Ua | fs, bv = (
      /*               */
      32767
    ), ga = (
      /*                   */
      32768
    ), Jn = (
      /*                */
      65536
    ), ds = (
      /* */
      131072
    ), hd = (
      /*                       */
      1048576
    ), md = (
      /*                    */
      2097152
    ), Jr = (
      /*                 */
      4194304
    ), _l = (
      /*                */
      8388608
    ), ea = (
      /*               */
      16777216
    ), au = (
      /*              */
      33554432
    ), Ju = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      tt | Ua | 0
    ), ta = un | tt | jt | $t | Zr | Aa | bl, Cr = tt | Ei | Zr | bl, ja = dn | jt, ir = Jr | _l | md, Ii = A.ReactCurrentOwner;
    function Sa(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (un | Aa)) !== Le && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === te ? a : null;
    }
    function yd(e) {
      if (e.tag === Oe) {
        var t = e.memoizedState;
        if (t === null) {
          var a = e.alternate;
          a !== null && (t = a.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function mc(e) {
      return e.tag === te ? e.stateNode.containerInfo : null;
    }
    function gd(e) {
      return Sa(e) === e;
    }
    function Ea(e) {
      {
        var t = Ii.current;
        if (t !== null && t.tag === oe) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || S("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", We(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var u = za(e);
      return u ? Sa(u) === u : !1;
    }
    function na(e) {
      if (Sa(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function on(e) {
      var t = e.alternate;
      if (!t) {
        var a = Sa(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var i = e, u = t; ; ) {
        var s = i.return;
        if (s === null)
          break;
        var f = s.alternate;
        if (f === null) {
          var p = s.return;
          if (p !== null) {
            i = u = p;
            continue;
          }
          break;
        }
        if (s.child === f.child) {
          for (var v = s.child; v; ) {
            if (v === i)
              return na(s), e;
            if (v === u)
              return na(s), t;
            v = v.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== u.return)
          i = s, u = f;
        else {
          for (var y = !1, g = s.child; g; ) {
            if (g === i) {
              y = !0, i = s, u = f;
              break;
            }
            if (g === u) {
              y = !0, u = s, i = f;
              break;
            }
            g = g.sibling;
          }
          if (!y) {
            for (g = f.child; g; ) {
              if (g === i) {
                y = !0, i = f, u = s;
                break;
              }
              if (g === u) {
                y = !0, u = f, i = s;
                break;
              }
              g = g.sibling;
            }
            if (!y)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== u)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== te)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function Fa(e) {
      var t = on(e);
      return t !== null ? Sd(t) : null;
    }
    function Sd(e) {
      if (e.tag === le || e.tag === Ve)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = Sd(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function _v(e) {
      var t = on(e);
      return t !== null ? yc(t) : null;
    }
    function yc(e) {
      if (e.tag === le || e.tag === Ve)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== ve) {
          var a = yc(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var gc = X.unstable_scheduleCallback, kv = X.unstable_cancelCallback, Sc = X.unstable_shouldYield, Dv = X.unstable_requestPaint, Sn = X.unstable_now, Ed = X.unstable_getCurrentPriorityLevel, Ec = X.unstable_ImmediatePriority, iu = X.unstable_UserBlockingPriority, Ci = X.unstable_NormalPriority, Ov = X.unstable_LowPriority, Cc = X.unstable_IdlePriority, eo = X.unstable_yieldValue, Lv = X.unstable_setDisableYieldValue, Yi = null, Bn = null, ne = null, Ha = !1, Ca = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function Cd(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return S("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        at && (e = ut({}, e, {
          getLaneLabelMap: Qi,
          injectProfilingHooks: Mv
        })), Yi = t.inject(e), Bn = t;
      } catch (a) {
        S("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function Rd(e, t) {
      if (Bn && typeof Bn.onScheduleFiberRoot == "function")
        try {
          Bn.onScheduleFiberRoot(Yi, e, t);
        } catch (a) {
          Ha || (Ha = !0, S("React instrumentation encountered an error: %s", a));
        }
    }
    function to(e, t) {
      if (Bn && typeof Bn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & Ye) === Ye;
          if (rt) {
            var i;
            switch (t) {
              case Mn:
                i = Ec;
                break;
              case Gi:
                i = iu;
                break;
              case Ri:
                i = Ci;
                break;
              case vo:
                i = Cc;
                break;
              default:
                i = Ci;
                break;
            }
            Bn.onCommitFiberRoot(Yi, e, i, a);
          }
        } catch (u) {
          Ha || (Ha = !0, S("React instrumentation encountered an error: %s", u));
        }
    }
    function Va(e) {
      if (Bn && typeof Bn.onPostCommitFiberRoot == "function")
        try {
          Bn.onPostCommitFiberRoot(Yi, e);
        } catch (t) {
          Ha || (Ha = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function lu(e) {
      if (Bn && typeof Bn.onCommitFiberUnmount == "function")
        try {
          Bn.onCommitFiberUnmount(Yi, e);
        } catch (t) {
          Ha || (Ha = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Fn(e) {
      if (typeof eo == "function" && (Lv(e), Ut(e)), Bn && typeof Bn.setStrictMode == "function")
        try {
          Bn.setStrictMode(Yi, e);
        } catch (t) {
          Ha || (Ha = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Mv(e) {
      ne = e;
    }
    function Qi() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < ys; a++) {
          var i = ly(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function kl(e) {
      ne !== null && typeof ne.markCommitStarted == "function" && ne.markCommitStarted(e);
    }
    function Rc() {
      ne !== null && typeof ne.markCommitStopped == "function" && ne.markCommitStopped();
    }
    function no(e) {
      ne !== null && typeof ne.markComponentRenderStarted == "function" && ne.markComponentRenderStarted(e);
    }
    function ra() {
      ne !== null && typeof ne.markComponentRenderStopped == "function" && ne.markComponentRenderStopped();
    }
    function Dl(e) {
      ne !== null && typeof ne.markComponentPassiveEffectMountStarted == "function" && ne.markComponentPassiveEffectMountStarted(e);
    }
    function Tc() {
      ne !== null && typeof ne.markComponentPassiveEffectMountStopped == "function" && ne.markComponentPassiveEffectMountStopped();
    }
    function Nv(e) {
      ne !== null && typeof ne.markComponentPassiveEffectUnmountStarted == "function" && ne.markComponentPassiveEffectUnmountStarted(e);
    }
    function xc() {
      ne !== null && typeof ne.markComponentPassiveEffectUnmountStopped == "function" && ne.markComponentPassiveEffectUnmountStopped();
    }
    function zv(e) {
      ne !== null && typeof ne.markComponentLayoutEffectMountStarted == "function" && ne.markComponentLayoutEffectMountStarted(e);
    }
    function ps() {
      ne !== null && typeof ne.markComponentLayoutEffectMountStopped == "function" && ne.markComponentLayoutEffectMountStopped();
    }
    function oi(e) {
      ne !== null && typeof ne.markComponentLayoutEffectUnmountStarted == "function" && ne.markComponentLayoutEffectUnmountStarted(e);
    }
    function ro() {
      ne !== null && typeof ne.markComponentLayoutEffectUnmountStopped == "function" && ne.markComponentLayoutEffectUnmountStopped();
    }
    function vs(e, t, a) {
      ne !== null && typeof ne.markComponentErrored == "function" && ne.markComponentErrored(e, t, a);
    }
    function uu(e, t, a) {
      ne !== null && typeof ne.markComponentSuspended == "function" && ne.markComponentSuspended(e, t, a);
    }
    function Td(e) {
      ne !== null && typeof ne.markLayoutEffectsStarted == "function" && ne.markLayoutEffectsStarted(e);
    }
    function ao() {
      ne !== null && typeof ne.markLayoutEffectsStopped == "function" && ne.markLayoutEffectsStopped();
    }
    function Uv(e) {
      ne !== null && typeof ne.markPassiveEffectsStarted == "function" && ne.markPassiveEffectsStarted(e);
    }
    function xd() {
      ne !== null && typeof ne.markPassiveEffectsStopped == "function" && ne.markPassiveEffectsStopped();
    }
    function pn(e) {
      ne !== null && typeof ne.markRenderStarted == "function" && ne.markRenderStarted(e);
    }
    function wc() {
      ne !== null && typeof ne.markRenderYielded == "function" && ne.markRenderYielded();
    }
    function bc() {
      ne !== null && typeof ne.markRenderStopped == "function" && ne.markRenderStopped();
    }
    function wd(e) {
      ne !== null && typeof ne.markRenderScheduled == "function" && ne.markRenderScheduled(e);
    }
    function _c(e, t) {
      ne !== null && typeof ne.markForceUpdateScheduled == "function" && ne.markForceUpdateScheduled(e, t);
    }
    function hs(e, t) {
      ne !== null && typeof ne.markStateUpdateScheduled == "function" && ne.markStateUpdateScheduled(e, t);
    }
    var Re = (
      /*                         */
      0
    ), we = (
      /*                 */
      1
    ), Qe = (
      /*                    */
      2
    ), vt = (
      /*               */
      8
    ), Ra = (
      /*              */
      16
    ), io = Math.clz32 ? Math.clz32 : Rr, ms = Math.log, iy = Math.LN2;
    function Rr(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (ms(t) / iy | 0) | 0;
    }
    var ys = 31, B = (
      /*                        */
      0
    ), Hn = (
      /*                          */
      0
    ), De = (
      /*                        */
      1
    ), lr = (
      /*    */
      2
    ), Ta = (
      /*             */
      4
    ), Wi = (
      /*            */
      8
    ), Pa = (
      /*                     */
      16
    ), lo = (
      /*                */
      32
    ), ou = (
      /*                       */
      4194240
    ), uo = (
      /*                        */
      64
    ), kc = (
      /*                        */
      128
    ), Dc = (
      /*                        */
      256
    ), Oc = (
      /*                        */
      512
    ), Lc = (
      /*                        */
      1024
    ), Mc = (
      /*                        */
      2048
    ), su = (
      /*                        */
      4096
    ), Nc = (
      /*                        */
      8192
    ), oo = (
      /*                        */
      16384
    ), so = (
      /*                       */
      32768
    ), zc = (
      /*                       */
      65536
    ), gs = (
      /*                       */
      131072
    ), Uc = (
      /*                       */
      262144
    ), Ac = (
      /*                       */
      524288
    ), jc = (
      /*                       */
      1048576
    ), Fc = (
      /*                       */
      2097152
    ), co = (
      /*                            */
      130023424
    ), cu = (
      /*                             */
      4194304
    ), Hc = (
      /*                             */
      8388608
    ), Vc = (
      /*                             */
      16777216
    ), bd = (
      /*                             */
      33554432
    ), Pc = (
      /*                             */
      67108864
    ), Av = cu, Ss = (
      /*          */
      134217728
    ), _d = (
      /*                          */
      268435455
    ), fo = (
      /*               */
      268435456
    ), Ol = (
      /*                        */
      536870912
    ), Tr = (
      /*                   */
      1073741824
    );
    function ly(e) {
      {
        if (e & De)
          return "Sync";
        if (e & lr)
          return "InputContinuousHydration";
        if (e & Ta)
          return "InputContinuous";
        if (e & Wi)
          return "DefaultHydration";
        if (e & Pa)
          return "Default";
        if (e & lo)
          return "TransitionHydration";
        if (e & ou)
          return "Transition";
        if (e & co)
          return "Retry";
        if (e & Ss)
          return "SelectiveHydration";
        if (e & fo)
          return "IdleHydration";
        if (e & Ol)
          return "Idle";
        if (e & Tr)
          return "Offscreen";
      }
    }
    var nn = -1, Bc = uo, aa = cu;
    function fu(e) {
      switch (Ln(e)) {
        case De:
          return De;
        case lr:
          return lr;
        case Ta:
          return Ta;
        case Wi:
          return Wi;
        case Pa:
          return Pa;
        case lo:
          return lo;
        case uo:
        case kc:
        case Dc:
        case Oc:
        case Lc:
        case Mc:
        case su:
        case Nc:
        case oo:
        case so:
        case zc:
        case gs:
        case Uc:
        case Ac:
        case jc:
        case Fc:
          return e & ou;
        case cu:
        case Hc:
        case Vc:
        case bd:
        case Pc:
          return e & co;
        case Ss:
          return Ss;
        case fo:
          return fo;
        case Ol:
          return Ol;
        case Tr:
          return Tr;
        default:
          return S("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function du(e, t) {
      var a = e.pendingLanes;
      if (a === B)
        return B;
      var i = B, u = e.suspendedLanes, s = e.pingedLanes, f = a & _d;
      if (f !== B) {
        var p = f & ~u;
        if (p !== B)
          i = fu(p);
        else {
          var v = f & s;
          v !== B && (i = fu(v));
        }
      } else {
        var y = a & ~u;
        y !== B ? i = fu(y) : s !== B && (i = fu(s));
      }
      if (i === B)
        return B;
      if (t !== B && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === B) {
        var g = Ln(i), b = Ln(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          g >= b || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          g === Pa && (b & ou) !== B
        )
          return t;
      }
      (i & Ta) !== B && (i |= a & Pa);
      var x = e.entangledLanes;
      if (x !== B)
        for (var M = e.entanglements, U = i & x; U > 0; ) {
          var F = Ml(U), ue = 1 << F;
          i |= M[F], U &= ~ue;
        }
      return i;
    }
    function jv(e, t) {
      for (var a = e.eventTimes, i = nn; t > 0; ) {
        var u = Ml(t), s = 1 << u, f = a[u];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function Fv(e, t) {
      switch (e) {
        case De:
        case lr:
        case Ta:
          return t + 250;
        case Wi:
        case Pa:
        case lo:
        case uo:
        case kc:
        case Dc:
        case Oc:
        case Lc:
        case Mc:
        case su:
        case Nc:
        case oo:
        case so:
        case zc:
        case gs:
        case Uc:
        case Ac:
        case jc:
        case Fc:
          return t + 5e3;
        case cu:
        case Hc:
        case Vc:
        case bd:
        case Pc:
          return nn;
        case Ss:
        case fo:
        case Ol:
        case Tr:
          return nn;
        default:
          return S("Should have found matching lanes. This is a bug in React."), nn;
      }
    }
    function Hv(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, u = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Ml(f), v = 1 << p, y = s[p];
        y === nn ? ((v & i) === B || (v & u) !== B) && (s[p] = Fv(v, t)) : y <= t && (e.expiredLanes |= v), f &= ~v;
      }
    }
    function kd(e) {
      return fu(e.pendingLanes);
    }
    function Ll(e) {
      var t = e.pendingLanes & ~Tr;
      return t !== B ? t : t & Tr ? Tr : B;
    }
    function Dd(e) {
      return (e & De) !== B;
    }
    function Es(e) {
      return (e & _d) !== B;
    }
    function Vv(e) {
      return (e & co) === e;
    }
    function Pv(e) {
      var t = De | Ta | Pa;
      return (e & t) === B;
    }
    function Bv(e) {
      return (e & ou) === e;
    }
    function Cs(e, t) {
      var a = lr | Ta | Wi | Pa;
      return (t & a) !== B;
    }
    function $v(e, t) {
      return (t & e.expiredLanes) !== B;
    }
    function Od(e) {
      return (e & ou) !== B;
    }
    function Iv() {
      var e = Bc;
      return Bc <<= 1, (Bc & ou) === B && (Bc = uo), e;
    }
    function ia() {
      var e = aa;
      return aa <<= 1, (aa & co) === B && (aa = cu), e;
    }
    function Ln(e) {
      return e & -e;
    }
    function po(e) {
      return Ln(e);
    }
    function Ml(e) {
      return 31 - io(e);
    }
    function $c(e) {
      return Ml(e);
    }
    function la(e, t) {
      return (e & t) !== B;
    }
    function pu(e, t) {
      return (e & t) === t;
    }
    function Je(e, t) {
      return e | t;
    }
    function Rs(e, t) {
      return e & ~t;
    }
    function Ic(e, t) {
      return e & t;
    }
    function uy(e) {
      return e;
    }
    function Yv(e, t) {
      return e !== Hn && e < t ? e : t;
    }
    function Ts(e) {
      for (var t = [], a = 0; a < ys; a++)
        t.push(e);
      return t;
    }
    function vu(e, t, a) {
      e.pendingLanes |= t, t !== Ol && (e.suspendedLanes = B, e.pingedLanes = B);
      var i = e.eventTimes, u = $c(t);
      i[u] = a;
    }
    function Qv(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var u = Ml(i), s = 1 << u;
        a[u] = nn, i &= ~s;
      }
    }
    function Yc(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function Qc(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = B, e.pingedLanes = B, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, u = e.eventTimes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Ml(f), v = 1 << p;
        i[p] = B, u[p] = nn, s[p] = nn, f &= ~v;
      }
    }
    function Ld(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, u = a; u; ) {
        var s = Ml(u), f = 1 << s;
        // Is this one of the newly entangled lanes?
        f & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[s] & t && (i[s] |= t), u &= ~f;
      }
    }
    function Wv(e, t) {
      var a = Ln(t), i;
      switch (a) {
        case Ta:
          i = lr;
          break;
        case Pa:
          i = Wi;
          break;
        case uo:
        case kc:
        case Dc:
        case Oc:
        case Lc:
        case Mc:
        case su:
        case Nc:
        case oo:
        case so:
        case zc:
        case gs:
        case Uc:
        case Ac:
        case jc:
        case Fc:
        case cu:
        case Hc:
        case Vc:
        case bd:
        case Pc:
          i = lo;
          break;
        case Ol:
          i = fo;
          break;
        default:
          i = Hn;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== Hn ? Hn : i;
    }
    function Wc(e, t, a) {
      if (Ca)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = $c(a), s = 1 << u, f = i[u];
          f.add(t), a &= ~s;
        }
    }
    function Md(e, t) {
      if (Ca)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var u = $c(t), s = 1 << u, f = a[u];
          f.size > 0 && (f.forEach(function(p) {
            var v = p.alternate;
            (v === null || !i.has(v)) && i.add(p);
          }), f.clear()), t &= ~s;
        }
    }
    function xs(e, t) {
      return null;
    }
    var Mn = De, Gi = Ta, Ri = Pa, vo = Ol, ho = Hn;
    function Ba() {
      return ho;
    }
    function wn(e) {
      ho = e;
    }
    function xr(e, t) {
      var a = ho;
      try {
        return ho = e, t();
      } finally {
        ho = a;
      }
    }
    function oy(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function sy(e, t) {
      return e === 0 || e > t ? e : t;
    }
    function mo(e, t) {
      return e !== 0 && e < t;
    }
    function ur(e) {
      var t = Ln(e);
      return mo(Mn, t) ? mo(Gi, t) ? Es(t) ? Ri : vo : Gi : Mn;
    }
    function Gc(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var he;
    function yo(e) {
      he = e;
    }
    function Nd(e) {
      he(e);
    }
    var qc;
    function cy(e) {
      qc = e;
    }
    var go;
    function Kc(e) {
      go = e;
    }
    var Xc;
    function Gv(e) {
      Xc = e;
    }
    var zd;
    function qv(e) {
      zd = e;
    }
    var ws = !1, So = [], vn = null, er = null, Nr = null, Eo = /* @__PURE__ */ new Map(), Co = /* @__PURE__ */ new Map(), tr = [], Kv = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function Ti(e) {
      return Kv.indexOf(e) > -1;
    }
    function fy(e, t, a, i, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [i]
      };
    }
    function Ud(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          vn = null;
          break;
        case "dragenter":
        case "dragleave":
          er = null;
          break;
        case "mouseover":
        case "mouseout":
          Nr = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          Eo.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          Co.delete(i);
          break;
        }
      }
    }
    function Ro(e, t, a, i, u, s) {
      if (e === null || e.nativeEvent !== s) {
        var f = fy(t, a, i, u, s);
        if (t !== null) {
          var p = Lo(t);
          p !== null && qc(p);
        }
        return f;
      }
      e.eventSystemFlags |= i;
      var v = e.targetContainers;
      return u !== null && v.indexOf(u) === -1 && v.push(u), e;
    }
    function Xv(e, t, a, i, u) {
      switch (t) {
        case "focusin": {
          var s = u;
          return vn = Ro(vn, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = u;
          return er = Ro(er, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var p = u;
          return Nr = Ro(Nr, e, t, a, i, p), !0;
        }
        case "pointerover": {
          var v = u, y = v.pointerId;
          return Eo.set(y, Ro(Eo.get(y) || null, e, t, a, i, v)), !0;
        }
        case "gotpointercapture": {
          var g = u, b = g.pointerId;
          return Co.set(b, Ro(Co.get(b) || null, e, t, a, i, g)), !0;
        }
      }
      return !1;
    }
    function Ad(e) {
      var t = js(e.target);
      if (t !== null) {
        var a = Sa(t);
        if (a !== null) {
          var i = a.tag;
          if (i === Oe) {
            var u = yd(a);
            if (u !== null) {
              e.blockedOn = u, zd(e.priority, function() {
                go(a);
              });
              return;
            }
          } else if (i === te) {
            var s = a.stateNode;
            if (Gc(s)) {
              e.blockedOn = mc(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function dy(e) {
      for (var t = Xc(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < tr.length && mo(t, tr[i].priority); i++)
        ;
      tr.splice(i, 0, a), i === 0 && Ad(a);
    }
    function hu(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = wr(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var u = e.nativeEvent, s = new u.constructor(u.type, u);
          is(s), u.target.dispatchEvent(s), ty();
        } else {
          var f = Lo(i);
          return f !== null && qc(f), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function Zc(e, t, a) {
      hu(e) && a.delete(t);
    }
    function $a() {
      ws = !1, vn !== null && hu(vn) && (vn = null), er !== null && hu(er) && (er = null), Nr !== null && hu(Nr) && (Nr = null), Eo.forEach(Zc), Co.forEach(Zc);
    }
    function yt(e, t) {
      e.blockedOn === t && (e.blockedOn = null, ws || (ws = !0, X.unstable_scheduleCallback(X.unstable_NormalPriority, $a)));
    }
    function bn(e) {
      if (So.length > 0) {
        yt(So[0], e);
        for (var t = 1; t < So.length; t++) {
          var a = So[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      vn !== null && yt(vn, e), er !== null && yt(er, e), Nr !== null && yt(Nr, e);
      var i = function(p) {
        return yt(p, e);
      };
      Eo.forEach(i), Co.forEach(i);
      for (var u = 0; u < tr.length; u++) {
        var s = tr[u];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; tr.length > 0; ) {
        var f = tr[0];
        if (f.blockedOn !== null)
          break;
        Ad(f), f.blockedOn === null && tr.shift();
      }
    }
    var sn = A.ReactCurrentBatchConfig, $n = !0;
    function ua(e) {
      $n = !!e;
    }
    function To() {
      return $n;
    }
    function In(e, t, a) {
      var i = Jc(t), u;
      switch (i) {
        case Mn:
          u = bs;
          break;
        case Gi:
          u = mu;
          break;
        case Ri:
        default:
          u = xo;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function bs(e, t, a, i) {
      var u = Ba(), s = sn.transition;
      sn.transition = null;
      try {
        wn(Mn), xo(e, t, a, i);
      } finally {
        wn(u), sn.transition = s;
      }
    }
    function mu(e, t, a, i) {
      var u = Ba(), s = sn.transition;
      sn.transition = null;
      try {
        wn(Gi), xo(e, t, a, i);
      } finally {
        wn(u), sn.transition = s;
      }
    }
    function xo(e, t, a, i) {
      $n && jd(e, t, a, i);
    }
    function jd(e, t, a, i) {
      var u = wr(e, t, a, i);
      if (u === null) {
        Dy(e, t, i, Nl, a), Ud(e, i);
        return;
      }
      if (Xv(u, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (Ud(e, i), t & Jl && Ti(e)) {
        for (; u !== null; ) {
          var s = Lo(u);
          s !== null && Nd(s);
          var f = wr(e, t, a, i);
          if (f === null && Dy(e, t, i, Nl, a), f === u)
            break;
          u = f;
        }
        u !== null && i.stopPropagation();
        return;
      }
      Dy(e, t, i, null, a);
    }
    var Nl = null;
    function wr(e, t, a, i) {
      Nl = null;
      var u = fc(i), s = js(u);
      if (s !== null) {
        var f = Sa(s);
        if (f === null)
          s = null;
        else {
          var p = f.tag;
          if (p === Oe) {
            var v = yd(f);
            if (v !== null)
              return v;
            s = null;
          } else if (p === te) {
            var y = f.stateNode;
            if (Gc(y))
              return mc(f);
            s = null;
          } else
            f !== s && (s = null);
        }
      }
      return Nl = s, null;
    }
    function Jc(e) {
      switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return Mn;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return Gi;
        case "message": {
          var t = Ed();
          switch (t) {
            case Ec:
              return Mn;
            case iu:
              return Gi;
            case Ci:
            case Ov:
              return Ri;
            case Cc:
              return vo;
            default:
              return Ri;
          }
        }
        default:
          return Ri;
      }
    }
    function wo(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function qi(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function ef(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function Fd(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var Ia = null, bo = null, Ya = null;
    function tf(e) {
      return Ia = e, bo = ks(), !0;
    }
    function _s() {
      Ia = null, bo = null, Ya = null;
    }
    function nf() {
      if (Ya)
        return Ya;
      var e, t = bo, a = t.length, i, u = ks(), s = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var f = a - e;
      for (i = 1; i <= f && t[a - i] === u[s - i]; i++)
        ;
      var p = i > 1 ? 1 - i : void 0;
      return Ya = u.slice(e, p), Ya;
    }
    function ks() {
      return "value" in Ia ? Ia.value : Ia.textContent;
    }
    function yu(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function nr() {
      return !0;
    }
    function Ki() {
      return !1;
    }
    function En(e) {
      function t(a, i, u, s, f) {
        this._reactName = a, this._targetInst = u, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
        for (var p in e)
          if (e.hasOwnProperty(p)) {
            var v = e[p];
            v ? this[p] = v(s) : this[p] = s[p];
          }
        var y = s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1;
        return y ? this.isDefaultPrevented = nr : this.isDefaultPrevented = Ki, this.isPropagationStopped = Ki, this;
      }
      return ut(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = nr);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = nr);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: nr
      }), t;
    }
    var Yn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, rf = En(Yn), gu = ut({}, Yn, {
      view: 0,
      detail: 0
    }), Hd = En(gu), Vd, xi, _o;
    function Pd(e) {
      e !== _o && (_o && e.type === "mousemove" ? (Vd = e.screenX - _o.screenX, xi = e.screenY - _o.screenY) : (Vd = 0, xi = 0), _o = e);
    }
    var wi = ut({}, gu, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Bd,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (Pd(e), Vd);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : xi;
      }
    }), af = En(wi), Su = ut({}, wi, {
      dataTransfer: 0
    }), Zv = En(Su), Jv = ut({}, gu, {
      relatedTarget: 0
    }), Ds = En(Jv), lf = ut({}, Yn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), py = En(lf), vy = ut({}, Yn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), eh = En(vy), th = ut({}, Yn, {
      data: 0
    }), zl = En(th), hy = zl, ko = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, nh = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    function _n(e) {
      if (e.key) {
        var t = ko[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = yu(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? nh[e.keyCode] || "Unidentified" : "";
    }
    var my = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function rh(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = my[e];
      return i ? !!a[i] : !1;
    }
    function Bd(e) {
      return rh;
    }
    var yy = ut({}, gu, {
      key: _n,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Bd,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? yu(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? yu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), ah = En(yy), ih = ut({}, wi, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), lh = En(ih), Qa = ut({}, gu, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Bd
    }), $d = En(Qa), gy = ut({}, Yn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Ul = En(gy), uf = ut({}, wi, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), Eu = En(uf), of = [9, 13, 27, 32], sf = 229, Os = hn && "CompositionEvent" in window, Ls = null;
    hn && "documentMode" in document && (Ls = document.documentMode);
    var Id = hn && "TextEvent" in window && !Ls, uh = hn && (!Os || Ls && Ls > 8 && Ls <= 11), Yd = 32, Qd = String.fromCharCode(Yd);
    function cf() {
      mr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), mr("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), mr("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), mr("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var Ms = !1;
    function oh(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function Wd(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function Sy(e, t) {
      return e === "keydown" && t.keyCode === sf;
    }
    function Gd(e, t) {
      switch (e) {
        case "keyup":
          return of.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== sf;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function ff(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function Ns(e) {
      return e.locale === "ko";
    }
    var Al = !1;
    function df(e, t, a, i, u) {
      var s, f;
      if (Os ? s = Wd(t) : Al ? Gd(t, i) && (s = "onCompositionEnd") : Sy(t, i) && (s = "onCompositionStart"), !s)
        return null;
      uh && !Ns(i) && (!Al && s === "onCompositionStart" ? Al = tf(u) : s === "onCompositionEnd" && Al && (f = nf()));
      var p = vh(a, s);
      if (p.length > 0) {
        var v = new zl(s, t, null, i, u);
        if (e.push({
          event: v,
          listeners: p
        }), f)
          v.data = f;
        else {
          var y = ff(i);
          y !== null && (v.data = y);
        }
      }
    }
    function sh(e, t) {
      switch (e) {
        case "compositionend":
          return ff(t);
        case "keypress":
          var a = t.which;
          return a !== Yd ? null : (Ms = !0, Qd);
        case "textInput":
          var i = t.data;
          return i === Qd && Ms ? null : i;
        default:
          return null;
      }
    }
    function Ey(e, t) {
      if (Al) {
        if (e === "compositionend" || !Os && Gd(e, t)) {
          var a = nf();
          return _s(), Al = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!oh(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return uh && !Ns(t) ? null : t.data;
        default:
          return null;
      }
    }
    function pf(e, t, a, i, u) {
      var s;
      if (Id ? s = sh(t, i) : s = Ey(t, i), !s)
        return null;
      var f = vh(a, "onBeforeInput");
      if (f.length > 0) {
        var p = new hy("onBeforeInput", "beforeinput", null, i, u);
        e.push({
          event: p,
          listeners: f
        }), p.data = s;
      }
    }
    function Cy(e, t, a, i, u, s, f) {
      df(e, t, a, i, u), pf(e, t, a, i, u);
    }
    var zs = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function ch(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!zs[e.type] : t === "textarea";
    }
    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function vf(e) {
      if (!hn)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function n() {
      mr("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function r(e, t, a, i) {
      dc(i);
      var u = vh(t, "onChange");
      if (u.length > 0) {
        var s = new rf("onChange", "change", null, a, i);
        e.push({
          event: s,
          listeners: u
        });
      }
    }
    var l = null, o = null;
    function c(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function d(e) {
      var t = [];
      r(t, o, e, fc(e)), sd(m, t);
    }
    function m(e) {
      M0(e, 0);
    }
    function E(e) {
      var t = Ef(e);
      if ($u(t))
        return e;
    }
    function T(e, t) {
      if (e === "change")
        return t;
    }
    var z = !1;
    hn && (z = vf("input") && (!document.documentMode || document.documentMode > 9));
    function Y(e, t) {
      l = e, o = t, l.attachEvent("onpropertychange", I);
    }
    function Q() {
      l && (l.detachEvent("onpropertychange", I), l = null, o = null);
    }
    function I(e) {
      e.propertyName === "value" && E(o) && d(e);
    }
    function ce(e, t, a) {
      e === "focusin" ? (Q(), Y(t, a)) : e === "focusout" && Q();
    }
    function ye(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return E(o);
    }
    function Ce(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function Nn(e, t) {
      if (e === "click")
        return E(t);
    }
    function k(e, t) {
      if (e === "input" || e === "change")
        return E(t);
    }
    function w(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || Ne(e, "number", e.value);
    }
    function L(e, t, a, i, u, s, f) {
      var p = a ? Ef(a) : window, v, y;
      if (c(p) ? v = T : ch(p) ? z ? v = k : (v = ye, y = ce) : Ce(p) && (v = Nn), v) {
        var g = v(t, a);
        if (g) {
          r(e, g, i, u);
          return;
        }
      }
      y && y(t, p, a), t === "focusout" && w(p);
    }
    function Z() {
      $r("onMouseEnter", ["mouseout", "mouseover"]), $r("onMouseLeave", ["mouseout", "mouseover"]), $r("onPointerEnter", ["pointerout", "pointerover"]), $r("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function Te(e, t, a, i, u, s, f) {
      var p = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout";
      if (p && !Tv(i)) {
        var y = i.relatedTarget || i.fromElement;
        if (y && (js(y) || op(y)))
          return;
      }
      if (!(!v && !p)) {
        var g;
        if (u.window === u)
          g = u;
        else {
          var b = u.ownerDocument;
          b ? g = b.defaultView || b.parentWindow : g = window;
        }
        var x, M;
        if (v) {
          var U = i.relatedTarget || i.toElement;
          if (x = a, M = U ? js(U) : null, M !== null) {
            var F = Sa(M);
            (M !== F || M.tag !== le && M.tag !== Ve) && (M = null);
          }
        } else
          x = null, M = a;
        if (x !== M) {
          var ue = af, Me = "onMouseLeave", be = "onMouseEnter", wt = "mouse";
          (t === "pointerout" || t === "pointerover") && (ue = lh, Me = "onPointerLeave", be = "onPointerEnter", wt = "pointer");
          var gt = x == null ? g : Ef(x), D = M == null ? g : Ef(M), H = new ue(Me, wt + "leave", x, i, u);
          H.target = gt, H.relatedTarget = D;
          var O = null, G = js(u);
          if (G === a) {
            var pe = new ue(be, wt + "enter", M, i, u);
            pe.target = D, pe.relatedTarget = gt, O = pe;
          }
          AR(e, H, O, x, M);
        }
      }
    }
    function Fe(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var ge = typeof Object.is == "function" ? Object.is : Fe;
    function He(e, t) {
      if (ge(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var u = 0; u < a.length; u++) {
        var s = a[u];
        if (!Gn.call(t, s) || !ge(e[s], t[s]))
          return !1;
      }
      return !0;
    }
    function Qn(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function Lt(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function Xi(e, t) {
      for (var a = Qn(e), i = 0, u = 0; a; ) {
        if (a.nodeType === Hi) {
          if (u = i + a.textContent.length, i <= t && u >= t)
            return {
              node: a,
              offset: t - i
            };
          i = u;
        }
        a = Qn(Lt(a));
      }
    }
    function Ry(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var u = i.anchorNode, s = i.anchorOffset, f = i.focusNode, p = i.focusOffset;
      try {
        u.nodeType, f.nodeType;
      } catch {
        return null;
      }
      return mR(e, u, s, f, p);
    }
    function mR(e, t, a, i, u) {
      var s = 0, f = -1, p = -1, v = 0, y = 0, g = e, b = null;
      e:
        for (; ; ) {
          for (var x = null; g === t && (a === 0 || g.nodeType === Hi) && (f = s + a), g === i && (u === 0 || g.nodeType === Hi) && (p = s + u), g.nodeType === Hi && (s += g.nodeValue.length), (x = g.firstChild) !== null; )
            b = g, g = x;
          for (; ; ) {
            if (g === e)
              break e;
            if (b === t && ++v === a && (f = s), b === i && ++y === u && (p = s), (x = g.nextSibling) !== null)
              break;
            g = b, b = g.parentNode;
          }
          g = x;
        }
      return f === -1 || p === -1 ? null : {
        start: f,
        end: p
      };
    }
    function yR(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var u = i.getSelection(), s = e.textContent.length, f = Math.min(t.start, s), p = t.end === void 0 ? f : Math.min(t.end, s);
        if (!u.extend && f > p) {
          var v = p;
          p = f, f = v;
        }
        var y = Xi(e, f), g = Xi(e, p);
        if (y && g) {
          if (u.rangeCount === 1 && u.anchorNode === y.node && u.anchorOffset === y.offset && u.focusNode === g.node && u.focusOffset === g.offset)
            return;
          var b = a.createRange();
          b.setStart(y.node, y.offset), u.removeAllRanges(), f > p ? (u.addRange(b), u.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), u.addRange(b));
        }
      }
    }
    function E0(e) {
      return e && e.nodeType === Hi;
    }
    function C0(e, t) {
      return !e || !t ? !1 : e === t ? !0 : E0(e) ? !1 : E0(t) ? C0(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function gR(e) {
      return e && e.ownerDocument && C0(e.ownerDocument.documentElement, e);
    }
    function SR(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function R0() {
      for (var e = window, t = El(); t instanceof e.HTMLIFrameElement; ) {
        if (SR(t))
          e = t.contentWindow;
        else
          return t;
        t = El(e.document);
      }
      return t;
    }
    function Ty(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function ER() {
      var e = R0();
      return {
        focusedElem: e,
        selectionRange: Ty(e) ? RR(e) : null
      };
    }
    function CR(e) {
      var t = R0(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && gR(a)) {
        i !== null && Ty(a) && TR(a, i);
        for (var u = [], s = a; s = s.parentNode; )
          s.nodeType === Xr && u.push({
            element: s,
            left: s.scrollLeft,
            top: s.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var f = 0; f < u.length; f++) {
          var p = u[f];
          p.element.scrollLeft = p.left, p.element.scrollTop = p.top;
        }
      }
    }
    function RR(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = Ry(e), t || {
        start: 0,
        end: 0
      };
    }
    function TR(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : yR(e, t);
    }
    var xR = hn && "documentMode" in document && document.documentMode <= 11;
    function wR() {
      mr("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var hf = null, xy = null, qd = null, wy = !1;
    function bR(e) {
      if ("selectionStart" in e && Ty(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, a = t.getSelection();
      return {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      };
    }
    function _R(e) {
      return e.window === e ? e.document : e.nodeType === ii ? e : e.ownerDocument;
    }
    function T0(e, t, a) {
      var i = _R(a);
      if (!(wy || hf == null || hf !== El(i))) {
        var u = bR(hf);
        if (!qd || !He(qd, u)) {
          qd = u;
          var s = vh(xy, "onSelect");
          if (s.length > 0) {
            var f = new rf("onSelect", "select", null, t, a);
            e.push({
              event: f,
              listeners: s
            }), f.target = hf;
          }
        }
      }
    }
    function kR(e, t, a, i, u, s, f) {
      var p = a ? Ef(a) : window;
      switch (t) {
        case "focusin":
          (ch(p) || p.contentEditable === "true") && (hf = p, xy = a, qd = null);
          break;
        case "focusout":
          hf = null, xy = null, qd = null;
          break;
        case "mousedown":
          wy = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          wy = !1, T0(e, i, u);
          break;
        case "selectionchange":
          if (xR)
            break;
        case "keydown":
        case "keyup":
          T0(e, i, u);
      }
    }
    function fh(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var mf = {
      animationend: fh("Animation", "AnimationEnd"),
      animationiteration: fh("Animation", "AnimationIteration"),
      animationstart: fh("Animation", "AnimationStart"),
      transitionend: fh("Transition", "TransitionEnd")
    }, by = {}, x0 = {};
    hn && (x0 = document.createElement("div").style, "AnimationEvent" in window || (delete mf.animationend.animation, delete mf.animationiteration.animation, delete mf.animationstart.animation), "TransitionEvent" in window || delete mf.transitionend.transition);
    function dh(e) {
      if (by[e])
        return by[e];
      if (!mf[e])
        return e;
      var t = mf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in x0)
          return by[e] = t[a];
      return e;
    }
    var w0 = dh("animationend"), b0 = dh("animationiteration"), _0 = dh("animationstart"), k0 = dh("transitionend"), D0 = /* @__PURE__ */ new Map(), O0 = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function Do(e, t) {
      D0.set(e, t), mr(t, [e]);
    }
    function DR() {
      for (var e = 0; e < O0.length; e++) {
        var t = O0[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        Do(a, "on" + i);
      }
      Do(w0, "onAnimationEnd"), Do(b0, "onAnimationIteration"), Do(_0, "onAnimationStart"), Do("dblclick", "onDoubleClick"), Do("focusin", "onFocus"), Do("focusout", "onBlur"), Do(k0, "onTransitionEnd");
    }
    function OR(e, t, a, i, u, s, f) {
      var p = D0.get(t);
      if (p !== void 0) {
        var v = rf, y = t;
        switch (t) {
          case "keypress":
            if (yu(i) === 0)
              return;
          case "keydown":
          case "keyup":
            v = ah;
            break;
          case "focusin":
            y = "focus", v = Ds;
            break;
          case "focusout":
            y = "blur", v = Ds;
            break;
          case "beforeblur":
          case "afterblur":
            v = Ds;
            break;
          case "click":
            if (i.button === 2)
              return;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = af;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Zv;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = $d;
            break;
          case w0:
          case b0:
          case _0:
            v = py;
            break;
          case k0:
            v = Ul;
            break;
          case "scroll":
            v = Hd;
            break;
          case "wheel":
            v = Eu;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = eh;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = lh;
            break;
        }
        var g = (s & Jl) !== 0;
        {
          var b = !g && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", x = zR(a, p, i.type, g, b);
          if (x.length > 0) {
            var M = new v(p, y, null, i, u);
            e.push({
              event: M,
              listeners: x
            });
          }
        }
      }
    }
    DR(), Z(), n(), wR(), cf();
    function LR(e, t, a, i, u, s, f) {
      OR(e, t, a, i, u, s);
      var p = (s & ey) === 0;
      p && (Te(e, t, a, i, u), L(e, t, a, i, u), kR(e, t, a, i, u), Cy(e, t, a, i, u));
    }
    var Kd = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], _y = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Kd));
    function L0(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, $i(i, t, void 0, e), e.currentTarget = null;
    }
    function MR(e, t, a) {
      var i;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var s = t[u], f = s.instance, p = s.currentTarget, v = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          L0(e, v, p), i = f;
        }
      else
        for (var y = 0; y < t.length; y++) {
          var g = t[y], b = g.instance, x = g.currentTarget, M = g.listener;
          if (b !== i && e.isPropagationStopped())
            return;
          L0(e, M, x), i = b;
        }
    }
    function M0(e, t) {
      for (var a = (t & Jl) !== 0, i = 0; i < e.length; i++) {
        var u = e[i], s = u.event, f = u.listeners;
        MR(s, f, a);
      }
      pd();
    }
    function NR(e, t, a, i, u) {
      var s = fc(a), f = [];
      LR(f, e, i, a, s, t), M0(f, t);
    }
    function Cn(e, t) {
      _y.has(e) || S('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = sx(t), u = jR(e, a);
      i.has(u) || (N0(t, e, rs, a), i.add(u));
    }
    function ky(e, t, a) {
      _y.has(e) && !t && S('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= Jl), N0(a, e, i, t);
    }
    var ph = "_reactListening" + Math.random().toString(36).slice(2);
    function Xd(e) {
      if (!e[ph]) {
        e[ph] = !0, ot.forEach(function(a) {
          a !== "selectionchange" && (_y.has(a) || ky(a, !1, e), ky(a, !0, e));
        });
        var t = e.nodeType === ii ? e : e.ownerDocument;
        t !== null && (t[ph] || (t[ph] = !0, ky("selectionchange", !1, t)));
      }
    }
    function N0(e, t, a, i, u) {
      var s = In(e, t, a), f = void 0;
      os && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? ef(e, t, s, f) : qi(e, t, s) : f !== void 0 ? Fd(e, t, s, f) : wo(e, t, s);
    }
    function z0(e, t) {
      return e === t || e.nodeType === jn && e.parentNode === t;
    }
    function Dy(e, t, a, i, u) {
      var s = i;
      if (!(t & Pi) && !(t & rs)) {
        var f = u;
        if (i !== null) {
          var p = i;
          e:
            for (; ; ) {
              if (p === null)
                return;
              var v = p.tag;
              if (v === te || v === ve) {
                var y = p.stateNode.containerInfo;
                if (z0(y, f))
                  break;
                if (v === ve)
                  for (var g = p.return; g !== null; ) {
                    var b = g.tag;
                    if (b === te || b === ve) {
                      var x = g.stateNode.containerInfo;
                      if (z0(x, f))
                        return;
                    }
                    g = g.return;
                  }
                for (; y !== null; ) {
                  var M = js(y);
                  if (M === null)
                    return;
                  var U = M.tag;
                  if (U === le || U === Ve) {
                    p = s = M;
                    continue e;
                  }
                  y = y.parentNode;
                }
              }
              p = p.return;
            }
        }
      }
      sd(function() {
        return NR(e, t, a, s);
      });
    }
    function Zd(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function zR(e, t, a, i, u, s) {
      for (var f = t !== null ? t + "Capture" : null, p = i ? f : t, v = [], y = e, g = null; y !== null; ) {
        var b = y, x = b.stateNode, M = b.tag;
        if (M === le && x !== null && (g = x, p !== null)) {
          var U = tu(y, p);
          U != null && v.push(Zd(y, U, g));
        }
        if (u)
          break;
        y = y.return;
      }
      return v;
    }
    function vh(e, t) {
      for (var a = t + "Capture", i = [], u = e; u !== null; ) {
        var s = u, f = s.stateNode, p = s.tag;
        if (p === le && f !== null) {
          var v = f, y = tu(u, a);
          y != null && i.unshift(Zd(u, y, v));
          var g = tu(u, t);
          g != null && i.push(Zd(u, g, v));
        }
        u = u.return;
      }
      return i;
    }
    function yf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== le);
      return e || null;
    }
    function UR(e, t) {
      for (var a = e, i = t, u = 0, s = a; s; s = yf(s))
        u++;
      for (var f = 0, p = i; p; p = yf(p))
        f++;
      for (; u - f > 0; )
        a = yf(a), u--;
      for (; f - u > 0; )
        i = yf(i), f--;
      for (var v = u; v--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = yf(a), i = yf(i);
      }
      return null;
    }
    function U0(e, t, a, i, u) {
      for (var s = t._reactName, f = [], p = a; p !== null && p !== i; ) {
        var v = p, y = v.alternate, g = v.stateNode, b = v.tag;
        if (y !== null && y === i)
          break;
        if (b === le && g !== null) {
          var x = g;
          if (u) {
            var M = tu(p, s);
            M != null && f.unshift(Zd(p, M, x));
          } else if (!u) {
            var U = tu(p, s);
            U != null && f.push(Zd(p, U, x));
          }
        }
        p = p.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    function AR(e, t, a, i, u) {
      var s = i && u ? UR(i, u) : null;
      i !== null && U0(e, t, i, s, !1), u !== null && a !== null && U0(e, a, u, s, !0);
    }
    function jR(e, t) {
      return e + "__" + (t ? "capture" : "bubble");
    }
    var Wa = !1, Jd = "dangerouslySetInnerHTML", hh = "suppressContentEditableWarning", Oo = "suppressHydrationWarning", A0 = "autoFocus", Us = "children", As = "style", mh = "__html", Oy, yh, ep, j0, gh, F0, H0;
    Oy = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, yh = function(e, t) {
      cc(e, t), ad(e, t), Rv(e, t, {
        registrationNameDependencies: st,
        possibleRegistrationNames: en
      });
    }, F0 = hn && !document.documentMode, ep = function(e, t, a) {
      if (!Wa) {
        var i = Sh(a), u = Sh(t);
        u !== i && (Wa = !0, S("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(i)));
      }
    }, j0 = function(e) {
      if (!Wa) {
        Wa = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), S("Extra attributes from the server: %s", t);
      }
    }, gh = function(e, t) {
      t === !1 ? S("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : S("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, H0 = function(e, t) {
      var a = e.namespaceURI === Fi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var FR = /\r\n?/g, HR = /\u0000|\uFFFD/g;
    function Sh(e) {
      Qr(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(FR, `
`).replace(HR, "");
    }
    function Eh(e, t, a, i) {
      var u = Sh(t), s = Sh(e);
      if (s !== u && (i && (Wa || (Wa = !0, S('Text content did not match. Server: "%s" Client: "%s"', s, u))), a && me))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function V0(e) {
      return e.nodeType === ii ? e : e.ownerDocument;
    }
    function VR() {
    }
    function Ch(e) {
      e.onclick = VR;
    }
    function PR(e, t, a, i, u) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === As)
            f && Object.freeze(f), dv(t, f);
          else if (s === Jd) {
            var p = f ? f[mh] : void 0;
            p != null && tv(t, p);
          } else if (s === Us)
            if (typeof f == "string") {
              var v = e !== "textarea" || f !== "";
              v && lc(t, f);
            } else
              typeof f == "number" && lc(t, "" + f);
          else
            s === hh || s === Oo || s === A0 || (st.hasOwnProperty(s) ? f != null && (typeof f != "function" && gh(s, f), s === "onScroll" && Cn("scroll", t)) : f != null && ma(t, s, f, u));
        }
    }
    function BR(e, t, a, i) {
      for (var u = 0; u < t.length; u += 2) {
        var s = t[u], f = t[u + 1];
        s === As ? dv(e, f) : s === Jd ? tv(e, f) : s === Us ? lc(e, f) : ma(e, s, f, i);
      }
    }
    function $R(e, t, a, i) {
      var u, s = V0(a), f, p = i;
      if (p === Fi && (p = ac(e)), p === Fi) {
        if (u = Vi(e, t), !u && e !== e.toLowerCase() && S("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var v = s.createElement("div");
          v.innerHTML = "<script><\/script>";
          var y = v.firstChild;
          f = v.removeChild(y);
        } else if (typeof t.is == "string")
          f = s.createElement(e, {
            is: t.is
          });
        else if (f = s.createElement(e), e === "select") {
          var g = f;
          t.multiple ? g.multiple = !0 : t.size && (g.size = t.size);
        }
      } else
        f = s.createElementNS(p, e);
      return p === Fi && !u && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !Gn.call(Oy, e) && (Oy[e] = !0, S("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function IR(e, t) {
      return V0(t).createTextNode(e);
    }
    function YR(e, t, a, i) {
      var u = Vi(t, a);
      yh(t, a);
      var s;
      switch (t) {
        case "dialog":
          Cn("cancel", e), Cn("close", e), s = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          Cn("load", e), s = a;
          break;
        case "video":
        case "audio":
          for (var f = 0; f < Kd.length; f++)
            Cn(Kd[f], e);
          s = a;
          break;
        case "source":
          Cn("error", e), s = a;
          break;
        case "img":
        case "image":
        case "link":
          Cn("error", e), Cn("load", e), s = a;
          break;
        case "details":
          Cn("toggle", e), s = a;
          break;
        case "input":
          C(e, a), s = h(e, a), Cn("invalid", e);
          break;
        case "option":
          Qt(e, a), s = a;
          break;
        case "select":
          Jo(e, a), s = Zo(e, a), Cn("invalid", e);
          break;
        case "textarea":
          Zp(e, a), s = qf(e, a), Cn("invalid", e);
          break;
        default:
          s = a;
      }
      switch (oc(t, s), PR(t, e, i, s, u), t) {
        case "input":
          Ma(e), K(e, a, !1);
          break;
        case "textarea":
          Ma(e), ev(e);
          break;
        case "option":
          Zt(e, a);
          break;
        case "select":
          Wf(e, a);
          break;
        default:
          typeof s.onClick == "function" && Ch(e);
          break;
      }
    }
    function QR(e, t, a, i, u) {
      yh(t, i);
      var s = null, f, p;
      switch (t) {
        case "input":
          f = h(e, a), p = h(e, i), s = [];
          break;
        case "select":
          f = Zo(e, a), p = Zo(e, i), s = [];
          break;
        case "textarea":
          f = qf(e, a), p = qf(e, i), s = [];
          break;
        default:
          f = a, p = i, typeof f.onClick != "function" && typeof p.onClick == "function" && Ch(e);
          break;
      }
      oc(t, p);
      var v, y, g = null;
      for (v in f)
        if (!(p.hasOwnProperty(v) || !f.hasOwnProperty(v) || f[v] == null))
          if (v === As) {
            var b = f[v];
            for (y in b)
              b.hasOwnProperty(y) && (g || (g = {}), g[y] = "");
          } else
            v === Jd || v === Us || v === hh || v === Oo || v === A0 || (st.hasOwnProperty(v) ? s || (s = []) : (s = s || []).push(v, null));
      for (v in p) {
        var x = p[v], M = f != null ? f[v] : void 0;
        if (!(!p.hasOwnProperty(v) || x === M || x == null && M == null))
          if (v === As)
            if (x && Object.freeze(x), M) {
              for (y in M)
                M.hasOwnProperty(y) && (!x || !x.hasOwnProperty(y)) && (g || (g = {}), g[y] = "");
              for (y in x)
                x.hasOwnProperty(y) && M[y] !== x[y] && (g || (g = {}), g[y] = x[y]);
            } else
              g || (s || (s = []), s.push(v, g)), g = x;
          else if (v === Jd) {
            var U = x ? x[mh] : void 0, F = M ? M[mh] : void 0;
            U != null && F !== U && (s = s || []).push(v, U);
          } else
            v === Us ? (typeof x == "string" || typeof x == "number") && (s = s || []).push(v, "" + x) : v === hh || v === Oo || (st.hasOwnProperty(v) ? (x != null && (typeof x != "function" && gh(v, x), v === "onScroll" && Cn("scroll", e)), !s && M !== x && (s = [])) : (s = s || []).push(v, x));
      }
      return g && (ts(g, p[As]), (s = s || []).push(As, g)), s;
    }
    function WR(e, t, a, i, u) {
      a === "input" && u.type === "radio" && u.name != null && N(e, u);
      var s = Vi(a, i), f = Vi(a, u);
      switch (BR(e, t, s, f), a) {
        case "input":
          j(e, u);
          break;
        case "textarea":
          Jp(e, u);
          break;
        case "select":
          Im(e, u);
          break;
      }
    }
    function GR(e) {
      {
        var t = e.toLowerCase();
        return sc.hasOwnProperty(t) && sc[t] || null;
      }
    }
    function qR(e, t, a, i, u, s, f) {
      var p, v;
      switch (p = Vi(t, a), yh(t, a), t) {
        case "dialog":
          Cn("cancel", e), Cn("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          Cn("load", e);
          break;
        case "video":
        case "audio":
          for (var y = 0; y < Kd.length; y++)
            Cn(Kd[y], e);
          break;
        case "source":
          Cn("error", e);
          break;
        case "img":
        case "image":
        case "link":
          Cn("error", e), Cn("load", e);
          break;
        case "details":
          Cn("toggle", e);
          break;
        case "input":
          C(e, a), Cn("invalid", e);
          break;
        case "option":
          Qt(e, a);
          break;
        case "select":
          Jo(e, a), Cn("invalid", e);
          break;
        case "textarea":
          Zp(e, a), Cn("invalid", e);
          break;
      }
      oc(t, a);
      {
        v = /* @__PURE__ */ new Set();
        for (var g = e.attributes, b = 0; b < g.length; b++) {
          var x = g[b].name.toLowerCase();
          switch (x) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              v.add(g[b].name);
          }
        }
      }
      var M = null;
      for (var U in a)
        if (a.hasOwnProperty(U)) {
          var F = a[U];
          if (U === Us)
            typeof F == "string" ? e.textContent !== F && (a[Oo] !== !0 && Eh(e.textContent, F, s, f), M = [Us, F]) : typeof F == "number" && e.textContent !== "" + F && (a[Oo] !== !0 && Eh(e.textContent, F, s, f), M = [Us, "" + F]);
          else if (st.hasOwnProperty(U))
            F != null && (typeof F != "function" && gh(U, F), U === "onScroll" && Cn("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof p == "boolean") {
            var ue = void 0, Me = p && Ue ? null : _r(U);
            if (a[Oo] !== !0) {
              if (!(U === hh || U === Oo || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              U === "value" || U === "checked" || U === "selected")) {
                if (U === Jd) {
                  var be = e.innerHTML, wt = F ? F[mh] : void 0;
                  if (wt != null) {
                    var gt = H0(e, wt);
                    gt !== be && ep(U, be, gt);
                  }
                } else if (U === As) {
                  if (v.delete(U), F0) {
                    var D = Zm(F);
                    ue = e.getAttribute("style"), D !== ue && ep(U, ue, D);
                  }
                } else if (p && !Ue)
                  v.delete(U.toLowerCase()), ue = pi(e, U, F), F !== ue && ep(U, ue, F);
                else if (!yn(U, Me, p) && !Yt(U, F, Me, p)) {
                  var H = !1;
                  if (Me !== null)
                    v.delete(Me.attributeName), ue = ha(e, U, F, Me);
                  else {
                    var O = i;
                    if (O === Fi && (O = ac(t)), O === Fi)
                      v.delete(U.toLowerCase());
                    else {
                      var G = GR(U);
                      G !== null && G !== U && (H = !0, v.delete(G)), v.delete(U);
                    }
                    ue = pi(e, U, F);
                  }
                  var pe = Ue;
                  !pe && F !== ue && !H && ep(U, ue, F);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      v.size > 0 && a[Oo] !== !0 && j0(v), t) {
        case "input":
          Ma(e), K(e, a, !0);
          break;
        case "textarea":
          Ma(e), ev(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && Ch(e);
          break;
      }
      return M;
    }
    function KR(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function Ly(e, t) {
      {
        if (Wa)
          return;
        Wa = !0, S("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function My(e, t) {
      {
        if (Wa)
          return;
        Wa = !0, S('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function Ny(e, t, a) {
      {
        if (Wa)
          return;
        Wa = !0, S("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function zy(e, t) {
      {
        if (t === "" || Wa)
          return;
        Wa = !0, S('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function XR(e, t, a) {
      switch (t) {
        case "input":
          je(e, a);
          return;
        case "textarea":
          Kf(e, a);
          return;
        case "select":
          Ym(e, a);
          return;
      }
    }
    var tp = function() {
    }, np = function() {
    };
    {
      var ZR = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], P0 = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], JR = P0.concat(["button"]), eT = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], B0 = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      np = function(e, t) {
        var a = ut({}, e || B0), i = {
          tag: t
        };
        return P0.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), JR.indexOf(t) !== -1 && (a.pTagInButtonScope = null), ZR.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var tT = function(e, t) {
        switch (t) {
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          case "option":
            return e === "#text";
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          case "colgroup":
            return e === "col" || e === "template";
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return eT.indexOf(t) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return t == null;
        }
        return !0;
      }, nT = function(e, t) {
        switch (e) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, $0 = {};
      tp = function(e, t, a) {
        a = a || B0;
        var i = a.current, u = i && i.tag;
        t != null && (e != null && S("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = tT(e, u) ? null : i, f = s ? null : nT(e, a), p = s || f;
        if (p) {
          var v = p.tag, y = !!s + "|" + e + "|" + v;
          if (!$0[y]) {
            $0[y] = !0;
            var g = e, b = "";
            if (e === "#text" ? /\S/.test(t) ? g = "Text nodes" : (g = "Whitespace text nodes", b = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : g = "<" + e + ">", s) {
              var x = "";
              v === "table" && e === "tr" && (x += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), S("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", g, v, b, x);
            } else
              S("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", g, v);
          }
        }
      };
    }
    var Rh = "suppressHydrationWarning", Th = "$", xh = "/$", rp = "$?", ap = "$!", rT = "style", Uy = null, Ay = null;
    function aT(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case ii:
        case Xl: {
          t = i === ii ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : Zf(null, "");
          break;
        }
        default: {
          var s = i === jn ? e.parentNode : e, f = s.namespaceURI || null;
          t = s.tagName, a = Zf(f, t);
          break;
        }
      }
      {
        var p = t.toLowerCase(), v = np(null, p);
        return {
          namespace: a,
          ancestorInfo: v
        };
      }
    }
    function iT(e, t, a) {
      {
        var i = e, u = Zf(i.namespace, t), s = np(i.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: s
        };
      }
    }
    function xk(e) {
      return e;
    }
    function lT(e) {
      Uy = To(), Ay = ER();
      var t = null;
      return ua(!1), t;
    }
    function uT(e) {
      CR(Ay), ua(Uy), Uy = null, Ay = null;
    }
    function oT(e, t, a, i, u) {
      var s;
      {
        var f = i;
        if (tp(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var p = "" + t.children, v = np(f.ancestorInfo, e);
          tp(null, p, v);
        }
        s = f.namespace;
      }
      var y = $R(e, t, a, s);
      return up(u, y), Iy(y, t), y;
    }
    function sT(e, t) {
      e.appendChild(t);
    }
    function cT(e, t, a, i, u) {
      switch (YR(e, t, a, i), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!a.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function fT(e, t, a, i, u, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var p = "" + i.children, v = np(f.ancestorInfo, t);
          tp(null, p, v);
        }
      }
      return QR(e, t, a, i);
    }
    function jy(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function dT(e, t, a, i) {
      {
        var u = a;
        tp(null, e, u.ancestorInfo);
      }
      var s = IR(e, t);
      return up(i, s), s;
    }
    function pT() {
      var e = window.event;
      return e === void 0 ? Ri : Jc(e.type);
    }
    var Fy = typeof setTimeout == "function" ? setTimeout : void 0, vT = typeof clearTimeout == "function" ? clearTimeout : void 0, Hy = -1, I0 = typeof Promise == "function" ? Promise : void 0, hT = typeof queueMicrotask == "function" ? queueMicrotask : typeof I0 < "u" ? function(e) {
      return I0.resolve(null).then(e).catch(mT);
    } : Fy;
    function mT(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function yT(e, t, a, i) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          return;
        case "img": {
          a.src && (e.src = a.src);
          return;
        }
      }
    }
    function gT(e, t, a, i, u, s) {
      WR(e, t, a, i, u), Iy(e, u);
    }
    function Y0(e) {
      lc(e, "");
    }
    function ST(e, t, a) {
      e.nodeValue = a;
    }
    function ET(e, t) {
      e.appendChild(t);
    }
    function CT(e, t) {
      var a;
      e.nodeType === jn ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && Ch(a);
    }
    function RT(e, t, a) {
      e.insertBefore(t, a);
    }
    function TT(e, t, a) {
      e.nodeType === jn ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function xT(e, t) {
      e.removeChild(t);
    }
    function wT(e, t) {
      e.nodeType === jn ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function Vy(e, t) {
      var a = t, i = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === jn) {
          var s = u.data;
          if (s === xh)
            if (i === 0) {
              e.removeChild(u), bn(t);
              return;
            } else
              i--;
          else
            (s === Th || s === rp || s === ap) && i++;
        }
        a = u;
      } while (a);
      bn(t);
    }
    function bT(e, t) {
      e.nodeType === jn ? Vy(e.parentNode, t) : e.nodeType === Xr && Vy(e, t), bn(e);
    }
    function _T(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function kT(e) {
      e.nodeValue = "";
    }
    function DT(e, t) {
      e = e;
      var a = t[rT], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = uc("display", i);
    }
    function OT(e, t) {
      e.nodeValue = t;
    }
    function LT(e) {
      e.nodeType === Xr ? e.textContent = "" : e.nodeType === ii && e.documentElement && e.removeChild(e.documentElement);
    }
    function MT(e, t, a) {
      return e.nodeType !== Xr || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function NT(e, t) {
      return t === "" || e.nodeType !== Hi ? null : e;
    }
    function zT(e) {
      return e.nodeType !== jn ? null : e;
    }
    function Q0(e) {
      return e.data === rp;
    }
    function Py(e) {
      return e.data === ap;
    }
    function UT(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, u;
      return t && (a = t.dgst, i = t.msg, u = t.stck), {
        message: i,
        digest: a,
        stack: u
      };
    }
    function AT(e, t) {
      e._reactRetry = t;
    }
    function wh(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Xr || t === Hi)
          break;
        if (t === jn) {
          var a = e.data;
          if (a === Th || a === ap || a === rp)
            break;
          if (a === xh)
            return null;
        }
      }
      return e;
    }
    function ip(e) {
      return wh(e.nextSibling);
    }
    function jT(e) {
      return wh(e.firstChild);
    }
    function FT(e) {
      return wh(e.firstChild);
    }
    function HT(e) {
      return wh(e.nextSibling);
    }
    function VT(e, t, a, i, u, s, f) {
      up(s, e), Iy(e, a);
      var p;
      {
        var v = u;
        p = v.namespace;
      }
      var y = (s.mode & we) !== Re;
      return qR(e, t, a, p, i, y, f);
    }
    function PT(e, t, a, i) {
      return up(a, e), a.mode & we, KR(e, t);
    }
    function BT(e, t) {
      up(t, e);
    }
    function $T(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === jn) {
          var i = t.data;
          if (i === xh) {
            if (a === 0)
              return ip(t);
            a--;
          } else
            (i === Th || i === ap || i === rp) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function W0(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === jn) {
          var i = t.data;
          if (i === Th || i === ap || i === rp) {
            if (a === 0)
              return t;
            a--;
          } else
            i === xh && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function IT(e) {
      bn(e);
    }
    function YT(e) {
      bn(e);
    }
    function QT(e) {
      return e !== "head" && e !== "body";
    }
    function WT(e, t, a, i) {
      var u = !0;
      Eh(t.nodeValue, a, i, u);
    }
    function GT(e, t, a, i, u, s) {
      if (t[Rh] !== !0) {
        var f = !0;
        Eh(i.nodeValue, u, s, f);
      }
    }
    function qT(e, t) {
      t.nodeType === Xr ? Ly(e, t) : t.nodeType === jn || My(e, t);
    }
    function KT(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === Xr ? Ly(a, t) : t.nodeType === jn || My(a, t));
      }
    }
    function XT(e, t, a, i, u) {
      (u || t[Rh] !== !0) && (i.nodeType === Xr ? Ly(a, i) : i.nodeType === jn || My(a, i));
    }
    function ZT(e, t, a) {
      Ny(e, t);
    }
    function JT(e, t) {
      zy(e, t);
    }
    function ex(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && Ny(i, t);
      }
    }
    function tx(e, t) {
      {
        var a = e.parentNode;
        a !== null && zy(a, t);
      }
    }
    function nx(e, t, a, i, u, s) {
      (s || t[Rh] !== !0) && Ny(a, i);
    }
    function rx(e, t, a, i, u) {
      (u || t[Rh] !== !0) && zy(a, i);
    }
    function ax(e) {
      S("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function ix(e) {
      Xd(e);
    }
    var gf = Math.random().toString(36).slice(2), Sf = "__reactFiber$" + gf, By = "__reactProps$" + gf, lp = "__reactContainer$" + gf, $y = "__reactEvents$" + gf, lx = "__reactListeners$" + gf, ux = "__reactHandles$" + gf;
    function ox(e) {
      delete e[Sf], delete e[By], delete e[$y], delete e[lx], delete e[ux];
    }
    function up(e, t) {
      t[Sf] = e;
    }
    function bh(e, t) {
      t[lp] = e;
    }
    function G0(e) {
      e[lp] = null;
    }
    function op(e) {
      return !!e[lp];
    }
    function js(e) {
      var t = e[Sf];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[lp] || a[Sf], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var u = W0(e); u !== null; ) {
              var s = u[Sf];
              if (s)
                return s;
              u = W0(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Lo(e) {
      var t = e[Sf] || e[lp];
      return t && (t.tag === le || t.tag === Ve || t.tag === Oe || t.tag === te) ? t : null;
    }
    function Ef(e) {
      if (e.tag === le || e.tag === Ve)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function _h(e) {
      return e[By] || null;
    }
    function Iy(e, t) {
      e[By] = t;
    }
    function sx(e) {
      var t = e[$y];
      return t === void 0 && (t = e[$y] = /* @__PURE__ */ new Set()), t;
    }
    var q0 = {}, K0 = A.ReactDebugCurrentFrame;
    function kh(e) {
      if (e) {
        var t = e._owner, a = yi(e.type, e._source, t ? t.type : null);
        K0.setExtraStackFrame(a);
      } else
        K0.setExtraStackFrame(null);
    }
    function Zi(e, t, a, i, u) {
      {
        var s = Function.call.bind(Gn);
        for (var f in e)
          if (s(e, f)) {
            var p = void 0;
            try {
              if (typeof e[f] != "function") {
                var v = Error((i || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              p = e[f](t, f, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (y) {
              p = y;
            }
            p && !(p instanceof Error) && (kh(u), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof p), kh(null)), p instanceof Error && !(p.message in q0) && (q0[p.message] = !0, kh(u), S("Failed %s type: %s", a, p.message), kh(null));
          }
      }
    }
    var Yy = [], Dh;
    Dh = [];
    var Cu = -1;
    function Mo(e) {
      return {
        current: e
      };
    }
    function oa(e, t) {
      if (Cu < 0) {
        S("Unexpected pop.");
        return;
      }
      t !== Dh[Cu] && S("Unexpected Fiber popped."), e.current = Yy[Cu], Yy[Cu] = null, Dh[Cu] = null, Cu--;
    }
    function sa(e, t, a) {
      Cu++, Yy[Cu] = e.current, Dh[Cu] = a, e.current = t;
    }
    var Qy;
    Qy = {};
    var si = {};
    Object.freeze(si);
    var Ru = Mo(si), jl = Mo(!1), Wy = si;
    function Cf(e, t, a) {
      return a && Fl(t) ? Wy : Ru.current;
    }
    function X0(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Rf(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return si;
        var u = e.stateNode;
        if (u && u.__reactInternalMemoizedUnmaskedChildContext === t)
          return u.__reactInternalMemoizedMaskedChildContext;
        var s = {};
        for (var f in i)
          s[f] = t[f];
        {
          var p = We(e) || "Unknown";
          Zi(i, s, "context", p);
        }
        return u && X0(e, t, s), s;
      }
    }
    function Oh() {
      return jl.current;
    }
    function Fl(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function Lh(e) {
      oa(jl, e), oa(Ru, e);
    }
    function Gy(e) {
      oa(jl, e), oa(Ru, e);
    }
    function Z0(e, t, a) {
      {
        if (Ru.current !== si)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        sa(Ru, t, e), sa(jl, a, e);
      }
    }
    function J0(e, t, a) {
      {
        var i = e.stateNode, u = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var s = We(e) || "Unknown";
            Qy[s] || (Qy[s] = !0, S("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", s, s));
          }
          return a;
        }
        var f = i.getChildContext();
        for (var p in f)
          if (!(p in u))
            throw new Error((We(e) || "Unknown") + '.getChildContext(): key "' + p + '" is not defined in childContextTypes.');
        {
          var v = We(e) || "Unknown";
          Zi(u, f, "child context", v);
        }
        return ut({}, a, f);
      }
    }
    function Mh(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || si;
        return Wy = Ru.current, sa(Ru, a, e), sa(jl, jl.current, e), !0;
      }
    }
    function eE(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = J0(e, t, Wy);
          i.__reactInternalMemoizedMergedChildContext = u, oa(jl, e), oa(Ru, e), sa(Ru, u, e), sa(jl, a, e);
        } else
          oa(jl, e), sa(jl, a, e);
      }
    }
    function cx(e) {
      {
        if (!gd(e) || e.tag !== oe)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case te:
              return t.stateNode.context;
            case oe: {
              var a = t.type;
              if (Fl(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var No = 0, Nh = 1, Tu = null, qy = !1, Ky = !1;
    function tE(e) {
      Tu === null ? Tu = [e] : Tu.push(e);
    }
    function fx(e) {
      qy = !0, tE(e);
    }
    function nE() {
      qy && zo();
    }
    function zo() {
      if (!Ky && Tu !== null) {
        Ky = !0;
        var e = 0, t = Ba();
        try {
          var a = !0, i = Tu;
          for (wn(Mn); e < i.length; e++) {
            var u = i[e];
            do
              u = u(a);
            while (u !== null);
          }
          Tu = null, qy = !1;
        } catch (s) {
          throw Tu !== null && (Tu = Tu.slice(e + 1)), gc(Ec, zo), s;
        } finally {
          wn(t), Ky = !1;
        }
      }
      return null;
    }
    var Tf = [], xf = 0, zh = null, Uh = 0, bi = [], _i = 0, Fs = null, xu = 1, wu = "";
    function dx(e) {
      return Vs(), (e.flags & hd) !== Le;
    }
    function px(e) {
      return Vs(), Uh;
    }
    function vx() {
      var e = wu, t = xu, a = t & ~hx(t);
      return a.toString(32) + e;
    }
    function Hs(e, t) {
      Vs(), Tf[xf++] = Uh, Tf[xf++] = zh, zh = e, Uh = t;
    }
    function rE(e, t, a) {
      Vs(), bi[_i++] = xu, bi[_i++] = wu, bi[_i++] = Fs, Fs = e;
      var i = xu, u = wu, s = Ah(i) - 1, f = i & ~(1 << s), p = a + 1, v = Ah(t) + s;
      if (v > 30) {
        var y = s - s % 5, g = (1 << y) - 1, b = (f & g).toString(32), x = f >> y, M = s - y, U = Ah(t) + M, F = p << M, ue = F | x, Me = b + u;
        xu = 1 << U | ue, wu = Me;
      } else {
        var be = p << s, wt = be | f, gt = u;
        xu = 1 << v | wt, wu = gt;
      }
    }
    function Xy(e) {
      Vs();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        Hs(e, a), rE(e, a, i);
      }
    }
    function Ah(e) {
      return 32 - io(e);
    }
    function hx(e) {
      return 1 << Ah(e) - 1;
    }
    function Zy(e) {
      for (; e === zh; )
        zh = Tf[--xf], Tf[xf] = null, Uh = Tf[--xf], Tf[xf] = null;
      for (; e === Fs; )
        Fs = bi[--_i], bi[_i] = null, wu = bi[--_i], bi[_i] = null, xu = bi[--_i], bi[_i] = null;
    }
    function mx() {
      return Vs(), Fs !== null ? {
        id: xu,
        overflow: wu
      } : null;
    }
    function yx(e, t) {
      Vs(), bi[_i++] = xu, bi[_i++] = wu, bi[_i++] = Fs, xu = t.id, wu = t.overflow, Fs = e;
    }
    function Vs() {
      Ur() || S("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var zr = null, ki = null, Ji = !1, Ps = !1, Uo = null;
    function gx() {
      Ji && S("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function aE() {
      Ps = !0;
    }
    function Sx() {
      return Ps;
    }
    function Ex(e) {
      var t = e.stateNode.containerInfo;
      return ki = FT(t), zr = e, Ji = !0, Uo = null, Ps = !1, !0;
    }
    function Cx(e, t, a) {
      return ki = HT(t), zr = e, Ji = !0, Uo = null, Ps = !1, a !== null && yx(e, a), !0;
    }
    function iE(e, t) {
      switch (e.tag) {
        case te: {
          qT(e.stateNode.containerInfo, t);
          break;
        }
        case le: {
          var a = (e.mode & we) !== Re;
          XT(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case Oe: {
          var i = e.memoizedState;
          i.dehydrated !== null && KT(i.dehydrated, t);
          break;
        }
      }
    }
    function lE(e, t) {
      iE(e, t);
      var a = w_();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= jt) : i.push(a);
    }
    function Jy(e, t) {
      {
        if (Ps)
          return;
        switch (e.tag) {
          case te: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case le:
                var i = t.type;
                t.pendingProps, ZT(a, i);
                break;
              case Ve:
                var u = t.pendingProps;
                JT(a, u);
                break;
            }
            break;
          }
          case le: {
            var s = e.type, f = e.memoizedProps, p = e.stateNode;
            switch (t.tag) {
              case le: {
                var v = t.type, y = t.pendingProps, g = (e.mode & we) !== Re;
                nx(
                  s,
                  f,
                  p,
                  v,
                  y,
                  // TODO: Delete this argument when we remove the legacy root API.
                  g
                );
                break;
              }
              case Ve: {
                var b = t.pendingProps, x = (e.mode & we) !== Re;
                rx(
                  s,
                  f,
                  p,
                  b,
                  // TODO: Delete this argument when we remove the legacy root API.
                  x
                );
                break;
              }
            }
            break;
          }
          case Oe: {
            var M = e.memoizedState, U = M.dehydrated;
            if (U !== null)
              switch (t.tag) {
                case le:
                  var F = t.type;
                  t.pendingProps, ex(U, F);
                  break;
                case Ve:
                  var ue = t.pendingProps;
                  tx(U, ue);
                  break;
              }
            break;
          }
          default:
            return;
        }
      }
    }
    function uE(e, t) {
      t.flags = t.flags & ~Aa | un, Jy(e, t);
    }
    function oE(e, t) {
      switch (e.tag) {
        case le: {
          var a = e.type;
          e.pendingProps;
          var i = MT(t, a);
          return i !== null ? (e.stateNode = i, zr = e, ki = jT(i), !0) : !1;
        }
        case Ve: {
          var u = e.pendingProps, s = NT(t, u);
          return s !== null ? (e.stateNode = s, zr = e, ki = null, !0) : !1;
        }
        case Oe: {
          var f = zT(t);
          if (f !== null) {
            var p = {
              dehydrated: f,
              treeContext: mx(),
              retryLane: Tr
            };
            e.memoizedState = p;
            var v = b_(f);
            return v.return = e, e.child = v, zr = e, ki = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function eg(e) {
      return (e.mode & we) !== Re && (e.flags & Ye) === Le;
    }
    function tg(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function ng(e) {
      if (Ji) {
        var t = ki;
        if (!t) {
          eg(e) && (Jy(zr, e), tg()), uE(zr, e), Ji = !1, zr = e;
          return;
        }
        var a = t;
        if (!oE(e, t)) {
          eg(e) && (Jy(zr, e), tg()), t = ip(a);
          var i = zr;
          if (!t || !oE(e, t)) {
            uE(zr, e), Ji = !1, zr = e;
            return;
          }
          lE(i, a);
        }
      }
    }
    function Rx(e, t, a) {
      var i = e.stateNode, u = !Ps, s = VT(i, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = s, s !== null;
    }
    function Tx(e) {
      var t = e.stateNode, a = e.memoizedProps, i = PT(t, a, e);
      if (i) {
        var u = zr;
        if (u !== null)
          switch (u.tag) {
            case te: {
              var s = u.stateNode.containerInfo, f = (u.mode & we) !== Re;
              WT(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case le: {
              var p = u.type, v = u.memoizedProps, y = u.stateNode, g = (u.mode & we) !== Re;
              GT(
                p,
                v,
                y,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                g
              );
              break;
            }
          }
      }
      return i;
    }
    function xx(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      BT(a, e);
    }
    function wx(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return $T(a);
    }
    function sE(e) {
      for (var t = e.return; t !== null && t.tag !== le && t.tag !== te && t.tag !== Oe; )
        t = t.return;
      zr = t;
    }
    function jh(e) {
      if (e !== zr)
        return !1;
      if (!Ji)
        return sE(e), Ji = !0, !1;
      if (e.tag !== te && (e.tag !== le || QT(e.type) && !jy(e.type, e.memoizedProps))) {
        var t = ki;
        if (t)
          if (eg(e))
            cE(e), tg();
          else
            for (; t; )
              lE(e, t), t = ip(t);
      }
      return sE(e), e.tag === Oe ? ki = wx(e) : ki = zr ? ip(e.stateNode) : null, !0;
    }
    function bx() {
      return Ji && ki !== null;
    }
    function cE(e) {
      for (var t = ki; t; )
        iE(e, t), t = ip(t);
    }
    function wf() {
      zr = null, ki = null, Ji = !1, Ps = !1;
    }
    function fE() {
      Uo !== null && (a1(Uo), Uo = null);
    }
    function Ur() {
      return Ji;
    }
    function rg(e) {
      Uo === null ? Uo = [e] : Uo.push(e);
    }
    var _x = A.ReactCurrentBatchConfig, kx = null;
    function Dx() {
      return _x.transition;
    }
    var el = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var Ox = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & vt && (t = a), a = a.return;
        return t;
      }, Bs = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, sp = [], cp = [], fp = [], dp = [], pp = [], vp = [], $s = /* @__PURE__ */ new Set();
      el.recordUnsafeLifecycleWarnings = function(e, t) {
        $s.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && sp.push(e), e.mode & vt && typeof t.UNSAFE_componentWillMount == "function" && cp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && fp.push(e), e.mode & vt && typeof t.UNSAFE_componentWillReceiveProps == "function" && dp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && pp.push(e), e.mode & vt && typeof t.UNSAFE_componentWillUpdate == "function" && vp.push(e));
      }, el.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        sp.length > 0 && (sp.forEach(function(x) {
          e.add(We(x) || "Component"), $s.add(x.type);
        }), sp = []);
        var t = /* @__PURE__ */ new Set();
        cp.length > 0 && (cp.forEach(function(x) {
          t.add(We(x) || "Component"), $s.add(x.type);
        }), cp = []);
        var a = /* @__PURE__ */ new Set();
        fp.length > 0 && (fp.forEach(function(x) {
          a.add(We(x) || "Component"), $s.add(x.type);
        }), fp = []);
        var i = /* @__PURE__ */ new Set();
        dp.length > 0 && (dp.forEach(function(x) {
          i.add(We(x) || "Component"), $s.add(x.type);
        }), dp = []);
        var u = /* @__PURE__ */ new Set();
        pp.length > 0 && (pp.forEach(function(x) {
          u.add(We(x) || "Component"), $s.add(x.type);
        }), pp = []);
        var s = /* @__PURE__ */ new Set();
        if (vp.length > 0 && (vp.forEach(function(x) {
          s.add(We(x) || "Component"), $s.add(x.type);
        }), vp = []), t.size > 0) {
          var f = Bs(t);
          S(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
        }
        if (i.size > 0) {
          var p = Bs(i);
          S(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, p);
        }
        if (s.size > 0) {
          var v = Bs(s);
          S(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, v);
        }
        if (e.size > 0) {
          var y = Bs(e);
          Ie(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, y);
        }
        if (a.size > 0) {
          var g = Bs(a);
          Ie(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, g);
        }
        if (u.size > 0) {
          var b = Bs(u);
          Ie(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, b);
        }
      };
      var Fh = /* @__PURE__ */ new Map(), dE = /* @__PURE__ */ new Set();
      el.recordLegacyContextWarning = function(e, t) {
        var a = Ox(e);
        if (a === null) {
          S("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!dE.has(e.type)) {
          var i = Fh.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], Fh.set(a, i)), i.push(e));
        }
      }, el.flushLegacyContextWarning = function() {
        Fh.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(We(s) || "Component"), dE.add(s.type);
            });
            var u = Bs(i);
            try {
              Bt(a), S(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              Tn();
            }
          }
        });
      }, el.discardPendingWarnings = function() {
        sp = [], cp = [], fp = [], dp = [], pp = [], vp = [], Fh = /* @__PURE__ */ new Map();
      };
    }
    var ag, ig, lg, ug, og, pE = function(e, t) {
    };
    ag = !1, ig = !1, lg = {}, ug = {}, og = {}, pE = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = We(t) || "Component";
        ug[a] || (ug[a] = !0, S('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function Lx(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function hp(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & vt || Be) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== oe) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !Lx(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = We(e) || "Component";
          lg[u] || (S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, i), lg[u] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var p = s;
            if (p.tag !== oe)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            f = p.stateNode;
          }
          if (!f)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var v = f;
          qn(i, "ref");
          var y = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === y)
            return t.ref;
          var g = function(b) {
            var x = v.refs;
            b === null ? delete x[y] : x[y] = b;
          };
          return g._stringRef = y, g;
        } else {
          if (typeof i != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + i + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return i;
    }
    function Hh(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function Vh(e) {
      {
        var t = We(e) || "Component";
        if (og[t])
          return;
        og[t] = !0, S("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function vE(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function hE(e) {
      function t(D, H) {
        if (e) {
          var O = D.deletions;
          O === null ? (D.deletions = [H], D.flags |= jt) : O.push(H);
        }
      }
      function a(D, H) {
        if (!e)
          return null;
        for (var O = H; O !== null; )
          t(D, O), O = O.sibling;
        return null;
      }
      function i(D, H) {
        for (var O = /* @__PURE__ */ new Map(), G = H; G !== null; )
          G.key !== null ? O.set(G.key, G) : O.set(G.index, G), G = G.sibling;
        return O;
      }
      function u(D, H) {
        var O = Zs(D, H);
        return O.index = 0, O.sibling = null, O;
      }
      function s(D, H, O) {
        if (D.index = O, !e)
          return D.flags |= hd, H;
        var G = D.alternate;
        if (G !== null) {
          var pe = G.index;
          return pe < H ? (D.flags |= un, H) : pe;
        } else
          return D.flags |= un, H;
      }
      function f(D) {
        return e && D.alternate === null && (D.flags |= un), D;
      }
      function p(D, H, O, G) {
        if (H === null || H.tag !== Ve) {
          var pe = r0(O, D.mode, G);
          return pe.return = D, pe;
        } else {
          var se = u(H, O);
          return se.return = D, se;
        }
      }
      function v(D, H, O, G) {
        var pe = O.type;
        if (pe === ya)
          return g(D, H, O.props.children, G, O.key);
        if (H !== null && (H.elementType === pe || // Keep this check inline so it only runs on the false path:
        E1(H, O) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof pe == "object" && pe !== null && pe.$$typeof === Ae && vE(pe) === H.type)) {
          var se = u(H, O.props);
          return se.ref = hp(D, H, O), se.return = D, se._debugSource = O._source, se._debugOwner = O._owner, se;
        }
        var $e = n0(O, D.mode, G);
        return $e.ref = hp(D, H, O), $e.return = D, $e;
      }
      function y(D, H, O, G) {
        if (H === null || H.tag !== ve || H.stateNode.containerInfo !== O.containerInfo || H.stateNode.implementation !== O.implementation) {
          var pe = a0(O, D.mode, G);
          return pe.return = D, pe;
        } else {
          var se = u(H, O.children || []);
          return se.return = D, se;
        }
      }
      function g(D, H, O, G, pe) {
        if (H === null || H.tag !== Ee) {
          var se = Qo(O, D.mode, G, pe);
          return se.return = D, se;
        } else {
          var $e = u(H, O);
          return $e.return = D, $e;
        }
      }
      function b(D, H, O) {
        if (typeof H == "string" && H !== "" || typeof H == "number") {
          var G = r0("" + H, D.mode, O);
          return G.return = D, G;
        }
        if (typeof H == "object" && H !== null) {
          switch (H.$$typeof) {
            case ti: {
              var pe = n0(H, D.mode, O);
              return pe.ref = hp(D, null, H), pe.return = D, pe;
            }
            case kr: {
              var se = a0(H, D.mode, O);
              return se.return = D, se;
            }
            case Ae: {
              var $e = H._payload, Ke = H._init;
              return b(D, Ke($e), O);
            }
          }
          if (Rt(H) || Dr(H)) {
            var qt = Qo(H, D.mode, O, null);
            return qt.return = D, qt;
          }
          Hh(D, H);
        }
        return typeof H == "function" && Vh(D), null;
      }
      function x(D, H, O, G) {
        var pe = H !== null ? H.key : null;
        if (typeof O == "string" && O !== "" || typeof O == "number")
          return pe !== null ? null : p(D, H, "" + O, G);
        if (typeof O == "object" && O !== null) {
          switch (O.$$typeof) {
            case ti:
              return O.key === pe ? v(D, H, O, G) : null;
            case kr:
              return O.key === pe ? y(D, H, O, G) : null;
            case Ae: {
              var se = O._payload, $e = O._init;
              return x(D, H, $e(se), G);
            }
          }
          if (Rt(O) || Dr(O))
            return pe !== null ? null : g(D, H, O, G, null);
          Hh(D, O);
        }
        return typeof O == "function" && Vh(D), null;
      }
      function M(D, H, O, G, pe) {
        if (typeof G == "string" && G !== "" || typeof G == "number") {
          var se = D.get(O) || null;
          return p(H, se, "" + G, pe);
        }
        if (typeof G == "object" && G !== null) {
          switch (G.$$typeof) {
            case ti: {
              var $e = D.get(G.key === null ? O : G.key) || null;
              return v(H, $e, G, pe);
            }
            case kr: {
              var Ke = D.get(G.key === null ? O : G.key) || null;
              return y(H, Ke, G, pe);
            }
            case Ae:
              var qt = G._payload, Mt = G._init;
              return M(D, H, O, Mt(qt), pe);
          }
          if (Rt(G) || Dr(G)) {
            var Wn = D.get(O) || null;
            return g(H, Wn, G, pe, null);
          }
          Hh(H, G);
        }
        return typeof G == "function" && Vh(H), null;
      }
      function U(D, H, O) {
        {
          if (typeof D != "object" || D === null)
            return H;
          switch (D.$$typeof) {
            case ti:
            case kr:
              pE(D, O);
              var G = D.key;
              if (typeof G != "string")
                break;
              if (H === null) {
                H = /* @__PURE__ */ new Set(), H.add(G);
                break;
              }
              if (!H.has(G)) {
                H.add(G);
                break;
              }
              S("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", G);
              break;
            case Ae:
              var pe = D._payload, se = D._init;
              U(se(pe), H, O);
              break;
          }
        }
        return H;
      }
      function F(D, H, O, G) {
        for (var pe = null, se = 0; se < O.length; se++) {
          var $e = O[se];
          pe = U($e, pe, D);
        }
        for (var Ke = null, qt = null, Mt = H, Wn = 0, Nt = 0, Vn = null; Mt !== null && Nt < O.length; Nt++) {
          Mt.index > Nt ? (Vn = Mt, Mt = null) : Vn = Mt.sibling;
          var fa = x(D, Mt, O[Nt], G);
          if (fa === null) {
            Mt === null && (Mt = Vn);
            break;
          }
          e && Mt && fa.alternate === null && t(D, Mt), Wn = s(fa, Wn, Nt), qt === null ? Ke = fa : qt.sibling = fa, qt = fa, Mt = Vn;
        }
        if (Nt === O.length) {
          if (a(D, Mt), Ur()) {
            var Br = Nt;
            Hs(D, Br);
          }
          return Ke;
        }
        if (Mt === null) {
          for (; Nt < O.length; Nt++) {
            var fi = b(D, O[Nt], G);
            fi !== null && (Wn = s(fi, Wn, Nt), qt === null ? Ke = fi : qt.sibling = fi, qt = fi);
          }
          if (Ur()) {
            var _a = Nt;
            Hs(D, _a);
          }
          return Ke;
        }
        for (var ka = i(D, Mt); Nt < O.length; Nt++) {
          var da = M(ka, D, Nt, O[Nt], G);
          da !== null && (e && da.alternate !== null && ka.delete(da.key === null ? Nt : da.key), Wn = s(da, Wn, Nt), qt === null ? Ke = da : qt.sibling = da, qt = da);
        }
        if (e && ka.forEach(function(If) {
          return t(D, If);
        }), Ur()) {
          var Mu = Nt;
          Hs(D, Mu);
        }
        return Ke;
      }
      function ue(D, H, O, G) {
        var pe = Dr(O);
        if (typeof pe != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          O[Symbol.toStringTag] === "Generator" && (ig || S("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), ig = !0), O.entries === pe && (ag || S("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), ag = !0);
          var se = pe.call(O);
          if (se)
            for (var $e = null, Ke = se.next(); !Ke.done; Ke = se.next()) {
              var qt = Ke.value;
              $e = U(qt, $e, D);
            }
        }
        var Mt = pe.call(O);
        if (Mt == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Wn = null, Nt = null, Vn = H, fa = 0, Br = 0, fi = null, _a = Mt.next(); Vn !== null && !_a.done; Br++, _a = Mt.next()) {
          Vn.index > Br ? (fi = Vn, Vn = null) : fi = Vn.sibling;
          var ka = x(D, Vn, _a.value, G);
          if (ka === null) {
            Vn === null && (Vn = fi);
            break;
          }
          e && Vn && ka.alternate === null && t(D, Vn), fa = s(ka, fa, Br), Nt === null ? Wn = ka : Nt.sibling = ka, Nt = ka, Vn = fi;
        }
        if (_a.done) {
          if (a(D, Vn), Ur()) {
            var da = Br;
            Hs(D, da);
          }
          return Wn;
        }
        if (Vn === null) {
          for (; !_a.done; Br++, _a = Mt.next()) {
            var Mu = b(D, _a.value, G);
            Mu !== null && (fa = s(Mu, fa, Br), Nt === null ? Wn = Mu : Nt.sibling = Mu, Nt = Mu);
          }
          if (Ur()) {
            var If = Br;
            Hs(D, If);
          }
          return Wn;
        }
        for (var Wp = i(D, Vn); !_a.done; Br++, _a = Mt.next()) {
          var Ql = M(Wp, D, Br, _a.value, G);
          Ql !== null && (e && Ql.alternate !== null && Wp.delete(Ql.key === null ? Br : Ql.key), fa = s(Ql, fa, Br), Nt === null ? Wn = Ql : Nt.sibling = Ql, Nt = Ql);
        }
        if (e && Wp.forEach(function(rk) {
          return t(D, rk);
        }), Ur()) {
          var nk = Br;
          Hs(D, nk);
        }
        return Wn;
      }
      function Me(D, H, O, G) {
        if (H !== null && H.tag === Ve) {
          a(D, H.sibling);
          var pe = u(H, O);
          return pe.return = D, pe;
        }
        a(D, H);
        var se = r0(O, D.mode, G);
        return se.return = D, se;
      }
      function be(D, H, O, G) {
        for (var pe = O.key, se = H; se !== null; ) {
          if (se.key === pe) {
            var $e = O.type;
            if ($e === ya) {
              if (se.tag === Ee) {
                a(D, se.sibling);
                var Ke = u(se, O.props.children);
                return Ke.return = D, Ke._debugSource = O._source, Ke._debugOwner = O._owner, Ke;
              }
            } else if (se.elementType === $e || // Keep this check inline so it only runs on the false path:
            E1(se, O) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof $e == "object" && $e !== null && $e.$$typeof === Ae && vE($e) === se.type) {
              a(D, se.sibling);
              var qt = u(se, O.props);
              return qt.ref = hp(D, se, O), qt.return = D, qt._debugSource = O._source, qt._debugOwner = O._owner, qt;
            }
            a(D, se);
            break;
          } else
            t(D, se);
          se = se.sibling;
        }
        if (O.type === ya) {
          var Mt = Qo(O.props.children, D.mode, G, O.key);
          return Mt.return = D, Mt;
        } else {
          var Wn = n0(O, D.mode, G);
          return Wn.ref = hp(D, H, O), Wn.return = D, Wn;
        }
      }
      function wt(D, H, O, G) {
        for (var pe = O.key, se = H; se !== null; ) {
          if (se.key === pe)
            if (se.tag === ve && se.stateNode.containerInfo === O.containerInfo && se.stateNode.implementation === O.implementation) {
              a(D, se.sibling);
              var $e = u(se, O.children || []);
              return $e.return = D, $e;
            } else {
              a(D, se);
              break;
            }
          else
            t(D, se);
          se = se.sibling;
        }
        var Ke = a0(O, D.mode, G);
        return Ke.return = D, Ke;
      }
      function gt(D, H, O, G) {
        var pe = typeof O == "object" && O !== null && O.type === ya && O.key === null;
        if (pe && (O = O.props.children), typeof O == "object" && O !== null) {
          switch (O.$$typeof) {
            case ti:
              return f(be(D, H, O, G));
            case kr:
              return f(wt(D, H, O, G));
            case Ae:
              var se = O._payload, $e = O._init;
              return gt(D, H, $e(se), G);
          }
          if (Rt(O))
            return F(D, H, O, G);
          if (Dr(O))
            return ue(D, H, O, G);
          Hh(D, O);
        }
        return typeof O == "string" && O !== "" || typeof O == "number" ? f(Me(D, H, "" + O, G)) : (typeof O == "function" && Vh(D), a(D, H));
      }
      return gt;
    }
    var bf = hE(!0), mE = hE(!1);
    function Mx(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = Zs(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = Zs(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function Nx(e, t) {
      for (var a = e.child; a !== null; )
        E_(a, t), a = a.sibling;
    }
    var sg = Mo(null), cg;
    cg = {};
    var Ph = null, _f = null, fg = null, Bh = !1;
    function $h() {
      Ph = null, _f = null, fg = null, Bh = !1;
    }
    function yE() {
      Bh = !0;
    }
    function gE() {
      Bh = !1;
    }
    function SE(e, t, a) {
      sa(sg, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== cg && S("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = cg;
    }
    function dg(e, t) {
      var a = sg.current;
      oa(sg, t), e._currentValue = a;
    }
    function pg(e, t, a) {
      for (var i = e; i !== null; ) {
        var u = i.alternate;
        if (pu(i.childLanes, t) ? u !== null && !pu(u.childLanes, t) && (u.childLanes = Je(u.childLanes, t)) : (i.childLanes = Je(i.childLanes, t), u !== null && (u.childLanes = Je(u.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && S("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function zx(e, t, a) {
      Ux(e, t, a);
    }
    function Ux(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var u = void 0, s = i.dependencies;
        if (s !== null) {
          u = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === oe) {
                var p = po(a), v = bu(nn, p);
                v.tag = Yh;
                var y = i.updateQueue;
                if (y !== null) {
                  var g = y.shared, b = g.pending;
                  b === null ? v.next = v : (v.next = b.next, b.next = v), g.pending = v;
                }
              }
              i.lanes = Je(i.lanes, a);
              var x = i.alternate;
              x !== null && (x.lanes = Je(x.lanes, a)), pg(i.return, a, e), s.lanes = Je(s.lanes, a);
              break;
            }
            f = f.next;
          }
        } else if (i.tag === nt)
          u = i.type === e.type ? null : i.child;
        else if (i.tag === Wt) {
          var M = i.return;
          if (M === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          M.lanes = Je(M.lanes, a);
          var U = M.alternate;
          U !== null && (U.lanes = Je(U.lanes, a)), pg(M, a, e), u = i.sibling;
        } else
          u = i.child;
        if (u !== null)
          u.return = i;
        else
          for (u = i; u !== null; ) {
            if (u === e) {
              u = null;
              break;
            }
            var F = u.sibling;
            if (F !== null) {
              F.return = u.return, u = F;
              break;
            }
            u = u.return;
          }
        i = u;
      }
    }
    function kf(e, t) {
      Ph = e, _f = null, fg = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (la(a.lanes, t) && Op(), a.firstContext = null);
      }
    }
    function rr(e) {
      Bh && S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (fg !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (_f === null) {
          if (Ph === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          _f = a, Ph.dependencies = {
            lanes: B,
            firstContext: a
          };
        } else
          _f = _f.next = a;
      }
      return t;
    }
    var Is = null;
    function vg(e) {
      Is === null ? Is = [e] : Is.push(e);
    }
    function Ax() {
      if (Is !== null) {
        for (var e = 0; e < Is.length; e++) {
          var t = Is[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var i = a.next, u = t.pending;
            if (u !== null) {
              var s = u.next;
              u.next = i, a.next = s;
            }
            t.pending = a;
          }
        }
        Is = null;
      }
    }
    function EE(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, vg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Ih(e, i);
    }
    function jx(e, t, a, i) {
      var u = t.interleaved;
      u === null ? (a.next = a, vg(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function Fx(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, vg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Ih(e, i);
    }
    function Ga(e, t) {
      return Ih(e, t);
    }
    var Hx = Ih;
    function Ih(e, t) {
      e.lanes = Je(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = Je(a.lanes, t)), a === null && (e.flags & (un | Aa)) !== Le && m1(e);
      for (var i = e, u = e.return; u !== null; )
        u.childLanes = Je(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = Je(a.childLanes, t) : (u.flags & (un | Aa)) !== Le && m1(e), i = u, u = u.return;
      if (i.tag === te) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var CE = 0, RE = 1, Yh = 2, hg = 3, Qh = !1, mg, Wh;
    mg = !1, Wh = null;
    function yg(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: B
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function TE(e, t) {
      var a = t.updateQueue, i = e.updateQueue;
      if (a === i) {
        var u = {
          baseState: i.baseState,
          firstBaseUpdate: i.firstBaseUpdate,
          lastBaseUpdate: i.lastBaseUpdate,
          shared: i.shared,
          effects: i.effects
        };
        t.updateQueue = u;
      }
    }
    function bu(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: CE,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function Ao(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var u = i.shared;
      if (Wh === u && !mg && (S("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), mg = !0), jb()) {
        var s = u.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), u.pending = t, Hx(e, a);
      } else
        return Fx(e, u, t, a);
    }
    function Gh(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var u = i.shared;
        if (Od(a)) {
          var s = u.lanes;
          s = Ic(s, e.pendingLanes);
          var f = Je(s, a);
          u.lanes = f, Ld(e, f);
        }
      }
    }
    function gg(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var u = i.updateQueue;
        if (a === u) {
          var s = null, f = null, p = a.firstBaseUpdate;
          if (p !== null) {
            var v = p;
            do {
              var y = {
                eventTime: v.eventTime,
                lane: v.lane,
                tag: v.tag,
                payload: v.payload,
                callback: v.callback,
                next: null
              };
              f === null ? s = f = y : (f.next = y, f = y), v = v.next;
            } while (v !== null);
            f === null ? s = f = t : (f.next = t, f = t);
          } else
            s = f = t;
          a = {
            baseState: u.baseState,
            firstBaseUpdate: s,
            lastBaseUpdate: f,
            shared: u.shared,
            effects: u.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var g = a.lastBaseUpdate;
      g === null ? a.firstBaseUpdate = t : g.next = t, a.lastBaseUpdate = t;
    }
    function Vx(e, t, a, i, u, s) {
      switch (a.tag) {
        case RE: {
          var f = a.payload;
          if (typeof f == "function") {
            yE();
            var p = f.call(s, i, u);
            {
              if (e.mode & vt) {
                Fn(!0);
                try {
                  f.call(s, i, u);
                } finally {
                  Fn(!1);
                }
              }
              gE();
            }
            return p;
          }
          return f;
        }
        case hg:
          e.flags = e.flags & ~Jn | Ye;
        case CE: {
          var v = a.payload, y;
          if (typeof v == "function") {
            yE(), y = v.call(s, i, u);
            {
              if (e.mode & vt) {
                Fn(!0);
                try {
                  v.call(s, i, u);
                } finally {
                  Fn(!1);
                }
              }
              gE();
            }
          } else
            y = v;
          return y == null ? i : ut({}, i, y);
        }
        case Yh:
          return Qh = !0, i;
      }
      return i;
    }
    function qh(e, t, a, i) {
      var u = e.updateQueue;
      Qh = !1, Wh = u.shared;
      var s = u.firstBaseUpdate, f = u.lastBaseUpdate, p = u.shared.pending;
      if (p !== null) {
        u.shared.pending = null;
        var v = p, y = v.next;
        v.next = null, f === null ? s = y : f.next = y, f = v;
        var g = e.alternate;
        if (g !== null) {
          var b = g.updateQueue, x = b.lastBaseUpdate;
          x !== f && (x === null ? b.firstBaseUpdate = y : x.next = y, b.lastBaseUpdate = v);
        }
      }
      if (s !== null) {
        var M = u.baseState, U = B, F = null, ue = null, Me = null, be = s;
        do {
          var wt = be.lane, gt = be.eventTime;
          if (pu(i, wt)) {
            if (Me !== null) {
              var H = {
                eventTime: gt,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Hn,
                tag: be.tag,
                payload: be.payload,
                callback: be.callback,
                next: null
              };
              Me = Me.next = H;
            }
            M = Vx(e, u, be, M, t, a);
            var O = be.callback;
            if (O !== null && // If the update was already committed, we should not queue its
            // callback again.
            be.lane !== Hn) {
              e.flags |= Ei;
              var G = u.effects;
              G === null ? u.effects = [be] : G.push(be);
            }
          } else {
            var D = {
              eventTime: gt,
              lane: wt,
              tag: be.tag,
              payload: be.payload,
              callback: be.callback,
              next: null
            };
            Me === null ? (ue = Me = D, F = M) : Me = Me.next = D, U = Je(U, wt);
          }
          if (be = be.next, be === null) {
            if (p = u.shared.pending, p === null)
              break;
            var pe = p, se = pe.next;
            pe.next = null, be = se, u.lastBaseUpdate = pe, u.shared.pending = null;
          }
        } while (!0);
        Me === null && (F = M), u.baseState = F, u.firstBaseUpdate = ue, u.lastBaseUpdate = Me;
        var $e = u.shared.interleaved;
        if ($e !== null) {
          var Ke = $e;
          do
            U = Je(U, Ke.lane), Ke = Ke.next;
          while (Ke !== $e);
        } else
          s === null && (u.shared.lanes = B);
        Bp(U), e.lanes = U, e.memoizedState = M;
      }
      Wh = null;
    }
    function Px(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function xE() {
      Qh = !1;
    }
    function Kh() {
      return Qh;
    }
    function wE(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u], f = s.callback;
          f !== null && (s.callback = null, Px(f, a));
        }
    }
    var mp = {}, jo = Mo(mp), yp = Mo(mp), Xh = Mo(mp);
    function Zh(e) {
      if (e === mp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function bE() {
      var e = Zh(Xh.current);
      return e;
    }
    function Sg(e, t) {
      sa(Xh, t, e), sa(yp, e, e), sa(jo, mp, e);
      var a = aT(t);
      oa(jo, e), sa(jo, a, e);
    }
    function Df(e) {
      oa(jo, e), oa(yp, e), oa(Xh, e);
    }
    function Eg() {
      var e = Zh(jo.current);
      return e;
    }
    function _E(e) {
      Zh(Xh.current);
      var t = Zh(jo.current), a = iT(t, e.type);
      t !== a && (sa(yp, e, e), sa(jo, a, e));
    }
    function Cg(e) {
      yp.current === e && (oa(jo, e), oa(yp, e));
    }
    var Bx = 0, kE = 1, DE = 1, gp = 2, tl = Mo(Bx);
    function Rg(e, t) {
      return (e & t) !== 0;
    }
    function Of(e) {
      return e & kE;
    }
    function Tg(e, t) {
      return e & kE | t;
    }
    function $x(e, t) {
      return e | t;
    }
    function Fo(e, t) {
      sa(tl, t, e);
    }
    function Lf(e) {
      oa(tl, e);
    }
    function Ix(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Jh(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === Oe) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || Q0(i) || Py(i))
              return t;
          }
        } else if (t.tag === kt && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var u = (t.flags & Ye) !== Le;
          if (u)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var qa = (
      /*   */
      0
    ), or = (
      /* */
      1
    ), Hl = (
      /*  */
      2
    ), sr = (
      /*    */
      4
    ), Ar = (
      /*   */
      8
    ), xg = [];
    function wg() {
      for (var e = 0; e < xg.length; e++) {
        var t = xg[e];
        t._workInProgressVersionPrimary = null;
      }
      xg.length = 0;
    }
    function Yx(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var fe = A.ReactCurrentDispatcher, Sp = A.ReactCurrentBatchConfig, bg, Mf;
    bg = /* @__PURE__ */ new Set();
    var Ys = B, Gt = null, cr = null, fr = null, em = !1, Ep = !1, Cp = 0, Qx = 0, Wx = 25, P = null, Di = null, Ho = -1, _g = !1;
    function It() {
      {
        var e = P;
        Di === null ? Di = [e] : Di.push(e);
      }
    }
    function re() {
      {
        var e = P;
        Di !== null && (Ho++, Di[Ho] !== e && Gx(e));
      }
    }
    function Nf(e) {
      e != null && !Rt(e) && S("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", P, typeof e);
    }
    function Gx(e) {
      {
        var t = We(Gt);
        if (!bg.has(t) && (bg.add(t), Di !== null)) {
          for (var a = "", i = 30, u = 0; u <= Ho; u++) {
            for (var s = Di[u], f = u === Ho ? e : s, p = u + 1 + ". " + s; p.length < i; )
              p += " ";
            p += f + `
`, a += p;
          }
          S(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function ca() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function kg(e, t) {
      if (_g)
        return !1;
      if (t === null)
        return S("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", P), !1;
      e.length !== t.length && S(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, P, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!ge(e[a], t[a]))
          return !1;
      return !0;
    }
    function zf(e, t, a, i, u, s) {
      Ys = s, Gt = t, Di = e !== null ? e._debugHookTypes : null, Ho = -1, _g = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = B, e !== null && e.memoizedState !== null ? fe.current = XE : Di !== null ? fe.current = KE : fe.current = qE;
      var f = a(i, u);
      if (Ep) {
        var p = 0;
        do {
          if (Ep = !1, Cp = 0, p >= Wx)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          p += 1, _g = !1, cr = null, fr = null, t.updateQueue = null, Ho = -1, fe.current = ZE, f = a(i, u);
        } while (Ep);
      }
      fe.current = pm, t._debugHookTypes = Di;
      var v = cr !== null && cr.next !== null;
      if (Ys = B, Gt = null, cr = null, fr = null, P = null, Di = null, Ho = -1, e !== null && (e.flags & ir) !== (t.flags & ir) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & we) !== Re && S("Internal React error: Expected static flag was missing. Please notify the React team."), em = !1, v)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function Uf() {
      var e = Cp !== 0;
      return Cp = 0, e;
    }
    function OE(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & Ra) !== Re ? t.flags &= ~(au | ea | dn | tt) : t.flags &= ~(dn | tt), e.lanes = Rs(e.lanes, a);
    }
    function LE() {
      if (fe.current = pm, em) {
        for (var e = Gt.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        em = !1;
      }
      Ys = B, Gt = null, cr = null, fr = null, Di = null, Ho = -1, P = null, IE = !1, Ep = !1, Cp = 0;
    }
    function Vl() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return fr === null ? Gt.memoizedState = fr = e : fr = fr.next = e, fr;
    }
    function Oi() {
      var e;
      if (cr === null) {
        var t = Gt.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = cr.next;
      var a;
      if (fr === null ? a = Gt.memoizedState : a = fr.next, a !== null)
        fr = a, a = fr.next, cr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        cr = e;
        var i = {
          memoizedState: cr.memoizedState,
          baseState: cr.baseState,
          baseQueue: cr.baseQueue,
          queue: cr.queue,
          next: null
        };
        fr === null ? Gt.memoizedState = fr = i : fr = fr.next = i;
      }
      return fr;
    }
    function ME() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function Dg(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function Og(e, t, a) {
      var i = Vl(), u;
      a !== void 0 ? u = a(t) : u = t, i.memoizedState = i.baseState = u;
      var s = {
        pending: null,
        interleaved: null,
        lanes: B,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      };
      i.queue = s;
      var f = s.dispatch = Zx.bind(null, Gt, s);
      return [i.memoizedState, f];
    }
    function Lg(e, t, a) {
      var i = Oi(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = cr, f = s.baseQueue, p = u.pending;
      if (p !== null) {
        if (f !== null) {
          var v = f.next, y = p.next;
          f.next = y, p.next = v;
        }
        s.baseQueue !== f && S("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = p, u.pending = null;
      }
      if (f !== null) {
        var g = f.next, b = s.baseState, x = null, M = null, U = null, F = g;
        do {
          var ue = F.lane;
          if (pu(Ys, ue)) {
            if (U !== null) {
              var be = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Hn,
                action: F.action,
                hasEagerState: F.hasEagerState,
                eagerState: F.eagerState,
                next: null
              };
              U = U.next = be;
            }
            if (F.hasEagerState)
              b = F.eagerState;
            else {
              var wt = F.action;
              b = e(b, wt);
            }
          } else {
            var Me = {
              lane: ue,
              action: F.action,
              hasEagerState: F.hasEagerState,
              eagerState: F.eagerState,
              next: null
            };
            U === null ? (M = U = Me, x = b) : U = U.next = Me, Gt.lanes = Je(Gt.lanes, ue), Bp(ue);
          }
          F = F.next;
        } while (F !== null && F !== g);
        U === null ? x = b : U.next = M, ge(b, i.memoizedState) || Op(), i.memoizedState = b, i.baseState = x, i.baseQueue = U, u.lastRenderedState = b;
      }
      var gt = u.interleaved;
      if (gt !== null) {
        var D = gt;
        do {
          var H = D.lane;
          Gt.lanes = Je(Gt.lanes, H), Bp(H), D = D.next;
        } while (D !== gt);
      } else
        f === null && (u.lanes = B);
      var O = u.dispatch;
      return [i.memoizedState, O];
    }
    function Mg(e, t, a) {
      var i = Oi(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = u.dispatch, f = u.pending, p = i.memoizedState;
      if (f !== null) {
        u.pending = null;
        var v = f.next, y = v;
        do {
          var g = y.action;
          p = e(p, g), y = y.next;
        } while (y !== v);
        ge(p, i.memoizedState) || Op(), i.memoizedState = p, i.baseQueue === null && (i.baseState = p), u.lastRenderedState = p;
      }
      return [p, s];
    }
    function wk(e, t, a) {
    }
    function bk(e, t, a) {
    }
    function Ng(e, t, a) {
      var i = Gt, u = Vl(), s, f = Ur();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), Mf || s !== a() && (S("The result of getServerSnapshot should be cached to avoid an infinite loop"), Mf = !0);
      } else {
        if (s = t(), !Mf) {
          var p = t();
          ge(s, p) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Mf = !0);
        }
        var v = Mm();
        if (v === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Cs(v, Ys) || NE(i, t, s);
      }
      u.memoizedState = s;
      var y = {
        value: s,
        getSnapshot: t
      };
      return u.queue = y, im(UE.bind(null, i, y, e), [e]), i.flags |= dn, Rp(or | Ar, zE.bind(null, i, y, s, t), void 0, null), s;
    }
    function tm(e, t, a) {
      var i = Gt, u = Oi(), s = t();
      if (!Mf) {
        var f = t();
        ge(s, f) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Mf = !0);
      }
      var p = u.memoizedState, v = !ge(p, s);
      v && (u.memoizedState = s, Op());
      var y = u.queue;
      if (xp(UE.bind(null, i, y, e), [e]), y.getSnapshot !== t || v || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      fr !== null && fr.memoizedState.tag & or) {
        i.flags |= dn, Rp(or | Ar, zE.bind(null, i, y, s, t), void 0, null);
        var g = Mm();
        if (g === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Cs(g, Ys) || NE(i, t, s);
      }
      return s;
    }
    function NE(e, t, a) {
      e.flags |= fs;
      var i = {
        getSnapshot: t,
        value: a
      }, u = Gt.updateQueue;
      if (u === null)
        u = ME(), Gt.updateQueue = u, u.stores = [i];
      else {
        var s = u.stores;
        s === null ? u.stores = [i] : s.push(i);
      }
    }
    function zE(e, t, a, i) {
      t.value = a, t.getSnapshot = i, AE(t) && jE(e);
    }
    function UE(e, t, a) {
      var i = function() {
        AE(t) && jE(e);
      };
      return a(i);
    }
    function AE(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !ge(a, i);
      } catch {
        return !0;
      }
    }
    function jE(e) {
      var t = Ga(e, De);
      t !== null && hr(t, e, De, nn);
    }
    function nm(e) {
      var t = Vl();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: B,
        dispatch: null,
        lastRenderedReducer: Dg,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = Jx.bind(null, Gt, a);
      return [t.memoizedState, i];
    }
    function zg(e) {
      return Lg(Dg);
    }
    function Ug(e) {
      return Mg(Dg);
    }
    function Rp(e, t, a, i) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, s = Gt.updateQueue;
      if (s === null)
        s = ME(), Gt.updateQueue = s, s.lastEffect = u.next = u;
      else {
        var f = s.lastEffect;
        if (f === null)
          s.lastEffect = u.next = u;
        else {
          var p = f.next;
          f.next = u, u.next = p, s.lastEffect = u;
        }
      }
      return u;
    }
    function Ag(e) {
      var t = Vl();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function rm(e) {
      var t = Oi();
      return t.memoizedState;
    }
    function Tp(e, t, a, i) {
      var u = Vl(), s = i === void 0 ? null : i;
      Gt.flags |= e, u.memoizedState = Rp(or | t, a, void 0, s);
    }
    function am(e, t, a, i) {
      var u = Oi(), s = i === void 0 ? null : i, f = void 0;
      if (cr !== null) {
        var p = cr.memoizedState;
        if (f = p.destroy, s !== null) {
          var v = p.deps;
          if (kg(s, v)) {
            u.memoizedState = Rp(t, a, f, s);
            return;
          }
        }
      }
      Gt.flags |= e, u.memoizedState = Rp(or | t, a, f, s);
    }
    function im(e, t) {
      return (Gt.mode & Ra) !== Re ? Tp(au | dn | _l, Ar, e, t) : Tp(dn | _l, Ar, e, t);
    }
    function xp(e, t) {
      return am(dn, Ar, e, t);
    }
    function jg(e, t) {
      return Tp(tt, Hl, e, t);
    }
    function lm(e, t) {
      return am(tt, Hl, e, t);
    }
    function Fg(e, t) {
      var a = tt;
      return a |= Jr, (Gt.mode & Ra) !== Re && (a |= ea), Tp(a, sr, e, t);
    }
    function um(e, t) {
      return am(tt, sr, e, t);
    }
    function FE(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var u = t;
        u.hasOwnProperty("current") || S("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(u).join(", ") + "}");
        var s = e();
        return u.current = s, function() {
          u.current = null;
        };
      }
    }
    function Hg(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, u = tt;
      return u |= Jr, (Gt.mode & Ra) !== Re && (u |= ea), Tp(u, sr, FE.bind(null, t, e), i);
    }
    function om(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return am(tt, sr, FE.bind(null, t, e), i);
    }
    function qx(e, t) {
    }
    var sm = qx;
    function Vg(e, t) {
      var a = Vl(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function cm(e, t) {
      var a = Oi(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (kg(i, s))
          return u[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function Pg(e, t) {
      var a = Vl(), i = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, i], u;
    }
    function fm(e, t) {
      var a = Oi(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (kg(i, s))
          return u[0];
      }
      var f = e();
      return a.memoizedState = [f, i], f;
    }
    function Bg(e) {
      var t = Vl();
      return t.memoizedState = e, e;
    }
    function HE(e) {
      var t = Oi(), a = cr, i = a.memoizedState;
      return PE(t, i, e);
    }
    function VE(e) {
      var t = Oi();
      if (cr === null)
        return t.memoizedState = e, e;
      var a = cr.memoizedState;
      return PE(t, a, e);
    }
    function PE(e, t, a) {
      var i = !Pv(Ys);
      if (i) {
        if (!ge(a, t)) {
          var u = Iv();
          Gt.lanes = Je(Gt.lanes, u), Bp(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, Op()), e.memoizedState = a, a;
    }
    function Kx(e, t, a) {
      var i = Ba();
      wn(oy(i, Gi)), e(!0);
      var u = Sp.transition;
      Sp.transition = {};
      var s = Sp.transition;
      Sp.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (wn(i), Sp.transition = u, u === null && s._updatedFibers) {
          var f = s._updatedFibers.size;
          f > 10 && Ie("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function $g() {
      var e = nm(!1), t = e[0], a = e[1], i = Kx.bind(null, a), u = Vl();
      return u.memoizedState = i, [t, i];
    }
    function BE() {
      var e = zg(), t = e[0], a = Oi(), i = a.memoizedState;
      return [t, i];
    }
    function $E() {
      var e = Ug(), t = e[0], a = Oi(), i = a.memoizedState;
      return [t, i];
    }
    var IE = !1;
    function Xx() {
      return IE;
    }
    function Ig() {
      var e = Vl(), t = Mm(), a = t.identifierPrefix, i;
      if (Ur()) {
        var u = vx();
        i = ":" + a + "R" + u;
        var s = Cp++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = Qx++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function dm() {
      var e = Oi(), t = e.memoizedState;
      return t;
    }
    function Zx(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Io(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (YE(e))
        QE(t, u);
      else {
        var s = EE(e, t, u, i);
        if (s !== null) {
          var f = ba();
          hr(s, e, i, f), WE(s, t, i);
        }
      }
      GE(e, i);
    }
    function Jx(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Io(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (YE(e))
        QE(t, u);
      else {
        var s = e.alternate;
        if (e.lanes === B && (s === null || s.lanes === B)) {
          var f = t.lastRenderedReducer;
          if (f !== null) {
            var p;
            p = fe.current, fe.current = nl;
            try {
              var v = t.lastRenderedState, y = f(v, a);
              if (u.hasEagerState = !0, u.eagerState = y, ge(y, v)) {
                jx(e, t, u, i);
                return;
              }
            } catch {
            } finally {
              fe.current = p;
            }
          }
        }
        var g = EE(e, t, u, i);
        if (g !== null) {
          var b = ba();
          hr(g, e, i, b), WE(g, t, i);
        }
      }
      GE(e, i);
    }
    function YE(e) {
      var t = e.alternate;
      return e === Gt || t !== null && t === Gt;
    }
    function QE(e, t) {
      Ep = em = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function WE(e, t, a) {
      if (Od(a)) {
        var i = t.lanes;
        i = Ic(i, e.pendingLanes);
        var u = Je(i, a);
        t.lanes = u, Ld(e, u);
      }
    }
    function GE(e, t, a) {
      hs(e, t);
    }
    var pm = {
      readContext: rr,
      useCallback: ca,
      useContext: ca,
      useEffect: ca,
      useImperativeHandle: ca,
      useInsertionEffect: ca,
      useLayoutEffect: ca,
      useMemo: ca,
      useReducer: ca,
      useRef: ca,
      useState: ca,
      useDebugValue: ca,
      useDeferredValue: ca,
      useTransition: ca,
      useMutableSource: ca,
      useSyncExternalStore: ca,
      useId: ca,
      unstable_isNewReconciler: J
    }, qE = null, KE = null, XE = null, ZE = null, Pl = null, nl = null, vm = null;
    {
      var Yg = function() {
        S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, Ge = function() {
        S("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      qE = {
        readContext: function(e) {
          return rr(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", It(), Nf(t), Vg(e, t);
        },
        useContext: function(e) {
          return P = "useContext", It(), rr(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", It(), Nf(t), im(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", It(), Nf(a), Hg(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", It(), Nf(t), jg(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", It(), Nf(t), Fg(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", It(), Nf(t);
          var a = fe.current;
          fe.current = Pl;
          try {
            return Pg(e, t);
          } finally {
            fe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", It();
          var i = fe.current;
          fe.current = Pl;
          try {
            return Og(e, t, a);
          } finally {
            fe.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", It(), Ag(e);
        },
        useState: function(e) {
          P = "useState", It();
          var t = fe.current;
          fe.current = Pl;
          try {
            return nm(e);
          } finally {
            fe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", It(), void 0;
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", It(), Bg(e);
        },
        useTransition: function() {
          return P = "useTransition", It(), $g();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", It(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", It(), Ng(e, t, a);
        },
        useId: function() {
          return P = "useId", It(), Ig();
        },
        unstable_isNewReconciler: J
      }, KE = {
        readContext: function(e) {
          return rr(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", re(), Vg(e, t);
        },
        useContext: function(e) {
          return P = "useContext", re(), rr(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", re(), im(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", re(), Hg(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", re(), jg(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", re(), Fg(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", re();
          var a = fe.current;
          fe.current = Pl;
          try {
            return Pg(e, t);
          } finally {
            fe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", re();
          var i = fe.current;
          fe.current = Pl;
          try {
            return Og(e, t, a);
          } finally {
            fe.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", re(), Ag(e);
        },
        useState: function(e) {
          P = "useState", re();
          var t = fe.current;
          fe.current = Pl;
          try {
            return nm(e);
          } finally {
            fe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", re(), void 0;
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", re(), Bg(e);
        },
        useTransition: function() {
          return P = "useTransition", re(), $g();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", re(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", re(), Ng(e, t, a);
        },
        useId: function() {
          return P = "useId", re(), Ig();
        },
        unstable_isNewReconciler: J
      }, XE = {
        readContext: function(e) {
          return rr(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", re(), cm(e, t);
        },
        useContext: function(e) {
          return P = "useContext", re(), rr(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", re(), xp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", re(), om(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", re(), lm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", re(), um(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", re();
          var a = fe.current;
          fe.current = nl;
          try {
            return fm(e, t);
          } finally {
            fe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", re();
          var i = fe.current;
          fe.current = nl;
          try {
            return Lg(e, t, a);
          } finally {
            fe.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", re(), rm();
        },
        useState: function(e) {
          P = "useState", re();
          var t = fe.current;
          fe.current = nl;
          try {
            return zg(e);
          } finally {
            fe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", re(), sm();
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", re(), HE(e);
        },
        useTransition: function() {
          return P = "useTransition", re(), BE();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", re(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", re(), tm(e, t);
        },
        useId: function() {
          return P = "useId", re(), dm();
        },
        unstable_isNewReconciler: J
      }, ZE = {
        readContext: function(e) {
          return rr(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", re(), cm(e, t);
        },
        useContext: function(e) {
          return P = "useContext", re(), rr(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", re(), xp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", re(), om(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", re(), lm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", re(), um(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", re();
          var a = fe.current;
          fe.current = vm;
          try {
            return fm(e, t);
          } finally {
            fe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", re();
          var i = fe.current;
          fe.current = vm;
          try {
            return Mg(e, t, a);
          } finally {
            fe.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", re(), rm();
        },
        useState: function(e) {
          P = "useState", re();
          var t = fe.current;
          fe.current = vm;
          try {
            return Ug(e);
          } finally {
            fe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", re(), sm();
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", re(), VE(e);
        },
        useTransition: function() {
          return P = "useTransition", re(), $E();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", re(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", re(), tm(e, t);
        },
        useId: function() {
          return P = "useId", re(), dm();
        },
        unstable_isNewReconciler: J
      }, Pl = {
        readContext: function(e) {
          return Yg(), rr(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", Ge(), It(), Vg(e, t);
        },
        useContext: function(e) {
          return P = "useContext", Ge(), It(), rr(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", Ge(), It(), im(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", Ge(), It(), Hg(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", Ge(), It(), jg(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", Ge(), It(), Fg(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", Ge(), It();
          var a = fe.current;
          fe.current = Pl;
          try {
            return Pg(e, t);
          } finally {
            fe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", Ge(), It();
          var i = fe.current;
          fe.current = Pl;
          try {
            return Og(e, t, a);
          } finally {
            fe.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", Ge(), It(), Ag(e);
        },
        useState: function(e) {
          P = "useState", Ge(), It();
          var t = fe.current;
          fe.current = Pl;
          try {
            return nm(e);
          } finally {
            fe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", Ge(), It(), void 0;
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", Ge(), It(), Bg(e);
        },
        useTransition: function() {
          return P = "useTransition", Ge(), It(), $g();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", Ge(), It(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", Ge(), It(), Ng(e, t, a);
        },
        useId: function() {
          return P = "useId", Ge(), It(), Ig();
        },
        unstable_isNewReconciler: J
      }, nl = {
        readContext: function(e) {
          return Yg(), rr(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", Ge(), re(), cm(e, t);
        },
        useContext: function(e) {
          return P = "useContext", Ge(), re(), rr(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", Ge(), re(), xp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", Ge(), re(), om(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", Ge(), re(), lm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", Ge(), re(), um(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", Ge(), re();
          var a = fe.current;
          fe.current = nl;
          try {
            return fm(e, t);
          } finally {
            fe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", Ge(), re();
          var i = fe.current;
          fe.current = nl;
          try {
            return Lg(e, t, a);
          } finally {
            fe.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", Ge(), re(), rm();
        },
        useState: function(e) {
          P = "useState", Ge(), re();
          var t = fe.current;
          fe.current = nl;
          try {
            return zg(e);
          } finally {
            fe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", Ge(), re(), sm();
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", Ge(), re(), HE(e);
        },
        useTransition: function() {
          return P = "useTransition", Ge(), re(), BE();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", Ge(), re(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", Ge(), re(), tm(e, t);
        },
        useId: function() {
          return P = "useId", Ge(), re(), dm();
        },
        unstable_isNewReconciler: J
      }, vm = {
        readContext: function(e) {
          return Yg(), rr(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", Ge(), re(), cm(e, t);
        },
        useContext: function(e) {
          return P = "useContext", Ge(), re(), rr(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", Ge(), re(), xp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", Ge(), re(), om(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", Ge(), re(), lm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", Ge(), re(), um(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", Ge(), re();
          var a = fe.current;
          fe.current = nl;
          try {
            return fm(e, t);
          } finally {
            fe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", Ge(), re();
          var i = fe.current;
          fe.current = nl;
          try {
            return Mg(e, t, a);
          } finally {
            fe.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", Ge(), re(), rm();
        },
        useState: function(e) {
          P = "useState", Ge(), re();
          var t = fe.current;
          fe.current = nl;
          try {
            return Ug(e);
          } finally {
            fe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", Ge(), re(), sm();
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", Ge(), re(), VE(e);
        },
        useTransition: function() {
          return P = "useTransition", Ge(), re(), $E();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", Ge(), re(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", Ge(), re(), tm(e, t);
        },
        useId: function() {
          return P = "useId", Ge(), re(), dm();
        },
        unstable_isNewReconciler: J
      };
    }
    var Vo = X.unstable_now, JE = 0, hm = -1, wp = -1, mm = -1, Qg = !1, ym = !1;
    function eC() {
      return Qg;
    }
    function ew() {
      ym = !0;
    }
    function tw() {
      Qg = !1, ym = !1;
    }
    function nw() {
      Qg = ym, ym = !1;
    }
    function tC() {
      return JE;
    }
    function nC() {
      JE = Vo();
    }
    function Wg(e) {
      wp = Vo(), e.actualStartTime < 0 && (e.actualStartTime = Vo());
    }
    function rC(e) {
      wp = -1;
    }
    function gm(e, t) {
      if (wp >= 0) {
        var a = Vo() - wp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), wp = -1;
      }
    }
    function Bl(e) {
      if (hm >= 0) {
        var t = Vo() - hm;
        hm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case te:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case mt:
              var u = a.stateNode;
              u.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function Gg(e) {
      if (mm >= 0) {
        var t = Vo() - mm;
        mm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case te:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case mt:
              var u = a.stateNode;
              u !== null && (u.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function $l() {
      hm = Vo();
    }
    function qg() {
      mm = Vo();
    }
    function Kg(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function rl(e, t) {
      if (e && e.defaultProps) {
        var a = ut({}, t), i = e.defaultProps;
        for (var u in i)
          a[u] === void 0 && (a[u] = i[u]);
        return a;
      }
      return t;
    }
    var Xg = {}, Zg, Jg, eS, tS, nS, aC, Sm, rS, aS, iS, bp;
    {
      Zg = /* @__PURE__ */ new Set(), Jg = /* @__PURE__ */ new Set(), eS = /* @__PURE__ */ new Set(), tS = /* @__PURE__ */ new Set(), rS = /* @__PURE__ */ new Set(), nS = /* @__PURE__ */ new Set(), aS = /* @__PURE__ */ new Set(), iS = /* @__PURE__ */ new Set(), bp = /* @__PURE__ */ new Set();
      var iC = /* @__PURE__ */ new Set();
      Sm = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          iC.has(a) || (iC.add(a), S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, aC = function(e, t) {
        if (t === void 0) {
          var a = Ct(e) || "Component";
          nS.has(a) || (nS.add(a), S("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(Xg, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(Xg);
    }
    function lS(e, t, a, i) {
      var u = e.memoizedState, s = a(i, u);
      {
        if (e.mode & vt) {
          Fn(!0);
          try {
            s = a(i, u);
          } finally {
            Fn(!1);
          }
        }
        aC(t, s);
      }
      var f = s == null ? u : ut({}, u, s);
      if (e.memoizedState = f, e.lanes === B) {
        var p = e.updateQueue;
        p.baseState = f;
      }
    }
    var uS = {
      isMounted: Ea,
      enqueueSetState: function(e, t, a) {
        var i = za(e), u = ba(), s = Io(i), f = bu(u, s);
        f.payload = t, a != null && (Sm(a, "setState"), f.callback = a);
        var p = Ao(i, f, s);
        p !== null && (hr(p, i, s, u), Gh(p, i, s)), hs(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = za(e), u = ba(), s = Io(i), f = bu(u, s);
        f.tag = RE, f.payload = t, a != null && (Sm(a, "replaceState"), f.callback = a);
        var p = Ao(i, f, s);
        p !== null && (hr(p, i, s, u), Gh(p, i, s)), hs(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = za(e), i = ba(), u = Io(a), s = bu(i, u);
        s.tag = Yh, t != null && (Sm(t, "forceUpdate"), s.callback = t);
        var f = Ao(a, s, u);
        f !== null && (hr(f, a, u, i), Gh(f, a, u)), _c(a, u);
      }
    };
    function lC(e, t, a, i, u, s, f) {
      var p = e.stateNode;
      if (typeof p.shouldComponentUpdate == "function") {
        var v = p.shouldComponentUpdate(i, s, f);
        {
          if (e.mode & vt) {
            Fn(!0);
            try {
              v = p.shouldComponentUpdate(i, s, f);
            } finally {
              Fn(!1);
            }
          }
          v === void 0 && S("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Ct(t) || "Component");
        }
        return v;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !He(a, i) || !He(u, s) : !0;
    }
    function rw(e, t, a) {
      var i = e.stateNode;
      {
        var u = Ct(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? S("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : S("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && S("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && S("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), i.propTypes && S("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), i.contextType && S("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !bp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & vt) === Re && (bp.add(t), S(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !bp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & vt) === Re && (bp.add(t), S(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), i.contextTypes && S("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !aS.has(t) && (aS.add(t), S("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof i.componentShouldUpdate == "function" && S("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && S("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Ct(t) || "A pure component"), typeof i.componentDidUnmount == "function" && S("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof i.componentDidReceiveProps == "function" && S("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof i.componentWillRecieveProps == "function" && S("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof i.UNSAFE_componentWillRecieveProps == "function" && S("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var f = i.props !== a;
        i.props !== void 0 && f && S("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), i.defaultProps && S("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !eS.has(t) && (eS.add(t), S("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Ct(t))), typeof i.getDerivedStateFromProps == "function" && S("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof i.getDerivedStateFromError == "function" && S("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && S("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var p = i.state;
        p && (typeof p != "object" || Rt(p)) && S("%s.state: must be set to an object or null", u), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && S("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function uC(e, t) {
      t.updater = uS, e.stateNode = t, Zu(t, e), t._reactInternalInstance = Xg;
    }
    function oC(e, t, a) {
      var i = !1, u = si, s = si, f = t.contextType;
      if ("contextType" in t) {
        var p = (
          // Allow null for conditional declaration
          f === null || f !== void 0 && f.$$typeof === $ && f._context === void 0
        );
        if (!p && !iS.has(t)) {
          iS.add(t);
          var v = "";
          f === void 0 ? v = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? v = " However, it is set to a " + typeof f + "." : f.$$typeof === R ? v = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? v = " Did you accidentally pass the Context.Consumer instead?" : v = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", S("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Ct(t) || "Component", v);
        }
      }
      if (typeof f == "object" && f !== null)
        s = rr(f);
      else {
        u = Cf(e, t, !0);
        var y = t.contextTypes;
        i = y != null, s = i ? Rf(e, u) : si;
      }
      var g = new t(a, s);
      if (e.mode & vt) {
        Fn(!0);
        try {
          g = new t(a, s);
        } finally {
          Fn(!1);
        }
      }
      var b = e.memoizedState = g.state !== null && g.state !== void 0 ? g.state : null;
      uC(e, g);
      {
        if (typeof t.getDerivedStateFromProps == "function" && b === null) {
          var x = Ct(t) || "Component";
          Jg.has(x) || (Jg.add(x), S("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", x, g.state === null ? "null" : "undefined", x));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof g.getSnapshotBeforeUpdate == "function") {
          var M = null, U = null, F = null;
          if (typeof g.componentWillMount == "function" && g.componentWillMount.__suppressDeprecationWarning !== !0 ? M = "componentWillMount" : typeof g.UNSAFE_componentWillMount == "function" && (M = "UNSAFE_componentWillMount"), typeof g.componentWillReceiveProps == "function" && g.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? U = "componentWillReceiveProps" : typeof g.UNSAFE_componentWillReceiveProps == "function" && (U = "UNSAFE_componentWillReceiveProps"), typeof g.componentWillUpdate == "function" && g.componentWillUpdate.__suppressDeprecationWarning !== !0 ? F = "componentWillUpdate" : typeof g.UNSAFE_componentWillUpdate == "function" && (F = "UNSAFE_componentWillUpdate"), M !== null || U !== null || F !== null) {
            var ue = Ct(t) || "Component", Me = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            tS.has(ue) || (tS.add(ue), S(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, ue, Me, M !== null ? `
  ` + M : "", U !== null ? `
  ` + U : "", F !== null ? `
  ` + F : ""));
          }
        }
      }
      return i && X0(e, u, s), g;
    }
    function aw(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (S("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", We(e) || "Component"), uS.enqueueReplaceState(t, t.state, null));
    }
    function sC(e, t, a, i) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== u) {
        {
          var s = We(e) || "Component";
          Zg.has(s) || (Zg.add(s), S("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", s));
        }
        uS.enqueueReplaceState(t, t.state, null);
      }
    }
    function oS(e, t, a, i) {
      rw(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, yg(e);
      var s = t.contextType;
      if (typeof s == "object" && s !== null)
        u.context = rr(s);
      else {
        var f = Cf(e, t, !0);
        u.context = Rf(e, f);
      }
      {
        if (u.state === a) {
          var p = Ct(t) || "Component";
          rS.has(p) || (rS.add(p), S("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", p));
        }
        e.mode & vt && el.recordLegacyContextWarning(e, u), el.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var v = t.getDerivedStateFromProps;
      if (typeof v == "function" && (lS(e, t, v, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (aw(e, u), qh(e, a, u, i), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var y = tt;
        y |= Jr, (e.mode & Ra) !== Re && (y |= ea), e.flags |= y;
      }
    }
    function iw(e, t, a, i) {
      var u = e.stateNode, s = e.memoizedProps;
      u.props = s;
      var f = u.context, p = t.contextType, v = si;
      if (typeof p == "object" && p !== null)
        v = rr(p);
      else {
        var y = Cf(e, t, !0);
        v = Rf(e, y);
      }
      var g = t.getDerivedStateFromProps, b = typeof g == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !b && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (s !== a || f !== v) && sC(e, u, a, v), xE();
      var x = e.memoizedState, M = u.state = x;
      if (qh(e, a, u, i), M = e.memoizedState, s === a && x === M && !Oh() && !Kh()) {
        if (typeof u.componentDidMount == "function") {
          var U = tt;
          U |= Jr, (e.mode & Ra) !== Re && (U |= ea), e.flags |= U;
        }
        return !1;
      }
      typeof g == "function" && (lS(e, t, g, a), M = e.memoizedState);
      var F = Kh() || lC(e, t, s, a, x, M, v);
      if (F) {
        if (!b && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var ue = tt;
          ue |= Jr, (e.mode & Ra) !== Re && (ue |= ea), e.flags |= ue;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var Me = tt;
          Me |= Jr, (e.mode & Ra) !== Re && (Me |= ea), e.flags |= Me;
        }
        e.memoizedProps = a, e.memoizedState = M;
      }
      return u.props = a, u.state = M, u.context = v, F;
    }
    function lw(e, t, a, i, u) {
      var s = t.stateNode;
      TE(e, t);
      var f = t.memoizedProps, p = t.type === t.elementType ? f : rl(t.type, f);
      s.props = p;
      var v = t.pendingProps, y = s.context, g = a.contextType, b = si;
      if (typeof g == "object" && g !== null)
        b = rr(g);
      else {
        var x = Cf(t, a, !0);
        b = Rf(t, x);
      }
      var M = a.getDerivedStateFromProps, U = typeof M == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !U && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== v || y !== b) && sC(t, s, i, b), xE();
      var F = t.memoizedState, ue = s.state = F;
      if (qh(t, i, s, u), ue = t.memoizedState, f === v && F === ue && !Oh() && !Kh() && !_e)
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || F !== e.memoizedState) && (t.flags |= tt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || F !== e.memoizedState) && (t.flags |= Ua), !1;
      typeof M == "function" && (lS(t, a, M, i), ue = t.memoizedState);
      var Me = Kh() || lC(t, a, p, i, F, ue, b) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      _e;
      return Me ? (!U && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, ue, b), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, ue, b)), typeof s.componentDidUpdate == "function" && (t.flags |= tt), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= Ua)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || F !== e.memoizedState) && (t.flags |= tt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || F !== e.memoizedState) && (t.flags |= Ua), t.memoizedProps = i, t.memoizedState = ue), s.props = i, s.state = ue, s.context = b, Me;
    }
    function Qs(e, t) {
      return {
        value: e,
        source: t,
        stack: Hu(t),
        digest: null
      };
    }
    function sS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function uw(e, t) {
      return !0;
    }
    function cS(e, t) {
      try {
        var a = uw(e, t);
        if (a === !1)
          return;
        var i = t.value, u = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === oe)
            return;
          console.error(i);
        }
        var p = u ? We(u) : null, v = p ? "The above error occurred in the <" + p + "> component:" : "The above error occurred in one of your React components:", y;
        if (e.tag === te)
          y = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var g = We(e) || "Anonymous";
          y = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + g + ".");
        }
        var b = v + `
` + f + `

` + ("" + y);
        console.error(b);
      } catch (x) {
        setTimeout(function() {
          throw x;
        });
      }
    }
    var ow = typeof WeakMap == "function" ? WeakMap : Map;
    function cC(e, t, a) {
      var i = bu(nn, a);
      i.tag = hg, i.payload = {
        element: null
      };
      var u = t.value;
      return i.callback = function() {
        e_(u), cS(e, t);
      }, i;
    }
    function fS(e, t, a) {
      var i = bu(nn, a);
      i.tag = hg;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var s = t.value;
        i.payload = function() {
          return u(s);
        }, i.callback = function() {
          C1(e), cS(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        C1(e), cS(e, t), typeof u != "function" && Zb(this);
        var v = t.value, y = t.stack;
        this.componentDidCatch(v, {
          componentStack: y !== null ? y : ""
        }), typeof u != "function" && (la(e.lanes, De) || S("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", We(e) || "Unknown"));
      }), i;
    }
    function fC(e, t, a) {
      var i = e.pingCache, u;
      if (i === null ? (i = e.pingCache = new ow(), u = /* @__PURE__ */ new Set(), i.set(t, u)) : (u = i.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(t, u))), !u.has(a)) {
        u.add(a);
        var s = t_.bind(null, e, t, a);
        Ca && $p(e, a), t.then(s, s);
      }
    }
    function sw(e, t, a, i) {
      var u = e.updateQueue;
      if (u === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        u.add(a);
    }
    function cw(e, t) {
      var a = e.tag;
      if ((e.mode & we) === Re && (a === de || a === qe || a === Pe)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function dC(e) {
      var t = e;
      do {
        if (t.tag === Oe && Ix(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function pC(e, t, a, i, u) {
      if ((e.mode & we) === Re) {
        if (e === t)
          e.flags |= Jn;
        else {
          if (e.flags |= Ye, a.flags |= ds, a.flags &= ~(hc | ga), a.tag === oe) {
            var s = a.alternate;
            if (s === null)
              a.tag = kn;
            else {
              var f = bu(nn, De);
              f.tag = Yh, Ao(a, f, De);
            }
          }
          a.lanes = Je(a.lanes, De);
        }
        return e;
      }
      return e.flags |= Jn, e.lanes = u, e;
    }
    function fw(e, t, a, i, u) {
      if (a.flags |= ga, Ca && $p(e, u), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        cw(a), Ur() && a.mode & we && aE();
        var f = dC(t);
        if (f !== null) {
          f.flags &= ~xn, pC(f, t, a, e, u), f.mode & we && fC(e, s, u), sw(f, e, s);
          return;
        } else {
          if (!Dd(u)) {
            fC(e, s, u), IS();
            return;
          }
          var p = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = p;
        }
      } else if (Ur() && a.mode & we) {
        aE();
        var v = dC(t);
        if (v !== null) {
          (v.flags & Jn) === Le && (v.flags |= xn), pC(v, t, a, e, u), rg(Qs(i, a));
          return;
        }
      }
      i = Qs(i, a), Ib(i);
      var y = t;
      do {
        switch (y.tag) {
          case te: {
            var g = i;
            y.flags |= Jn;
            var b = po(u);
            y.lanes = Je(y.lanes, b);
            var x = cC(y, g, b);
            gg(y, x);
            return;
          }
          case oe:
            var M = i, U = y.type, F = y.stateNode;
            if ((y.flags & Ye) === Le && (typeof U.getDerivedStateFromError == "function" || F !== null && typeof F.componentDidCatch == "function" && !d1(F))) {
              y.flags |= Jn;
              var ue = po(u);
              y.lanes = Je(y.lanes, ue);
              var Me = fS(y, M, ue);
              gg(y, Me);
              return;
            }
            break;
        }
        y = y.return;
      } while (y !== null);
    }
    function dw() {
      return null;
    }
    var _p = A.ReactCurrentOwner, al = !1, dS, kp, pS, vS, hS, Ws, mS, Em, Dp;
    dS = {}, kp = {}, pS = {}, vS = {}, hS = {}, Ws = !1, mS = {}, Em = {}, Dp = {};
    function xa(e, t, a, i) {
      e === null ? t.child = mE(t, null, a, i) : t.child = bf(t, e.child, a, i);
    }
    function pw(e, t, a, i) {
      t.child = bf(t, e.child, null, i), t.child = bf(t, null, a, i);
    }
    function vC(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && Zi(
          s,
          i,
          // Resolved props
          "prop",
          Ct(a)
        );
      }
      var f = a.render, p = t.ref, v, y;
      kf(t, u), no(t);
      {
        if (_p.current = t, Kr(!0), v = zf(e, t, f, i, p, u), y = Uf(), t.mode & vt) {
          Fn(!0);
          try {
            v = zf(e, t, f, i, p, u), y = Uf();
          } finally {
            Fn(!1);
          }
        }
        Kr(!1);
      }
      return ra(), e !== null && !al ? (OE(e, t, u), _u(e, t, u)) : (Ur() && y && Xy(t), t.flags |= wl, xa(e, t, v, u), t.child);
    }
    function hC(e, t, a, i, u) {
      if (e === null) {
        var s = a.type;
        if (g_(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = $f(s), t.tag = Pe, t.type = f, SS(t, s), mC(e, t, f, i, u);
        }
        {
          var p = s.propTypes;
          if (p && Zi(
            p,
            i,
            // Resolved props
            "prop",
            Ct(s)
          ), a.defaultProps !== void 0) {
            var v = Ct(s) || "Unknown";
            Dp[v] || (S("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", v), Dp[v] = !0);
          }
        }
        var y = t0(a.type, null, i, t, t.mode, u);
        return y.ref = t.ref, y.return = t, t.child = y, y;
      }
      {
        var g = a.type, b = g.propTypes;
        b && Zi(
          b,
          i,
          // Resolved props
          "prop",
          Ct(g)
        );
      }
      var x = e.child, M = wS(e, u);
      if (!M) {
        var U = x.memoizedProps, F = a.compare;
        if (F = F !== null ? F : He, F(U, i) && e.ref === t.ref)
          return _u(e, t, u);
      }
      t.flags |= wl;
      var ue = Zs(x, i);
      return ue.ref = t.ref, ue.return = t, t.child = ue, ue;
    }
    function mC(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = t.elementType;
        if (s.$$typeof === Ae) {
          var f = s, p = f._payload, v = f._init;
          try {
            s = v(p);
          } catch {
            s = null;
          }
          var y = s && s.propTypes;
          y && Zi(
            y,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            Ct(s)
          );
        }
      }
      if (e !== null) {
        var g = e.memoizedProps;
        if (He(g, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (al = !1, t.pendingProps = i = g, wS(e, u))
            (e.flags & ds) !== Le && (al = !0);
          else
            return t.lanes = e.lanes, _u(e, t, u);
      }
      return yS(e, t, a, i, u);
    }
    function yC(e, t, a) {
      var i = t.pendingProps, u = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || ae)
        if ((t.mode & we) === Re) {
          var f = {
            baseLanes: B,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, Nm(t, a);
        } else if (la(a, Tr)) {
          var b = {
            baseLanes: B,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = b;
          var x = s !== null ? s.baseLanes : a;
          Nm(t, x);
        } else {
          var p = null, v;
          if (s !== null) {
            var y = s.baseLanes;
            v = Je(y, a);
          } else
            v = a;
          t.lanes = t.childLanes = Tr;
          var g = {
            baseLanes: v,
            cachePool: p,
            transitions: null
          };
          return t.memoizedState = g, t.updateQueue = null, Nm(t, v), null;
        }
      else {
        var M;
        s !== null ? (M = Je(s.baseLanes, a), t.memoizedState = null) : M = a, Nm(t, M);
      }
      return xa(e, t, u, a), t.child;
    }
    function vw(e, t, a) {
      var i = t.pendingProps;
      return xa(e, t, i, a), t.child;
    }
    function hw(e, t, a) {
      var i = t.pendingProps.children;
      return xa(e, t, i, a), t.child;
    }
    function mw(e, t, a) {
      {
        t.flags |= tt;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, s = u.children;
      return xa(e, t, s, a), t.child;
    }
    function gC(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= Zr, t.flags |= md);
    }
    function yS(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && Zi(
          s,
          i,
          // Resolved props
          "prop",
          Ct(a)
        );
      }
      var f;
      {
        var p = Cf(t, a, !0);
        f = Rf(t, p);
      }
      var v, y;
      kf(t, u), no(t);
      {
        if (_p.current = t, Kr(!0), v = zf(e, t, a, i, f, u), y = Uf(), t.mode & vt) {
          Fn(!0);
          try {
            v = zf(e, t, a, i, f, u), y = Uf();
          } finally {
            Fn(!1);
          }
        }
        Kr(!1);
      }
      return ra(), e !== null && !al ? (OE(e, t, u), _u(e, t, u)) : (Ur() && y && Xy(t), t.flags |= wl, xa(e, t, v, u), t.child);
    }
    function SC(e, t, a, i, u) {
      {
        switch (N_(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, p = new f(t.memoizedProps, s.context), v = p.state;
            s.updater.enqueueSetState(s, v, null);
            break;
          }
          case !0: {
            t.flags |= Ye, t.flags |= Jn;
            var y = new Error("Simulated error coming from DevTools"), g = po(u);
            t.lanes = Je(t.lanes, g);
            var b = fS(t, Qs(y, t), g);
            gg(t, b);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var x = a.propTypes;
          x && Zi(
            x,
            i,
            // Resolved props
            "prop",
            Ct(a)
          );
        }
      }
      var M;
      Fl(a) ? (M = !0, Mh(t)) : M = !1, kf(t, u);
      var U = t.stateNode, F;
      U === null ? (Rm(e, t), oC(t, a, i), oS(t, a, i, u), F = !0) : e === null ? F = iw(t, a, i, u) : F = lw(e, t, a, i, u);
      var ue = gS(e, t, a, F, M, u);
      {
        var Me = t.stateNode;
        F && Me.props !== i && (Ws || S("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", We(t) || "a component"), Ws = !0);
      }
      return ue;
    }
    function gS(e, t, a, i, u, s) {
      gC(e, t);
      var f = (t.flags & Ye) !== Le;
      if (!i && !f)
        return u && eE(t, a, !1), _u(e, t, s);
      var p = t.stateNode;
      _p.current = t;
      var v;
      if (f && typeof a.getDerivedStateFromError != "function")
        v = null, rC();
      else {
        no(t);
        {
          if (Kr(!0), v = p.render(), t.mode & vt) {
            Fn(!0);
            try {
              p.render();
            } finally {
              Fn(!1);
            }
          }
          Kr(!1);
        }
        ra();
      }
      return t.flags |= wl, e !== null && f ? pw(e, t, v, s) : xa(e, t, v, s), t.memoizedState = p.state, u && eE(t, a, !0), t.child;
    }
    function EC(e) {
      var t = e.stateNode;
      t.pendingContext ? Z0(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Z0(e, t.context, !1), Sg(e, t.containerInfo);
    }
    function yw(e, t, a) {
      if (EC(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, u = t.memoizedState, s = u.element;
      TE(e, t), qh(t, i, null, a);
      var f = t.memoizedState;
      t.stateNode;
      var p = f.element;
      if (u.isDehydrated) {
        var v = {
          element: p,
          isDehydrated: !1,
          cache: f.cache,
          pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
          transitions: f.transitions
        }, y = t.updateQueue;
        if (y.baseState = v, t.memoizedState = v, t.flags & xn) {
          var g = Qs(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return CC(e, t, p, a, g);
        } else if (p !== s) {
          var b = Qs(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return CC(e, t, p, a, b);
        } else {
          Ex(t);
          var x = mE(t, null, p, a);
          t.child = x;
          for (var M = x; M; )
            M.flags = M.flags & ~un | Aa, M = M.sibling;
        }
      } else {
        if (wf(), p === s)
          return _u(e, t, a);
        xa(e, t, p, a);
      }
      return t.child;
    }
    function CC(e, t, a, i, u) {
      return wf(), rg(u), t.flags |= xn, xa(e, t, a, i), t.child;
    }
    function gw(e, t, a) {
      _E(t), e === null && ng(t);
      var i = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = u.children, p = jy(i, u);
      return p ? f = null : s !== null && jy(i, s) && (t.flags |= $t), gC(e, t), xa(e, t, f, a), t.child;
    }
    function Sw(e, t) {
      return e === null && ng(t), null;
    }
    function Ew(e, t, a, i) {
      Rm(e, t);
      var u = t.pendingProps, s = a, f = s._payload, p = s._init, v = p(f);
      t.type = v;
      var y = t.tag = S_(v), g = rl(v, u), b;
      switch (y) {
        case de:
          return SS(t, v), t.type = v = $f(v), b = yS(null, t, v, g, i), b;
        case oe:
          return t.type = v = qS(v), b = SC(null, t, v, g, i), b;
        case qe:
          return t.type = v = KS(v), b = vC(null, t, v, g, i), b;
        case ft: {
          if (t.type !== t.elementType) {
            var x = v.propTypes;
            x && Zi(
              x,
              g,
              // Resolved for outer only
              "prop",
              Ct(v)
            );
          }
          return b = hC(
            null,
            t,
            v,
            rl(v.type, g),
            // The inner type can have defaults too
            i
          ), b;
        }
      }
      var M = "";
      throw v !== null && typeof v == "object" && v.$$typeof === Ae && (M = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + v + ". " + ("Lazy element type must resolve to a class or function." + M));
    }
    function Cw(e, t, a, i, u) {
      Rm(e, t), t.tag = oe;
      var s;
      return Fl(a) ? (s = !0, Mh(t)) : s = !1, kf(t, u), oC(t, a, i), oS(t, a, i, u), gS(null, t, a, !0, s, u);
    }
    function Rw(e, t, a, i) {
      Rm(e, t);
      var u = t.pendingProps, s;
      {
        var f = Cf(t, a, !1);
        s = Rf(t, f);
      }
      kf(t, i);
      var p, v;
      no(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var y = Ct(a) || "Unknown";
          dS[y] || (S("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", y, y), dS[y] = !0);
        }
        t.mode & vt && el.recordLegacyContextWarning(t, null), Kr(!0), _p.current = t, p = zf(null, t, a, u, s, i), v = Uf(), Kr(!1);
      }
      if (ra(), t.flags |= wl, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0) {
        var g = Ct(a) || "Unknown";
        kp[g] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", g, g, g), kp[g] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0
      ) {
        {
          var b = Ct(a) || "Unknown";
          kp[b] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", b, b, b), kp[b] = !0);
        }
        t.tag = oe, t.memoizedState = null, t.updateQueue = null;
        var x = !1;
        return Fl(a) ? (x = !0, Mh(t)) : x = !1, t.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, yg(t), uC(t, p), oS(t, a, u, i), gS(null, t, a, !0, x, i);
      } else {
        if (t.tag = de, t.mode & vt) {
          Fn(!0);
          try {
            p = zf(null, t, a, u, s, i), v = Uf();
          } finally {
            Fn(!1);
          }
        }
        return Ur() && v && Xy(t), xa(null, t, p, i), SS(t, a), t.child;
      }
    }
    function SS(e, t) {
      {
        if (t && t.childContextTypes && S("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = Mr();
          i && (a += `

Check the render method of \`` + i + "`.");
          var u = i || "", s = e._debugSource;
          s && (u = s.fileName + ":" + s.lineNumber), hS[u] || (hS[u] = !0, S("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var f = Ct(t) || "Unknown";
          Dp[f] || (S("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", f), Dp[f] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var p = Ct(t) || "Unknown";
          vS[p] || (S("%s: Function components do not support getDerivedStateFromProps.", p), vS[p] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var v = Ct(t) || "Unknown";
          pS[v] || (S("%s: Function components do not support contextType.", v), pS[v] = !0);
        }
      }
    }
    var ES = {
      dehydrated: null,
      treeContext: null,
      retryLane: Hn
    };
    function CS(e) {
      return {
        baseLanes: e,
        cachePool: dw(),
        transitions: null
      };
    }
    function Tw(e, t) {
      var a = null;
      return {
        baseLanes: Je(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function xw(e, t, a, i) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return Rg(e, gp);
    }
    function ww(e, t) {
      return Rs(e.childLanes, t);
    }
    function RC(e, t, a) {
      var i = t.pendingProps;
      z_(t) && (t.flags |= Ye);
      var u = tl.current, s = !1, f = (t.flags & Ye) !== Le;
      if (f || xw(u, e) ? (s = !0, t.flags &= ~Ye) : (e === null || e.memoizedState !== null) && (u = $x(u, DE)), u = Of(u), Fo(t, u), e === null) {
        ng(t);
        var p = t.memoizedState;
        if (p !== null) {
          var v = p.dehydrated;
          if (v !== null)
            return Ow(t, v);
        }
        var y = i.children, g = i.fallback;
        if (s) {
          var b = bw(t, y, g, a), x = t.child;
          return x.memoizedState = CS(a), t.memoizedState = ES, b;
        } else
          return RS(t, y);
      } else {
        var M = e.memoizedState;
        if (M !== null) {
          var U = M.dehydrated;
          if (U !== null)
            return Lw(e, t, f, i, U, M, a);
        }
        if (s) {
          var F = i.fallback, ue = i.children, Me = kw(e, t, ue, F, a), be = t.child, wt = e.child.memoizedState;
          return be.memoizedState = wt === null ? CS(a) : Tw(wt, a), be.childLanes = ww(e, a), t.memoizedState = ES, Me;
        } else {
          var gt = i.children, D = _w(e, t, gt, a);
          return t.memoizedState = null, D;
        }
      }
    }
    function RS(e, t, a) {
      var i = e.mode, u = {
        mode: "visible",
        children: t
      }, s = TS(u, i);
      return s.return = e, e.child = s, s;
    }
    function bw(e, t, a, i) {
      var u = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, p, v;
      return (u & we) === Re && s !== null ? (p = s, p.childLanes = B, p.pendingProps = f, e.mode & Qe && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = 0, p.treeBaseDuration = 0), v = Qo(a, u, i, null)) : (p = TS(f, u), v = Qo(a, u, i, null)), p.return = e, v.return = e, p.sibling = v, e.child = p, v;
    }
    function TS(e, t, a) {
      return T1(e, t, B, null);
    }
    function TC(e, t) {
      return Zs(e, t);
    }
    function _w(e, t, a, i) {
      var u = e.child, s = u.sibling, f = TC(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & we) === Re && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var p = t.deletions;
        p === null ? (t.deletions = [s], t.flags |= jt) : p.push(s);
      }
      return t.child = f, f;
    }
    function kw(e, t, a, i, u) {
      var s = t.mode, f = e.child, p = f.sibling, v = {
        mode: "hidden",
        children: a
      }, y;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & we) === Re && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== f
      ) {
        var g = t.child;
        y = g, y.childLanes = B, y.pendingProps = v, t.mode & Qe && (y.actualDuration = 0, y.actualStartTime = -1, y.selfBaseDuration = f.selfBaseDuration, y.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
      } else
        y = TC(f, v), y.subtreeFlags = f.subtreeFlags & ir;
      var b;
      return p !== null ? b = Zs(p, i) : (b = Qo(i, s, u, null), b.flags |= un), b.return = t, y.return = t, y.sibling = b, t.child = y, b;
    }
    function Cm(e, t, a, i) {
      i !== null && rg(i), bf(t, e.child, null, a);
      var u = t.pendingProps, s = u.children, f = RS(t, s);
      return f.flags |= un, t.memoizedState = null, f;
    }
    function Dw(e, t, a, i, u) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, p = TS(f, s), v = Qo(i, s, u, null);
      return v.flags |= un, p.return = t, v.return = t, p.sibling = v, t.child = p, (t.mode & we) !== Re && bf(t, e.child, null, u), v;
    }
    function Ow(e, t, a) {
      return (e.mode & we) === Re ? (S("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = De) : Py(t) ? e.lanes = Wi : e.lanes = Tr, null;
    }
    function Lw(e, t, a, i, u, s, f) {
      if (a)
        if (t.flags & xn) {
          t.flags &= ~xn;
          var D = sS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return Cm(e, t, f, D);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= Ye, null;
          var H = i.children, O = i.fallback, G = Dw(e, t, H, O, f), pe = t.child;
          return pe.memoizedState = CS(f), t.memoizedState = ES, G;
        }
      else {
        if (gx(), (t.mode & we) === Re)
          return Cm(
            e,
            t,
            f,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (Py(u)) {
          var p, v, y;
          {
            var g = UT(u);
            p = g.digest, v = g.message, y = g.stack;
          }
          var b;
          v ? b = new Error(v) : b = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var x = sS(b, p, y);
          return Cm(e, t, f, x);
        }
        var M = la(f, e.childLanes);
        if (al || M) {
          var U = Mm();
          if (U !== null) {
            var F = Wv(U, f);
            if (F !== Hn && F !== s.retryLane) {
              s.retryLane = F;
              var ue = nn;
              Ga(e, F), hr(U, e, F, ue);
            }
          }
          IS();
          var Me = sS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return Cm(e, t, f, Me);
        } else if (Q0(u)) {
          t.flags |= Ye, t.child = e.child;
          var be = n_.bind(null, e);
          return AT(u, be), null;
        } else {
          Cx(t, u, s.treeContext);
          var wt = i.children, gt = RS(t, wt);
          return gt.flags |= Aa, gt;
        }
      }
    }
    function xC(e, t, a) {
      e.lanes = Je(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = Je(i.lanes, t)), pg(e.return, t, a);
    }
    function Mw(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === Oe) {
          var u = i.memoizedState;
          u !== null && xC(i, a, e);
        } else if (i.tag === kt)
          xC(i, a, e);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    function Nw(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && Jh(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function zw(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !mS[e])
        if (mS[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              S('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          S('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function Uw(e, t) {
      e !== void 0 && !Em[e] && (e !== "collapsed" && e !== "hidden" ? (Em[e] = !0, S('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Em[e] = !0, S('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function wC(e, t) {
      {
        var a = Rt(e), i = !a && typeof Dr(e) == "function";
        if (a || i) {
          var u = a ? "array" : "iterable";
          return S("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function Aw(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (Rt(e)) {
          for (var a = 0; a < e.length; a++)
            if (!wC(e[a], a))
              return;
        } else {
          var i = Dr(e);
          if (typeof i == "function") {
            var u = i.call(e);
            if (u)
              for (var s = u.next(), f = 0; !s.done; s = u.next()) {
                if (!wC(s.value, f))
                  return;
                f++;
              }
          } else
            S('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function xS(e, t, a, i, u) {
      var s = e.memoizedState;
      s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: u
      } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = i, s.tail = a, s.tailMode = u);
    }
    function bC(e, t, a) {
      var i = t.pendingProps, u = i.revealOrder, s = i.tail, f = i.children;
      zw(u), Uw(s, u), Aw(f, u), xa(e, t, f, a);
      var p = tl.current, v = Rg(p, gp);
      if (v)
        p = Tg(p, gp), t.flags |= Ye;
      else {
        var y = e !== null && (e.flags & Ye) !== Le;
        y && Mw(t, t.child, a), p = Of(p);
      }
      if (Fo(t, p), (t.mode & we) === Re)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var g = Nw(t.child), b;
            g === null ? (b = t.child, t.child = null) : (b = g.sibling, g.sibling = null), xS(
              t,
              !1,
              // isBackwards
              b,
              g,
              s
            );
            break;
          }
          case "backwards": {
            var x = null, M = t.child;
            for (t.child = null; M !== null; ) {
              var U = M.alternate;
              if (U !== null && Jh(U) === null) {
                t.child = M;
                break;
              }
              var F = M.sibling;
              M.sibling = x, x = M, M = F;
            }
            xS(
              t,
              !0,
              // isBackwards
              x,
              null,
              // last
              s
            );
            break;
          }
          case "together": {
            xS(
              t,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function jw(e, t, a) {
      Sg(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = bf(t, null, i, a) : xa(e, t, i, a), t.child;
    }
    var _C = !1;
    function Fw(e, t, a) {
      var i = t.type, u = i._context, s = t.pendingProps, f = t.memoizedProps, p = s.value;
      {
        "value" in s || _C || (_C = !0, S("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var v = t.type.propTypes;
        v && Zi(v, s, "prop", "Context.Provider");
      }
      if (SE(t, u, p), f !== null) {
        var y = f.value;
        if (ge(y, p)) {
          if (f.children === s.children && !Oh())
            return _u(e, t, a);
        } else
          zx(t, u, a);
      }
      var g = s.children;
      return xa(e, t, g, a), t.child;
    }
    var kC = !1;
    function Hw(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (kC || (kC = !0, S("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var u = t.pendingProps, s = u.children;
      typeof s != "function" && S("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), kf(t, a);
      var f = rr(i);
      no(t);
      var p;
      return _p.current = t, Kr(!0), p = s(f), Kr(!1), ra(), t.flags |= wl, xa(e, t, p, a), t.child;
    }
    function Op() {
      al = !0;
    }
    function Rm(e, t) {
      (t.mode & we) === Re && e !== null && (e.alternate = null, t.alternate = null, t.flags |= un);
    }
    function _u(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), rC(), Bp(t.lanes), la(a, t.childLanes) ? (Mx(e, t), t.child) : null;
    }
    function Vw(e, t, a) {
      {
        var i = t.return;
        if (i === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === i.child)
          i.child = a;
        else {
          var u = i.child;
          if (u === null)
            throw new Error("Expected parent to have a child.");
          for (; u.sibling !== t; )
            if (u = u.sibling, u === null)
              throw new Error("Expected to find the previous sibling.");
          u.sibling = a;
        }
        var s = i.deletions;
        return s === null ? (i.deletions = [e], i.flags |= jt) : s.push(e), a.flags |= un, a;
      }
    }
    function wS(e, t) {
      var a = e.lanes;
      return !!la(a, t);
    }
    function Pw(e, t, a) {
      switch (t.tag) {
        case te:
          EC(t), t.stateNode, wf();
          break;
        case le:
          _E(t);
          break;
        case oe: {
          var i = t.type;
          Fl(i) && Mh(t);
          break;
        }
        case ve:
          Sg(t, t.stateNode.containerInfo);
          break;
        case nt: {
          var u = t.memoizedProps.value, s = t.type._context;
          SE(t, s, u);
          break;
        }
        case mt:
          {
            var f = la(a, t.childLanes);
            f && (t.flags |= tt);
            {
              var p = t.stateNode;
              p.effectDuration = 0, p.passiveEffectDuration = 0;
            }
          }
          break;
        case Oe: {
          var v = t.memoizedState;
          if (v !== null) {
            if (v.dehydrated !== null)
              return Fo(t, Of(tl.current)), t.flags |= Ye, null;
            var y = t.child, g = y.childLanes;
            if (la(a, g))
              return RC(e, t, a);
            Fo(t, Of(tl.current));
            var b = _u(e, t, a);
            return b !== null ? b.sibling : null;
          } else
            Fo(t, Of(tl.current));
          break;
        }
        case kt: {
          var x = (e.flags & Ye) !== Le, M = la(a, t.childLanes);
          if (x) {
            if (M)
              return bC(e, t, a);
            t.flags |= Ye;
          }
          var U = t.memoizedState;
          if (U !== null && (U.rendering = null, U.tail = null, U.lastEffect = null), Fo(t, tl.current), M)
            break;
          return null;
        }
        case ze:
        case et:
          return t.lanes = B, yC(e, t, a);
      }
      return _u(e, t, a);
    }
    function DC(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return Vw(e, t, t0(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, u = t.pendingProps;
        if (i !== u || Oh() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          al = !0;
        else {
          var s = wS(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & Ye) === Le)
            return al = !1, Pw(e, t, a);
          (e.flags & ds) !== Le ? al = !0 : al = !1;
        }
      } else if (al = !1, Ur() && dx(t)) {
        var f = t.index, p = px();
        rE(t, p, f);
      }
      switch (t.lanes = B, t.tag) {
        case Xe:
          return Rw(e, t, t.type, a);
        case an: {
          var v = t.elementType;
          return Ew(e, t, v, a);
        }
        case de: {
          var y = t.type, g = t.pendingProps, b = t.elementType === y ? g : rl(y, g);
          return yS(e, t, y, b, a);
        }
        case oe: {
          var x = t.type, M = t.pendingProps, U = t.elementType === x ? M : rl(x, M);
          return SC(e, t, x, U, a);
        }
        case te:
          return yw(e, t, a);
        case le:
          return gw(e, t, a);
        case Ve:
          return Sw(e, t);
        case Oe:
          return RC(e, t, a);
        case ve:
          return jw(e, t, a);
        case qe: {
          var F = t.type, ue = t.pendingProps, Me = t.elementType === F ? ue : rl(F, ue);
          return vC(e, t, F, Me, a);
        }
        case Ee:
          return vw(e, t, a);
        case Ze:
          return hw(e, t, a);
        case mt:
          return mw(e, t, a);
        case nt:
          return Fw(e, t, a);
        case rn:
          return Hw(e, t, a);
        case ft: {
          var be = t.type, wt = t.pendingProps, gt = rl(be, wt);
          if (t.type !== t.elementType) {
            var D = be.propTypes;
            D && Zi(
              D,
              gt,
              // Resolved for outer only
              "prop",
              Ct(be)
            );
          }
          return gt = rl(be.type, gt), hC(e, t, be, gt, a);
        }
        case Pe:
          return mC(e, t, t.type, t.pendingProps, a);
        case kn: {
          var H = t.type, O = t.pendingProps, G = t.elementType === H ? O : rl(H, O);
          return Cw(e, t, H, G, a);
        }
        case kt:
          return bC(e, t, a);
        case Rn:
          break;
        case ze:
          return yC(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Af(e) {
      e.flags |= tt;
    }
    function OC(e) {
      e.flags |= Zr, e.flags |= md;
    }
    var LC, bS, MC, NC;
    LC = function(e, t, a, i) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === le || u.tag === Ve)
          sT(e, u.stateNode);
        else if (u.tag !== ve) {
          if (u.child !== null) {
            u.child.return = u, u = u.child;
            continue;
          }
        }
        if (u === t)
          return;
        for (; u.sibling === null; ) {
          if (u.return === null || u.return === t)
            return;
          u = u.return;
        }
        u.sibling.return = u.return, u = u.sibling;
      }
    }, bS = function(e, t) {
    }, MC = function(e, t, a, i, u) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, p = Eg(), v = fT(f, a, s, i, u, p);
        t.updateQueue = v, v && Af(t);
      }
    }, NC = function(e, t, a, i) {
      a !== i && Af(t);
    };
    function Lp(e, t) {
      if (!Ur())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? e.tail = null : i.sibling = null;
            break;
          }
          case "collapsed": {
            for (var u = e.tail, s = null; u !== null; )
              u.alternate !== null && (s = u), u = u.sibling;
            s === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : s.sibling = null;
            break;
          }
        }
    }
    function jr(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = B, i = Le;
      if (t) {
        if ((e.mode & Qe) !== Re) {
          for (var v = e.selfBaseDuration, y = e.child; y !== null; )
            a = Je(a, Je(y.lanes, y.childLanes)), i |= y.subtreeFlags & ir, i |= y.flags & ir, v += y.treeBaseDuration, y = y.sibling;
          e.treeBaseDuration = v;
        } else
          for (var g = e.child; g !== null; )
            a = Je(a, Je(g.lanes, g.childLanes)), i |= g.subtreeFlags & ir, i |= g.flags & ir, g.return = e, g = g.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & Qe) !== Re) {
          for (var u = e.actualDuration, s = e.selfBaseDuration, f = e.child; f !== null; )
            a = Je(a, Je(f.lanes, f.childLanes)), i |= f.subtreeFlags, i |= f.flags, u += f.actualDuration, s += f.treeBaseDuration, f = f.sibling;
          e.actualDuration = u, e.treeBaseDuration = s;
        } else
          for (var p = e.child; p !== null; )
            a = Je(a, Je(p.lanes, p.childLanes)), i |= p.subtreeFlags, i |= p.flags, p.return = e, p = p.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function Bw(e, t, a) {
      if (bx() && (t.mode & we) !== Re && (t.flags & Ye) === Le)
        return cE(t), wf(), t.flags |= xn | ga | Jn, !1;
      var i = jh(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (xx(t), jr(t), (t.mode & Qe) !== Re) {
            var u = a !== null;
            if (u) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (wf(), (t.flags & Ye) === Le && (t.memoizedState = null), t.flags |= tt, jr(t), (t.mode & Qe) !== Re) {
            var f = a !== null;
            if (f) {
              var p = t.child;
              p !== null && (t.treeBaseDuration -= p.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return fE(), !0;
    }
    function zC(e, t, a) {
      var i = t.pendingProps;
      switch (Zy(t), t.tag) {
        case Xe:
        case an:
        case Pe:
        case de:
        case qe:
        case Ee:
        case Ze:
        case mt:
        case rn:
        case ft:
          return jr(t), null;
        case oe: {
          var u = t.type;
          return Fl(u) && Lh(t), jr(t), null;
        }
        case te: {
          var s = t.stateNode;
          if (Df(t), Gy(t), wg(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = jh(t);
            if (f)
              Af(t);
            else if (e !== null) {
              var p = e.memoizedState;
              // Check if this is a client root
              (!p.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & xn) !== Le) && (t.flags |= Ua, fE());
            }
          }
          return bS(e, t), jr(t), null;
        }
        case le: {
          Cg(t);
          var v = bE(), y = t.type;
          if (e !== null && t.stateNode != null)
            MC(e, t, y, i, v), e.ref !== t.ref && OC(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return jr(t), null;
            }
            var g = Eg(), b = jh(t);
            if (b)
              Rx(t, v, g) && Af(t);
            else {
              var x = oT(y, i, v, g, t);
              LC(x, t, !1, !1), t.stateNode = x, cT(x, y, i, v) && Af(t);
            }
            t.ref !== null && OC(t);
          }
          return jr(t), null;
        }
        case Ve: {
          var M = i;
          if (e && t.stateNode != null) {
            var U = e.memoizedProps;
            NC(e, t, U, M);
          } else {
            if (typeof M != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var F = bE(), ue = Eg(), Me = jh(t);
            Me ? Tx(t) && Af(t) : t.stateNode = dT(M, F, ue, t);
          }
          return jr(t), null;
        }
        case Oe: {
          Lf(t);
          var be = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var wt = Bw(e, t, be);
            if (!wt)
              return t.flags & Jn ? t : null;
          }
          if ((t.flags & Ye) !== Le)
            return t.lanes = a, (t.mode & Qe) !== Re && Kg(t), t;
          var gt = be !== null, D = e !== null && e.memoizedState !== null;
          if (gt !== D && gt) {
            var H = t.child;
            if (H.flags |= bl, (t.mode & we) !== Re) {
              var O = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !_);
              O || Rg(tl.current, DE) ? $b() : IS();
            }
          }
          var G = t.updateQueue;
          if (G !== null && (t.flags |= tt), jr(t), (t.mode & Qe) !== Re && gt) {
            var pe = t.child;
            pe !== null && (t.treeBaseDuration -= pe.treeBaseDuration);
          }
          return null;
        }
        case ve:
          return Df(t), bS(e, t), e === null && ix(t.stateNode.containerInfo), jr(t), null;
        case nt:
          var se = t.type._context;
          return dg(se, t), jr(t), null;
        case kn: {
          var $e = t.type;
          return Fl($e) && Lh(t), jr(t), null;
        }
        case kt: {
          Lf(t);
          var Ke = t.memoizedState;
          if (Ke === null)
            return jr(t), null;
          var qt = (t.flags & Ye) !== Le, Mt = Ke.rendering;
          if (Mt === null)
            if (qt)
              Lp(Ke, !1);
            else {
              var Wn = Yb() && (e === null || (e.flags & Ye) === Le);
              if (!Wn)
                for (var Nt = t.child; Nt !== null; ) {
                  var Vn = Jh(Nt);
                  if (Vn !== null) {
                    qt = !0, t.flags |= Ye, Lp(Ke, !1);
                    var fa = Vn.updateQueue;
                    return fa !== null && (t.updateQueue = fa, t.flags |= tt), t.subtreeFlags = Le, Nx(t, a), Fo(t, Tg(tl.current, gp)), t.child;
                  }
                  Nt = Nt.sibling;
                }
              Ke.tail !== null && Sn() > t1() && (t.flags |= Ye, qt = !0, Lp(Ke, !1), t.lanes = Av);
            }
          else {
            if (!qt) {
              var Br = Jh(Mt);
              if (Br !== null) {
                t.flags |= Ye, qt = !0;
                var fi = Br.updateQueue;
                if (fi !== null && (t.updateQueue = fi, t.flags |= tt), Lp(Ke, !0), Ke.tail === null && Ke.tailMode === "hidden" && !Mt.alternate && !Ur())
                  return jr(t), null;
              } else
                // The time it took to render last row is greater than the remaining
                // time we have to render. So rendering one more row would likely
                // exceed it.
                Sn() * 2 - Ke.renderingStartTime > t1() && a !== Tr && (t.flags |= Ye, qt = !0, Lp(Ke, !1), t.lanes = Av);
            }
            if (Ke.isBackwards)
              Mt.sibling = t.child, t.child = Mt;
            else {
              var _a = Ke.last;
              _a !== null ? _a.sibling = Mt : t.child = Mt, Ke.last = Mt;
            }
          }
          if (Ke.tail !== null) {
            var ka = Ke.tail;
            Ke.rendering = ka, Ke.tail = ka.sibling, Ke.renderingStartTime = Sn(), ka.sibling = null;
            var da = tl.current;
            return qt ? da = Tg(da, gp) : da = Of(da), Fo(t, da), ka;
          }
          return jr(t), null;
        }
        case Rn:
          break;
        case ze:
        case et: {
          $S(t);
          var Mu = t.memoizedState, If = Mu !== null;
          if (e !== null) {
            var Wp = e.memoizedState, Ql = Wp !== null;
            Ql !== If && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !ae && (t.flags |= bl);
          }
          return !If || (t.mode & we) === Re ? jr(t) : la(Yl, Tr) && (jr(t), t.subtreeFlags & (un | tt) && (t.flags |= bl)), null;
        }
        case Ft:
          return null;
        case bt:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function $w(e, t, a) {
      switch (Zy(t), t.tag) {
        case oe: {
          var i = t.type;
          Fl(i) && Lh(t);
          var u = t.flags;
          return u & Jn ? (t.flags = u & ~Jn | Ye, (t.mode & Qe) !== Re && Kg(t), t) : null;
        }
        case te: {
          t.stateNode, Df(t), Gy(t), wg();
          var s = t.flags;
          return (s & Jn) !== Le && (s & Ye) === Le ? (t.flags = s & ~Jn | Ye, t) : null;
        }
        case le:
          return Cg(t), null;
        case Oe: {
          Lf(t);
          var f = t.memoizedState;
          if (f !== null && f.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            wf();
          }
          var p = t.flags;
          return p & Jn ? (t.flags = p & ~Jn | Ye, (t.mode & Qe) !== Re && Kg(t), t) : null;
        }
        case kt:
          return Lf(t), null;
        case ve:
          return Df(t), null;
        case nt:
          var v = t.type._context;
          return dg(v, t), null;
        case ze:
        case et:
          return $S(t), null;
        case Ft:
          return null;
        default:
          return null;
      }
    }
    function UC(e, t, a) {
      switch (Zy(t), t.tag) {
        case oe: {
          var i = t.type.childContextTypes;
          i != null && Lh(t);
          break;
        }
        case te: {
          t.stateNode, Df(t), Gy(t), wg();
          break;
        }
        case le: {
          Cg(t);
          break;
        }
        case ve:
          Df(t);
          break;
        case Oe:
          Lf(t);
          break;
        case kt:
          Lf(t);
          break;
        case nt:
          var u = t.type._context;
          dg(u, t);
          break;
        case ze:
        case et:
          $S(t);
          break;
      }
    }
    var AC = null;
    AC = /* @__PURE__ */ new Set();
    var Tm = !1, Fr = !1, Iw = typeof WeakSet == "function" ? WeakSet : Set, Se = null, jf = null, Ff = null;
    function Yw(e) {
      ru(null, function() {
        throw e;
      }), vd();
    }
    var Qw = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & Qe)
        try {
          $l(), t.componentWillUnmount();
        } finally {
          Bl(e);
        }
      else
        t.componentWillUnmount();
    };
    function jC(e, t) {
      try {
        Po(sr, e);
      } catch (a) {
        cn(e, t, a);
      }
    }
    function _S(e, t, a) {
      try {
        Qw(e, a);
      } catch (i) {
        cn(e, t, i);
      }
    }
    function Ww(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        cn(e, t, i);
      }
    }
    function FC(e, t) {
      try {
        VC(e);
      } catch (a) {
        cn(e, t, a);
      }
    }
    function Hf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (rt && St && e.mode & Qe)
              try {
                $l(), i = a(null);
              } finally {
                Bl(e);
              }
            else
              i = a(null);
          } catch (u) {
            cn(e, t, u);
          }
          typeof i == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", We(e));
        } else
          a.current = null;
    }
    function xm(e, t, a) {
      try {
        a();
      } catch (i) {
        cn(e, t, i);
      }
    }
    var HC = !1;
    function Gw(e, t) {
      lT(e.containerInfo), Se = t, qw();
      var a = HC;
      return HC = !1, a;
    }
    function qw() {
      for (; Se !== null; ) {
        var e = Se, t = e.child;
        (e.subtreeFlags & Ju) !== Le && t !== null ? (t.return = e, Se = t) : Kw();
      }
    }
    function Kw() {
      for (; Se !== null; ) {
        var e = Se;
        Bt(e);
        try {
          Xw(e);
        } catch (a) {
          cn(e, e.return, a);
        }
        Tn();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Se = t;
          return;
        }
        Se = e.return;
      }
    }
    function Xw(e) {
      var t = e.alternate, a = e.flags;
      if ((a & Ua) !== Le) {
        switch (Bt(e), e.tag) {
          case de:
          case qe:
          case Pe:
            break;
          case oe: {
            if (t !== null) {
              var i = t.memoizedProps, u = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !Ws && (s.props !== e.memoizedProps && S("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", We(e) || "instance"), s.state !== e.memoizedState && S("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", We(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : rl(e.type, i), u);
              {
                var p = AC;
                f === void 0 && !p.has(e.type) && (p.add(e.type), S("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", We(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case te: {
            {
              var v = e.stateNode;
              LT(v.containerInfo);
            }
            break;
          }
          case le:
          case Ve:
          case ve:
          case kn:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        Tn();
      }
    }
    function il(e, t, a) {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var p = f.destroy;
            f.destroy = void 0, p !== void 0 && ((e & Ar) !== qa ? Nv(t) : (e & sr) !== qa && oi(t), (e & Hl) !== qa && Ip(!0), xm(t, a, p), (e & Hl) !== qa && Ip(!1), (e & Ar) !== qa ? xc() : (e & sr) !== qa && ro());
          }
          f = f.next;
        } while (f !== s);
      }
    }
    function Po(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next, s = u;
        do {
          if ((s.tag & e) === e) {
            (e & Ar) !== qa ? Dl(t) : (e & sr) !== qa && zv(t);
            var f = s.create;
            (e & Hl) !== qa && Ip(!0), s.destroy = f(), (e & Hl) !== qa && Ip(!1), (e & Ar) !== qa ? Tc() : (e & sr) !== qa && ps();
            {
              var p = s.destroy;
              if (p !== void 0 && typeof p != "function") {
                var v = void 0;
                (s.tag & sr) !== Le ? v = "useLayoutEffect" : (s.tag & Hl) !== Le ? v = "useInsertionEffect" : v = "useEffect";
                var y = void 0;
                p === null ? y = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof p.then == "function" ? y = `

It looks like you wrote ` + v + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + v + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : y = " You returned: " + p, S("%s must not return anything besides a function, which is used for clean-up.%s", v, y);
              }
            }
          }
          s = s.next;
        } while (s !== u);
      }
    }
    function Zw(e, t) {
      if ((t.flags & tt) !== Le)
        switch (t.tag) {
          case mt: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, u = i.id, s = i.onPostCommit, f = tC(), p = t.alternate === null ? "mount" : "update";
            eC() && (p = "nested-update"), typeof s == "function" && s(u, p, a, f);
            var v = t.return;
            e:
              for (; v !== null; ) {
                switch (v.tag) {
                  case te:
                    var y = v.stateNode;
                    y.passiveEffectDuration += a;
                    break e;
                  case mt:
                    var g = v.stateNode;
                    g.passiveEffectDuration += a;
                    break e;
                }
                v = v.return;
              }
            break;
          }
        }
    }
    function Jw(e, t, a, i) {
      if ((a.flags & Cr) !== Le)
        switch (a.tag) {
          case de:
          case qe:
          case Pe: {
            if (!Fr)
              if (a.mode & Qe)
                try {
                  $l(), Po(sr | or, a);
                } finally {
                  Bl(a);
                }
              else
                Po(sr | or, a);
            break;
          }
          case oe: {
            var u = a.stateNode;
            if (a.flags & tt && !Fr)
              if (t === null)
                if (a.type === a.elementType && !Ws && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", We(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", We(a) || "instance")), a.mode & Qe)
                  try {
                    $l(), u.componentDidMount();
                  } finally {
                    Bl(a);
                  }
                else
                  u.componentDidMount();
              else {
                var s = a.elementType === a.type ? t.memoizedProps : rl(a.type, t.memoizedProps), f = t.memoizedState;
                if (a.type === a.elementType && !Ws && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", We(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", We(a) || "instance")), a.mode & Qe)
                  try {
                    $l(), u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Bl(a);
                  }
                else
                  u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
              }
            var p = a.updateQueue;
            p !== null && (a.type === a.elementType && !Ws && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", We(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", We(a) || "instance")), wE(a, p, u));
            break;
          }
          case te: {
            var v = a.updateQueue;
            if (v !== null) {
              var y = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case le:
                    y = a.child.stateNode;
                    break;
                  case oe:
                    y = a.child.stateNode;
                    break;
                }
              wE(a, v, y);
            }
            break;
          }
          case le: {
            var g = a.stateNode;
            if (t === null && a.flags & tt) {
              var b = a.type, x = a.memoizedProps;
              yT(g, b, x);
            }
            break;
          }
          case Ve:
            break;
          case ve:
            break;
          case mt: {
            {
              var M = a.memoizedProps, U = M.onCommit, F = M.onRender, ue = a.stateNode.effectDuration, Me = tC(), be = t === null ? "mount" : "update";
              eC() && (be = "nested-update"), typeof F == "function" && F(a.memoizedProps.id, be, a.actualDuration, a.treeBaseDuration, a.actualStartTime, Me);
              {
                typeof U == "function" && U(a.memoizedProps.id, be, ue, Me), Kb(a);
                var wt = a.return;
                e:
                  for (; wt !== null; ) {
                    switch (wt.tag) {
                      case te:
                        var gt = wt.stateNode;
                        gt.effectDuration += ue;
                        break e;
                      case mt:
                        var D = wt.stateNode;
                        D.effectDuration += ue;
                        break e;
                    }
                    wt = wt.return;
                  }
              }
            }
            break;
          }
          case Oe: {
            ub(e, a);
            break;
          }
          case kt:
          case kn:
          case Rn:
          case ze:
          case et:
          case bt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      Fr || a.flags & Zr && VC(a);
    }
    function eb(e) {
      switch (e.tag) {
        case de:
        case qe:
        case Pe: {
          if (e.mode & Qe)
            try {
              $l(), jC(e, e.return);
            } finally {
              Bl(e);
            }
          else
            jC(e, e.return);
          break;
        }
        case oe: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && Ww(e, e.return, t), FC(e, e.return);
          break;
        }
        case le: {
          FC(e, e.return);
          break;
        }
      }
    }
    function tb(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === le) {
          if (a === null) {
            a = i;
            try {
              var u = i.stateNode;
              t ? _T(u) : DT(i.stateNode, i.memoizedProps);
            } catch (f) {
              cn(e, e.return, f);
            }
          }
        } else if (i.tag === Ve) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? kT(s) : OT(s, i.memoizedProps);
            } catch (f) {
              cn(e, e.return, f);
            }
        } else if (!((i.tag === ze || i.tag === et) && i.memoizedState !== null && i !== e)) {
          if (i.child !== null) {
            i.child.return = i, i = i.child;
            continue;
          }
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          a === i && (a = null), i = i.return;
        }
        a === i && (a = null), i.sibling.return = i.return, i = i.sibling;
      }
    }
    function VC(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case le:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var u;
          if (e.mode & Qe)
            try {
              $l(), u = t(i);
            } finally {
              Bl(e);
            }
          else
            u = t(i);
          typeof u == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", We(e));
        } else
          t.hasOwnProperty("current") || S("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", We(e)), t.current = i;
      }
    }
    function nb(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function PC(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, PC(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === le) {
          var a = e.stateNode;
          a !== null && ox(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function rb(e) {
      for (var t = e.return; t !== null; ) {
        if (BC(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function BC(e) {
      return e.tag === le || e.tag === te || e.tag === ve;
    }
    function $C(e) {
      var t = e;
      e:
        for (; ; ) {
          for (; t.sibling === null; ) {
            if (t.return === null || BC(t.return))
              return null;
            t = t.return;
          }
          for (t.sibling.return = t.return, t = t.sibling; t.tag !== le && t.tag !== Ve && t.tag !== Wt; ) {
            if (t.flags & un || t.child === null || t.tag === ve)
              continue e;
            t.child.return = t, t = t.child;
          }
          if (!(t.flags & un))
            return t.stateNode;
        }
    }
    function ab(e) {
      var t = rb(e);
      switch (t.tag) {
        case le: {
          var a = t.stateNode;
          t.flags & $t && (Y0(a), t.flags &= ~$t);
          var i = $C(e);
          DS(e, i, a);
          break;
        }
        case te:
        case ve: {
          var u = t.stateNode.containerInfo, s = $C(e);
          kS(e, s, u);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function kS(e, t, a) {
      var i = e.tag, u = i === le || i === Ve;
      if (u) {
        var s = e.stateNode;
        t ? TT(a, s, t) : CT(a, s);
      } else if (i !== ve) {
        var f = e.child;
        if (f !== null) {
          kS(f, t, a);
          for (var p = f.sibling; p !== null; )
            kS(p, t, a), p = p.sibling;
        }
      }
    }
    function DS(e, t, a) {
      var i = e.tag, u = i === le || i === Ve;
      if (u) {
        var s = e.stateNode;
        t ? RT(a, s, t) : ET(a, s);
      } else if (i !== ve) {
        var f = e.child;
        if (f !== null) {
          DS(f, t, a);
          for (var p = f.sibling; p !== null; )
            DS(p, t, a), p = p.sibling;
        }
      }
    }
    var Hr = null, ll = !1;
    function ib(e, t, a) {
      {
        var i = t;
        e:
          for (; i !== null; ) {
            switch (i.tag) {
              case le: {
                Hr = i.stateNode, ll = !1;
                break e;
              }
              case te: {
                Hr = i.stateNode.containerInfo, ll = !0;
                break e;
              }
              case ve: {
                Hr = i.stateNode.containerInfo, ll = !0;
                break e;
              }
            }
            i = i.return;
          }
        if (Hr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        IC(e, t, a), Hr = null, ll = !1;
      }
      nb(a);
    }
    function Bo(e, t, a) {
      for (var i = a.child; i !== null; )
        IC(e, t, i), i = i.sibling;
    }
    function IC(e, t, a) {
      switch (lu(a), a.tag) {
        case le:
          Fr || Hf(a, t);
        case Ve: {
          {
            var i = Hr, u = ll;
            Hr = null, Bo(e, t, a), Hr = i, ll = u, Hr !== null && (ll ? wT(Hr, a.stateNode) : xT(Hr, a.stateNode));
          }
          return;
        }
        case Wt: {
          Hr !== null && (ll ? bT(Hr, a.stateNode) : Vy(Hr, a.stateNode));
          return;
        }
        case ve: {
          {
            var s = Hr, f = ll;
            Hr = a.stateNode.containerInfo, ll = !0, Bo(e, t, a), Hr = s, ll = f;
          }
          return;
        }
        case de:
        case qe:
        case ft:
        case Pe: {
          if (!Fr) {
            var p = a.updateQueue;
            if (p !== null) {
              var v = p.lastEffect;
              if (v !== null) {
                var y = v.next, g = y;
                do {
                  var b = g, x = b.destroy, M = b.tag;
                  x !== void 0 && ((M & Hl) !== qa ? xm(a, t, x) : (M & sr) !== qa && (oi(a), a.mode & Qe ? ($l(), xm(a, t, x), Bl(a)) : xm(a, t, x), ro())), g = g.next;
                } while (g !== y);
              }
            }
          }
          Bo(e, t, a);
          return;
        }
        case oe: {
          if (!Fr) {
            Hf(a, t);
            var U = a.stateNode;
            typeof U.componentWillUnmount == "function" && _S(a, t, U);
          }
          Bo(e, t, a);
          return;
        }
        case Rn: {
          Bo(e, t, a);
          return;
        }
        case ze: {
          if (
            // TODO: Remove this dead flag
            a.mode & we
          ) {
            var F = Fr;
            Fr = F || a.memoizedState !== null, Bo(e, t, a), Fr = F;
          } else
            Bo(e, t, a);
          break;
        }
        default: {
          Bo(e, t, a);
          return;
        }
      }
    }
    function lb(e) {
      e.memoizedState;
    }
    function ub(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var u = i.memoizedState;
          if (u !== null) {
            var s = u.dehydrated;
            s !== null && YT(s);
          }
        }
      }
    }
    function YC(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new Iw()), t.forEach(function(i) {
          var u = r_.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), Ca)
              if (jf !== null && Ff !== null)
                $p(Ff, jf);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(u, u);
          }
        });
      }
    }
    function ob(e, t, a) {
      jf = a, Ff = e, Bt(t), QC(t, e), Bt(t), jf = null, Ff = null;
    }
    function ul(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u];
          try {
            ib(e, t, s);
          } catch (v) {
            cn(s, t, v);
          }
        }
      var f = tc();
      if (t.subtreeFlags & ta)
        for (var p = t.child; p !== null; )
          Bt(p), QC(p, e), p = p.sibling;
      Bt(f);
    }
    function QC(e, t, a) {
      var i = e.alternate, u = e.flags;
      switch (e.tag) {
        case de:
        case qe:
        case ft:
        case Pe: {
          if (ul(t, e), Il(e), u & tt) {
            try {
              il(Hl | or, e, e.return), Po(Hl | or, e);
            } catch ($e) {
              cn(e, e.return, $e);
            }
            if (e.mode & Qe) {
              try {
                $l(), il(sr | or, e, e.return);
              } catch ($e) {
                cn(e, e.return, $e);
              }
              Bl(e);
            } else
              try {
                il(sr | or, e, e.return);
              } catch ($e) {
                cn(e, e.return, $e);
              }
          }
          return;
        }
        case oe: {
          ul(t, e), Il(e), u & Zr && i !== null && Hf(i, i.return);
          return;
        }
        case le: {
          ul(t, e), Il(e), u & Zr && i !== null && Hf(i, i.return);
          {
            if (e.flags & $t) {
              var s = e.stateNode;
              try {
                Y0(s);
              } catch ($e) {
                cn(e, e.return, $e);
              }
            }
            if (u & tt) {
              var f = e.stateNode;
              if (f != null) {
                var p = e.memoizedProps, v = i !== null ? i.memoizedProps : p, y = e.type, g = e.updateQueue;
                if (e.updateQueue = null, g !== null)
                  try {
                    gT(f, g, y, v, p, e);
                  } catch ($e) {
                    cn(e, e.return, $e);
                  }
              }
            }
          }
          return;
        }
        case Ve: {
          if (ul(t, e), Il(e), u & tt) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var b = e.stateNode, x = e.memoizedProps, M = i !== null ? i.memoizedProps : x;
            try {
              ST(b, M, x);
            } catch ($e) {
              cn(e, e.return, $e);
            }
          }
          return;
        }
        case te: {
          if (ul(t, e), Il(e), u & tt && i !== null) {
            var U = i.memoizedState;
            if (U.isDehydrated)
              try {
                IT(t.containerInfo);
              } catch ($e) {
                cn(e, e.return, $e);
              }
          }
          return;
        }
        case ve: {
          ul(t, e), Il(e);
          return;
        }
        case Oe: {
          ul(t, e), Il(e);
          var F = e.child;
          if (F.flags & bl) {
            var ue = F.stateNode, Me = F.memoizedState, be = Me !== null;
            if (ue.isHidden = be, be) {
              var wt = F.alternate !== null && F.alternate.memoizedState !== null;
              wt || Bb();
            }
          }
          if (u & tt) {
            try {
              lb(e);
            } catch ($e) {
              cn(e, e.return, $e);
            }
            YC(e);
          }
          return;
        }
        case ze: {
          var gt = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & we
          ) {
            var D = Fr;
            Fr = D || gt, ul(t, e), Fr = D;
          } else
            ul(t, e);
          if (Il(e), u & bl) {
            var H = e.stateNode, O = e.memoizedState, G = O !== null, pe = e;
            if (H.isHidden = G, G && !gt && (pe.mode & we) !== Re) {
              Se = pe;
              for (var se = pe.child; se !== null; )
                Se = se, cb(se), se = se.sibling;
            }
            tb(pe, G);
          }
          return;
        }
        case kt: {
          ul(t, e), Il(e), u & tt && YC(e);
          return;
        }
        case Rn:
          return;
        default: {
          ul(t, e), Il(e);
          return;
        }
      }
    }
    function Il(e) {
      var t = e.flags;
      if (t & un) {
        try {
          ab(e);
        } catch (a) {
          cn(e, e.return, a);
        }
        e.flags &= ~un;
      }
      t & Aa && (e.flags &= ~Aa);
    }
    function sb(e, t, a) {
      jf = a, Ff = t, Se = e, WC(e, t, a), jf = null, Ff = null;
    }
    function WC(e, t, a) {
      for (var i = (e.mode & we) !== Re; Se !== null; ) {
        var u = Se, s = u.child;
        if (u.tag === ze && i) {
          var f = u.memoizedState !== null, p = f || Tm;
          if (p) {
            OS(e, t, a);
            continue;
          } else {
            var v = u.alternate, y = v !== null && v.memoizedState !== null, g = y || Fr, b = Tm, x = Fr;
            Tm = p, Fr = g, Fr && !x && (Se = u, fb(u));
            for (var M = s; M !== null; )
              Se = M, WC(
                M,
                // New root; bubble back up to here and stop.
                t,
                a
              ), M = M.sibling;
            Se = u, Tm = b, Fr = x, OS(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & Cr) !== Le && s !== null ? (s.return = u, Se = s) : OS(e, t, a);
      }
    }
    function OS(e, t, a) {
      for (; Se !== null; ) {
        var i = Se;
        if ((i.flags & Cr) !== Le) {
          var u = i.alternate;
          Bt(i);
          try {
            Jw(t, u, i, a);
          } catch (f) {
            cn(i, i.return, f);
          }
          Tn();
        }
        if (i === e) {
          Se = null;
          return;
        }
        var s = i.sibling;
        if (s !== null) {
          s.return = i.return, Se = s;
          return;
        }
        Se = i.return;
      }
    }
    function cb(e) {
      for (; Se !== null; ) {
        var t = Se, a = t.child;
        switch (t.tag) {
          case de:
          case qe:
          case ft:
          case Pe: {
            if (t.mode & Qe)
              try {
                $l(), il(sr, t, t.return);
              } finally {
                Bl(t);
              }
            else
              il(sr, t, t.return);
            break;
          }
          case oe: {
            Hf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && _S(t, t.return, i);
            break;
          }
          case le: {
            Hf(t, t.return);
            break;
          }
          case ze: {
            var u = t.memoizedState !== null;
            if (u) {
              GC(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, Se = a) : GC(e);
      }
    }
    function GC(e) {
      for (; Se !== null; ) {
        var t = Se;
        if (t === e) {
          Se = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Se = a;
          return;
        }
        Se = t.return;
      }
    }
    function fb(e) {
      for (; Se !== null; ) {
        var t = Se, a = t.child;
        if (t.tag === ze) {
          var i = t.memoizedState !== null;
          if (i) {
            qC(e);
            continue;
          }
        }
        a !== null ? (a.return = t, Se = a) : qC(e);
      }
    }
    function qC(e) {
      for (; Se !== null; ) {
        var t = Se;
        Bt(t);
        try {
          eb(t);
        } catch (i) {
          cn(t, t.return, i);
        }
        if (Tn(), t === e) {
          Se = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Se = a;
          return;
        }
        Se = t.return;
      }
    }
    function db(e, t, a, i) {
      Se = t, pb(t, e, a, i);
    }
    function pb(e, t, a, i) {
      for (; Se !== null; ) {
        var u = Se, s = u.child;
        (u.subtreeFlags & ja) !== Le && s !== null ? (s.return = u, Se = s) : vb(e, t, a, i);
      }
    }
    function vb(e, t, a, i) {
      for (; Se !== null; ) {
        var u = Se;
        if ((u.flags & dn) !== Le) {
          Bt(u);
          try {
            hb(t, u, a, i);
          } catch (f) {
            cn(u, u.return, f);
          }
          Tn();
        }
        if (u === e) {
          Se = null;
          return;
        }
        var s = u.sibling;
        if (s !== null) {
          s.return = u.return, Se = s;
          return;
        }
        Se = u.return;
      }
    }
    function hb(e, t, a, i) {
      switch (t.tag) {
        case de:
        case qe:
        case Pe: {
          if (t.mode & Qe) {
            qg();
            try {
              Po(Ar | or, t);
            } finally {
              Gg(t);
            }
          } else
            Po(Ar | or, t);
          break;
        }
      }
    }
    function mb(e) {
      Se = e, yb();
    }
    function yb() {
      for (; Se !== null; ) {
        var e = Se, t = e.child;
        if ((Se.flags & jt) !== Le) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var u = a[i];
              Se = u, Eb(u, e);
            }
            {
              var s = e.alternate;
              if (s !== null) {
                var f = s.child;
                if (f !== null) {
                  s.child = null;
                  do {
                    var p = f.sibling;
                    f.sibling = null, f = p;
                  } while (f !== null);
                }
              }
            }
            Se = e;
          }
        }
        (e.subtreeFlags & ja) !== Le && t !== null ? (t.return = e, Se = t) : gb();
      }
    }
    function gb() {
      for (; Se !== null; ) {
        var e = Se;
        (e.flags & dn) !== Le && (Bt(e), Sb(e), Tn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Se = t;
          return;
        }
        Se = e.return;
      }
    }
    function Sb(e) {
      switch (e.tag) {
        case de:
        case qe:
        case Pe: {
          e.mode & Qe ? (qg(), il(Ar | or, e, e.return), Gg(e)) : il(Ar | or, e, e.return);
          break;
        }
      }
    }
    function Eb(e, t) {
      for (; Se !== null; ) {
        var a = Se;
        Bt(a), Rb(a, t), Tn();
        var i = a.child;
        i !== null ? (i.return = a, Se = i) : Cb(e);
      }
    }
    function Cb(e) {
      for (; Se !== null; ) {
        var t = Se, a = t.sibling, i = t.return;
        if (PC(t), t === e) {
          Se = null;
          return;
        }
        if (a !== null) {
          a.return = i, Se = a;
          return;
        }
        Se = i;
      }
    }
    function Rb(e, t) {
      switch (e.tag) {
        case de:
        case qe:
        case Pe: {
          e.mode & Qe ? (qg(), il(Ar, e, t), Gg(e)) : il(Ar, e, t);
          break;
        }
      }
    }
    function Tb(e) {
      switch (e.tag) {
        case de:
        case qe:
        case Pe: {
          try {
            Po(sr | or, e);
          } catch (a) {
            cn(e, e.return, a);
          }
          break;
        }
        case oe: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            cn(e, e.return, a);
          }
          break;
        }
      }
    }
    function xb(e) {
      switch (e.tag) {
        case de:
        case qe:
        case Pe: {
          try {
            Po(Ar | or, e);
          } catch (t) {
            cn(e, e.return, t);
          }
          break;
        }
      }
    }
    function wb(e) {
      switch (e.tag) {
        case de:
        case qe:
        case Pe: {
          try {
            il(sr | or, e, e.return);
          } catch (a) {
            cn(e, e.return, a);
          }
          break;
        }
        case oe: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && _S(e, e.return, t);
          break;
        }
      }
    }
    function bb(e) {
      switch (e.tag) {
        case de:
        case qe:
        case Pe:
          try {
            il(Ar | or, e, e.return);
          } catch (t) {
            cn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var Mp = Symbol.for;
      Mp("selector.component"), Mp("selector.has_pseudo_class"), Mp("selector.role"), Mp("selector.test_id"), Mp("selector.text");
    }
    var _b = [];
    function kb() {
      _b.forEach(function(e) {
        return e();
      });
    }
    var Db = A.ReactCurrentActQueue;
    function Ob(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function KC() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && Db.current !== null && S("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var Lb = Math.ceil, LS = A.ReactCurrentDispatcher, MS = A.ReactCurrentOwner, Vr = A.ReactCurrentBatchConfig, ol = A.ReactCurrentActQueue, dr = (
      /*             */
      0
    ), XC = (
      /*               */
      1
    ), Pr = (
      /*                */
      2
    ), Li = (
      /*                */
      4
    ), ku = 0, Np = 1, Gs = 2, wm = 3, zp = 4, ZC = 5, NS = 6, xt = dr, wa = null, zn = null, pr = B, Yl = B, zS = Mo(B), vr = ku, Up = null, bm = B, Ap = B, _m = B, jp = null, Ka = null, US = 0, JC = 500, e1 = 1 / 0, Mb = 500, Du = null;
    function Fp() {
      e1 = Sn() + Mb;
    }
    function t1() {
      return e1;
    }
    var km = !1, AS = null, Vf = null, qs = !1, $o = null, Hp = B, jS = [], FS = null, Nb = 50, Vp = 0, HS = null, VS = !1, Dm = !1, zb = 50, Pf = 0, Om = null, Pp = nn, Lm = B, n1 = !1;
    function Mm() {
      return wa;
    }
    function ba() {
      return (xt & (Pr | Li)) !== dr ? Sn() : (Pp !== nn || (Pp = Sn()), Pp);
    }
    function Io(e) {
      var t = e.mode;
      if ((t & we) === Re)
        return De;
      if ((xt & Pr) !== dr && pr !== B)
        return po(pr);
      var a = Dx() !== kx;
      if (a) {
        if (Vr.transition !== null) {
          var i = Vr.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return Lm === Hn && (Lm = Iv()), Lm;
      }
      var u = Ba();
      if (u !== Hn)
        return u;
      var s = pT();
      return s;
    }
    function Ub(e) {
      var t = e.mode;
      return (t & we) === Re ? De : ia();
    }
    function hr(e, t, a, i) {
      i_(), n1 && S("useInsertionEffect must not schedule updates."), VS && (Dm = !0), vu(e, a, i), (xt & Pr) !== B && e === wa ? o_(t) : (Ca && Wc(e, t, a), s_(t), e === wa && ((xt & Pr) === dr && (Ap = Je(Ap, a)), vr === zp && Yo(e, pr)), Xa(e, i), a === De && xt === dr && (t.mode & we) === Re && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !ol.isBatchingLegacy && (Fp(), nE()));
    }
    function Ab(e, t, a) {
      var i = e.current;
      i.lanes = t, vu(e, t, a), Xa(e, a);
    }
    function jb(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (xt & Pr) !== dr
      );
    }
    function Xa(e, t) {
      var a = e.callbackNode;
      Hv(e, t);
      var i = du(e, e === wa ? pr : B);
      if (i === B) {
        a !== null && g1(a), e.callbackNode = null, e.callbackPriority = Hn;
        return;
      }
      var u = Ln(i), s = e.callbackPriority;
      if (s === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(ol.current !== null && a !== WS)) {
        a == null && s !== De && S("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && g1(a);
      var f;
      if (u === De)
        e.tag === No ? (ol.isBatchingLegacy !== null && (ol.didScheduleLegacyUpdate = !0), fx(i1.bind(null, e))) : tE(i1.bind(null, e)), ol.current !== null ? ol.current.push(zo) : hT(function() {
          (xt & (Pr | Li)) === dr && zo();
        }), f = null;
      else {
        var p;
        switch (ur(i)) {
          case Mn:
            p = Ec;
            break;
          case Gi:
            p = iu;
            break;
          case Ri:
            p = Ci;
            break;
          case vo:
            p = Cc;
            break;
          default:
            p = Ci;
            break;
        }
        f = GS(p, r1.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = f;
    }
    function r1(e, t) {
      if (tw(), Pp = nn, Lm = B, (xt & (Pr | Li)) !== dr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = Lu();
      if (i && e.callbackNode !== a)
        return null;
      var u = du(e, e === wa ? pr : B);
      if (u === B)
        return null;
      var s = !Cs(e, u) && !$v(e, u) && !t, f = s ? Wb(e, u) : zm(e, u);
      if (f !== ku) {
        if (f === Gs) {
          var p = Ll(e);
          p !== B && (u = p, f = PS(e, p));
        }
        if (f === Np) {
          var v = Up;
          throw Ks(e, B), Yo(e, u), Xa(e, Sn()), v;
        }
        if (f === NS)
          Yo(e, u);
        else {
          var y = !Cs(e, u), g = e.current.alternate;
          if (y && !Hb(g)) {
            if (f = zm(e, u), f === Gs) {
              var b = Ll(e);
              b !== B && (u = b, f = PS(e, b));
            }
            if (f === Np) {
              var x = Up;
              throw Ks(e, B), Yo(e, u), Xa(e, Sn()), x;
            }
          }
          e.finishedWork = g, e.finishedLanes = u, Fb(e, f, u);
        }
      }
      return Xa(e, Sn()), e.callbackNode === a ? r1.bind(null, e) : null;
    }
    function PS(e, t) {
      var a = jp;
      if (Gc(e)) {
        var i = Ks(e, t);
        i.flags |= xn, ax(e.containerInfo);
      }
      var u = zm(e, t);
      if (u !== Gs) {
        var s = Ka;
        Ka = a, s !== null && a1(s);
      }
      return u;
    }
    function a1(e) {
      Ka === null ? Ka = e : Ka.push.apply(Ka, e);
    }
    function Fb(e, t, a) {
      switch (t) {
        case ku:
        case Np:
          throw new Error("Root did not complete. This is a bug in React.");
        case Gs: {
          Xs(e, Ka, Du);
          break;
        }
        case wm: {
          if (Yo(e, a), Vv(a) && // do not delay if we're inside an act() scope
          !S1()) {
            var i = US + JC - Sn();
            if (i > 10) {
              var u = du(e, B);
              if (u !== B)
                break;
              var s = e.suspendedLanes;
              if (!pu(s, a)) {
                ba(), Yc(e, s);
                break;
              }
              e.timeoutHandle = Fy(Xs.bind(null, e, Ka, Du), i);
              break;
            }
          }
          Xs(e, Ka, Du);
          break;
        }
        case zp: {
          if (Yo(e, a), Bv(a))
            break;
          if (!S1()) {
            var f = jv(e, a), p = f, v = Sn() - p, y = a_(v) - v;
            if (y > 10) {
              e.timeoutHandle = Fy(Xs.bind(null, e, Ka, Du), y);
              break;
            }
          }
          Xs(e, Ka, Du);
          break;
        }
        case ZC: {
          Xs(e, Ka, Du);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function Hb(e) {
      for (var t = e; ; ) {
        if (t.flags & fs) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var u = 0; u < i.length; u++) {
                var s = i[u], f = s.getSnapshot, p = s.value;
                try {
                  if (!ge(f(), p))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var v = t.child;
        if (t.subtreeFlags & fs && v !== null) {
          v.return = t, t = v;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function Yo(e, t) {
      t = Rs(t, _m), t = Rs(t, Ap), Qv(e, t);
    }
    function i1(e) {
      if (nw(), (xt & (Pr | Li)) !== dr)
        throw new Error("Should not already be working.");
      Lu();
      var t = du(e, B);
      if (!la(t, De))
        return Xa(e, Sn()), null;
      var a = zm(e, t);
      if (e.tag !== No && a === Gs) {
        var i = Ll(e);
        i !== B && (t = i, a = PS(e, i));
      }
      if (a === Np) {
        var u = Up;
        throw Ks(e, B), Yo(e, t), Xa(e, Sn()), u;
      }
      if (a === NS)
        throw new Error("Root did not complete. This is a bug in React.");
      var s = e.current.alternate;
      return e.finishedWork = s, e.finishedLanes = t, Xs(e, Ka, Du), Xa(e, Sn()), null;
    }
    function Vb(e, t) {
      t !== B && (Ld(e, Je(t, De)), Xa(e, Sn()), (xt & (Pr | Li)) === dr && (Fp(), zo()));
    }
    function BS(e, t) {
      var a = xt;
      xt |= XC;
      try {
        return e(t);
      } finally {
        xt = a, xt === dr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !ol.isBatchingLegacy && (Fp(), nE());
      }
    }
    function Pb(e, t, a, i, u) {
      var s = Ba(), f = Vr.transition;
      try {
        return Vr.transition = null, wn(Mn), e(t, a, i, u);
      } finally {
        wn(s), Vr.transition = f, xt === dr && Fp();
      }
    }
    function Ou(e) {
      $o !== null && $o.tag === No && (xt & (Pr | Li)) === dr && Lu();
      var t = xt;
      xt |= XC;
      var a = Vr.transition, i = Ba();
      try {
        return Vr.transition = null, wn(Mn), e ? e() : void 0;
      } finally {
        wn(i), Vr.transition = a, xt = t, (xt & (Pr | Li)) === dr && zo();
      }
    }
    function l1() {
      return (xt & (Pr | Li)) !== dr;
    }
    function Nm(e, t) {
      sa(zS, Yl, e), Yl = Je(Yl, t);
    }
    function $S(e) {
      Yl = zS.current, oa(zS, e);
    }
    function Ks(e, t) {
      e.finishedWork = null, e.finishedLanes = B;
      var a = e.timeoutHandle;
      if (a !== Hy && (e.timeoutHandle = Hy, vT(a)), zn !== null)
        for (var i = zn.return; i !== null; ) {
          var u = i.alternate;
          UC(u, i), i = i.return;
        }
      wa = e;
      var s = Zs(e.current, null);
      return zn = s, pr = Yl = t, vr = ku, Up = null, bm = B, Ap = B, _m = B, jp = null, Ka = null, Ax(), el.discardPendingWarnings(), s;
    }
    function u1(e, t) {
      do {
        var a = zn;
        try {
          if ($h(), LE(), Tn(), MS.current = null, a === null || a.return === null) {
            vr = Np, Up = t, zn = null;
            return;
          }
          if (rt && a.mode & Qe && gm(a, !0), at)
            if (ra(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              uu(a, i, pr);
            } else
              vs(a, t, pr);
          fw(e, a.return, a, t, pr), f1(a);
        } catch (u) {
          t = u, zn === a && a !== null ? (a = a.return, zn = a) : a = zn;
          continue;
        }
        return;
      } while (!0);
    }
    function o1() {
      var e = LS.current;
      return LS.current = pm, e === null ? pm : e;
    }
    function s1(e) {
      LS.current = e;
    }
    function Bb() {
      US = Sn();
    }
    function Bp(e) {
      bm = Je(e, bm);
    }
    function $b() {
      vr === ku && (vr = wm);
    }
    function IS() {
      (vr === ku || vr === wm || vr === Gs) && (vr = zp), wa !== null && (Es(bm) || Es(Ap)) && Yo(wa, pr);
    }
    function Ib(e) {
      vr !== zp && (vr = Gs), jp === null ? jp = [e] : jp.push(e);
    }
    function Yb() {
      return vr === ku;
    }
    function zm(e, t) {
      var a = xt;
      xt |= Pr;
      var i = o1();
      if (wa !== e || pr !== t) {
        if (Ca) {
          var u = e.memoizedUpdaters;
          u.size > 0 && ($p(e, pr), u.clear()), Md(e, t);
        }
        Du = xs(), Ks(e, t);
      }
      pn(t);
      do
        try {
          Qb();
          break;
        } catch (s) {
          u1(e, s);
        }
      while (!0);
      if ($h(), xt = a, s1(i), zn !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return bc(), wa = null, pr = B, vr;
    }
    function Qb() {
      for (; zn !== null; )
        c1(zn);
    }
    function Wb(e, t) {
      var a = xt;
      xt |= Pr;
      var i = o1();
      if (wa !== e || pr !== t) {
        if (Ca) {
          var u = e.memoizedUpdaters;
          u.size > 0 && ($p(e, pr), u.clear()), Md(e, t);
        }
        Du = xs(), Fp(), Ks(e, t);
      }
      pn(t);
      do
        try {
          Gb();
          break;
        } catch (s) {
          u1(e, s);
        }
      while (!0);
      return $h(), s1(i), xt = a, zn !== null ? (wc(), ku) : (bc(), wa = null, pr = B, vr);
    }
    function Gb() {
      for (; zn !== null && !Sc(); )
        c1(zn);
    }
    function c1(e) {
      var t = e.alternate;
      Bt(e);
      var a;
      (e.mode & Qe) !== Re ? (Wg(e), a = YS(t, e, Yl), gm(e, !0)) : a = YS(t, e, Yl), Tn(), e.memoizedProps = e.pendingProps, a === null ? f1(e) : zn = a, MS.current = null;
    }
    function f1(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & ga) === Le) {
          Bt(t);
          var u = void 0;
          if ((t.mode & Qe) === Re ? u = zC(a, t, Yl) : (Wg(t), u = zC(a, t, Yl), gm(t, !1)), Tn(), u !== null) {
            zn = u;
            return;
          }
        } else {
          var s = $w(a, t);
          if (s !== null) {
            s.flags &= bv, zn = s;
            return;
          }
          if ((t.mode & Qe) !== Re) {
            gm(t, !1);
            for (var f = t.actualDuration, p = t.child; p !== null; )
              f += p.actualDuration, p = p.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= ga, i.subtreeFlags = Le, i.deletions = null;
          else {
            vr = NS, zn = null;
            return;
          }
        }
        var v = t.sibling;
        if (v !== null) {
          zn = v;
          return;
        }
        t = i, zn = t;
      } while (t !== null);
      vr === ku && (vr = ZC);
    }
    function Xs(e, t, a) {
      var i = Ba(), u = Vr.transition;
      try {
        Vr.transition = null, wn(Mn), qb(e, t, a, i);
      } finally {
        Vr.transition = u, wn(i);
      }
      return null;
    }
    function qb(e, t, a, i) {
      do
        Lu();
      while ($o !== null);
      if (l_(), (xt & (Pr | Li)) !== dr)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, s = e.finishedLanes;
      if (kl(s), u === null)
        return Rc(), null;
      if (s === B && S("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = B, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Hn;
      var f = Je(u.lanes, u.childLanes);
      Qc(e, f), e === wa && (wa = null, zn = null, pr = B), ((u.subtreeFlags & ja) !== Le || (u.flags & ja) !== Le) && (qs || (qs = !0, FS = a, GS(Ci, function() {
        return Lu(), null;
      })));
      var p = (u.subtreeFlags & (Ju | ta | Cr | ja)) !== Le, v = (u.flags & (Ju | ta | Cr | ja)) !== Le;
      if (p || v) {
        var y = Vr.transition;
        Vr.transition = null;
        var g = Ba();
        wn(Mn);
        var b = xt;
        xt |= Li, MS.current = null, Gw(e, u), nC(), ob(e, u, s), uT(e.containerInfo), e.current = u, Td(s), sb(u, e, s), ao(), Dv(), xt = b, wn(g), Vr.transition = y;
      } else
        e.current = u, nC();
      var x = qs;
      if (qs ? (qs = !1, $o = e, Hp = s) : (Pf = 0, Om = null), f = e.pendingLanes, f === B && (Vf = null), x || h1(e.current, !1), to(u.stateNode, i), Ca && e.memoizedUpdaters.clear(), kb(), Xa(e, Sn()), t !== null)
        for (var M = e.onRecoverableError, U = 0; U < t.length; U++) {
          var F = t[U], ue = F.stack, Me = F.digest;
          M(F.value, {
            componentStack: ue,
            digest: Me
          });
        }
      if (km) {
        km = !1;
        var be = AS;
        throw AS = null, be;
      }
      return la(Hp, De) && e.tag !== No && Lu(), f = e.pendingLanes, la(f, De) ? (ew(), e === HS ? Vp++ : (Vp = 0, HS = e)) : Vp = 0, zo(), Rc(), null;
    }
    function Lu() {
      if ($o !== null) {
        var e = ur(Hp), t = sy(Ri, e), a = Vr.transition, i = Ba();
        try {
          return Vr.transition = null, wn(t), Xb();
        } finally {
          wn(i), Vr.transition = a;
        }
      }
      return !1;
    }
    function Kb(e) {
      jS.push(e), qs || (qs = !0, GS(Ci, function() {
        return Lu(), null;
      }));
    }
    function Xb() {
      if ($o === null)
        return !1;
      var e = FS;
      FS = null;
      var t = $o, a = Hp;
      if ($o = null, Hp = B, (xt & (Pr | Li)) !== dr)
        throw new Error("Cannot flush passive effects while already rendering.");
      VS = !0, Dm = !1, Uv(a);
      var i = xt;
      xt |= Li, mb(t.current), db(t, t.current, a, e);
      {
        var u = jS;
        jS = [];
        for (var s = 0; s < u.length; s++) {
          var f = u[s];
          Zw(t, f);
        }
      }
      xd(), h1(t.current, !0), xt = i, zo(), Dm ? t === Om ? Pf++ : (Pf = 0, Om = t) : Pf = 0, VS = !1, Dm = !1, Va(t);
      {
        var p = t.current.stateNode;
        p.effectDuration = 0, p.passiveEffectDuration = 0;
      }
      return !0;
    }
    function d1(e) {
      return Vf !== null && Vf.has(e);
    }
    function Zb(e) {
      Vf === null ? Vf = /* @__PURE__ */ new Set([e]) : Vf.add(e);
    }
    function Jb(e) {
      km || (km = !0, AS = e);
    }
    var e_ = Jb;
    function p1(e, t, a) {
      var i = Qs(a, t), u = cC(e, i, De), s = Ao(e, u, De), f = ba();
      s !== null && (vu(s, De, f), Xa(s, f));
    }
    function cn(e, t, a) {
      if (Yw(a), Ip(!1), e.tag === te) {
        p1(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === te) {
          p1(i, e, a);
          return;
        } else if (i.tag === oe) {
          var u = i.type, s = i.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !d1(s)) {
            var f = Qs(a, e), p = fS(i, f, De), v = Ao(i, p, De), y = ba();
            v !== null && (vu(v, De, y), Xa(v, y));
            return;
          }
        }
        i = i.return;
      }
      S(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function t_(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var u = ba();
      Yc(e, a), c_(e), wa === e && pu(pr, a) && (vr === zp || vr === wm && Vv(pr) && Sn() - US < JC ? Ks(e, B) : _m = Je(_m, a)), Xa(e, u);
    }
    function v1(e, t) {
      t === Hn && (t = Ub(e));
      var a = ba(), i = Ga(e, t);
      i !== null && (vu(i, t, a), Xa(i, a));
    }
    function n_(e) {
      var t = e.memoizedState, a = Hn;
      t !== null && (a = t.retryLane), v1(e, a);
    }
    function r_(e, t) {
      var a = Hn, i;
      switch (e.tag) {
        case Oe:
          i = e.stateNode;
          var u = e.memoizedState;
          u !== null && (a = u.retryLane);
          break;
        case kt:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), v1(e, a);
    }
    function a_(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : Lb(e / 1960) * 1960;
    }
    function i_() {
      if (Vp > Nb)
        throw Vp = 0, HS = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Pf > zb && (Pf = 0, Om = null, S("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function l_() {
      el.flushLegacyContextWarning(), el.flushPendingUnsafeLifecycleWarnings();
    }
    function h1(e, t) {
      Bt(e), Um(e, ea, wb), t && Um(e, au, bb), Um(e, ea, Tb), t && Um(e, au, xb), Tn();
    }
    function Um(e, t, a) {
      for (var i = e, u = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== u && i.child !== null && s !== Le ? i = i.child : ((i.flags & t) !== Le && a(i), i.sibling !== null ? i = i.sibling : i = u = i.return);
      }
    }
    var Am = null;
    function m1(e) {
      {
        if ((xt & Pr) !== dr || !(e.mode & we))
          return;
        var t = e.tag;
        if (t !== Xe && t !== te && t !== oe && t !== de && t !== qe && t !== ft && t !== Pe)
          return;
        var a = We(e) || "ReactComponent";
        if (Am !== null) {
          if (Am.has(a))
            return;
          Am.add(a);
        } else
          Am = /* @__PURE__ */ new Set([a]);
        var i = gn;
        try {
          Bt(e), S("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? Bt(e) : Tn();
        }
      }
    }
    var YS;
    {
      var u_ = null;
      YS = function(e, t, a) {
        var i = x1(u_, t);
        try {
          return DC(e, t, a);
        } catch (s) {
          if (Sx() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if ($h(), LE(), UC(e, t), x1(t, i), t.mode & Qe && Wg(t), ru(null, DC, null, e, t, a), ay()) {
            var u = vd();
            typeof u == "object" && u !== null && u._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var y1 = !1, QS;
    QS = /* @__PURE__ */ new Set();
    function o_(e) {
      if (qr && !Xx())
        switch (e.tag) {
          case de:
          case qe:
          case Pe: {
            var t = zn && We(zn) || "Unknown", a = t;
            if (!QS.has(a)) {
              QS.add(a);
              var i = We(e) || "Unknown";
              S("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case oe: {
            y1 || (S("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), y1 = !0);
            break;
          }
        }
    }
    function $p(e, t) {
      if (Ca) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          Wc(e, i, t);
        });
      }
    }
    var WS = {};
    function GS(e, t) {
      {
        var a = ol.current;
        return a !== null ? (a.push(t), WS) : gc(e, t);
      }
    }
    function g1(e) {
      if (e !== WS)
        return kv(e);
    }
    function S1() {
      return ol.current !== null;
    }
    function s_(e) {
      {
        if (e.mode & we) {
          if (!KC())
            return;
        } else if (!Ob() || xt !== dr || e.tag !== de && e.tag !== qe && e.tag !== Pe)
          return;
        if (ol.current === null) {
          var t = gn;
          try {
            Bt(e), S(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, We(e));
          } finally {
            t ? Bt(e) : Tn();
          }
        }
      }
    }
    function c_(e) {
      e.tag !== No && KC() && ol.current === null && S(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function Ip(e) {
      n1 = e;
    }
    var Mi = null, Bf = null, f_ = function(e) {
      Mi = e;
    };
    function $f(e) {
      {
        if (Mi === null)
          return e;
        var t = Mi(e);
        return t === void 0 ? e : t.current;
      }
    }
    function qS(e) {
      return $f(e);
    }
    function KS(e) {
      {
        if (Mi === null)
          return e;
        var t = Mi(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = $f(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: W,
                render: a
              };
              return e.displayName !== void 0 && (i.displayName = e.displayName), i;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function E1(e, t) {
      {
        if (Mi === null)
          return !1;
        var a = e.elementType, i = t.type, u = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case oe: {
            typeof i == "function" && (u = !0);
            break;
          }
          case de: {
            (typeof i == "function" || s === Ae) && (u = !0);
            break;
          }
          case qe: {
            (s === W || s === Ae) && (u = !0);
            break;
          }
          case ft:
          case Pe: {
            (s === Et || s === Ae) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var f = Mi(a);
          if (f !== void 0 && f === Mi(i))
            return !0;
        }
        return !1;
      }
    }
    function C1(e) {
      {
        if (Mi === null || typeof WeakSet != "function")
          return;
        Bf === null && (Bf = /* @__PURE__ */ new WeakSet()), Bf.add(e);
      }
    }
    var d_ = function(e, t) {
      {
        if (Mi === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        Lu(), Ou(function() {
          XS(e.current, i, a);
        });
      }
    }, p_ = function(e, t) {
      {
        if (e.context !== si)
          return;
        Lu(), Ou(function() {
          Yp(t, e, null, null);
        });
      }
    };
    function XS(e, t, a) {
      {
        var i = e.alternate, u = e.child, s = e.sibling, f = e.tag, p = e.type, v = null;
        switch (f) {
          case de:
          case Pe:
          case oe:
            v = p;
            break;
          case qe:
            v = p.render;
            break;
        }
        if (Mi === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var y = !1, g = !1;
        if (v !== null) {
          var b = Mi(v);
          b !== void 0 && (a.has(b) ? g = !0 : t.has(b) && (f === oe ? g = !0 : y = !0));
        }
        if (Bf !== null && (Bf.has(e) || i !== null && Bf.has(i)) && (g = !0), g && (e._debugNeedsRemount = !0), g || y) {
          var x = Ga(e, De);
          x !== null && hr(x, e, De, nn);
        }
        u !== null && !g && XS(u, t, a), s !== null && XS(s, t, a);
      }
    }
    var v_ = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(u) {
          return u.current;
        }));
        return ZS(e.current, i, a), a;
      }
    };
    function ZS(e, t, a) {
      {
        var i = e.child, u = e.sibling, s = e.tag, f = e.type, p = null;
        switch (s) {
          case de:
          case Pe:
          case oe:
            p = f;
            break;
          case qe:
            p = f.render;
            break;
        }
        var v = !1;
        p !== null && t.has(p) && (v = !0), v ? h_(e, a) : i !== null && ZS(i, t, a), u !== null && ZS(u, t, a);
      }
    }
    function h_(e, t) {
      {
        var a = m_(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case le:
              t.add(i.stateNode);
              return;
            case ve:
              t.add(i.stateNode.containerInfo);
              return;
            case te:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function m_(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === le)
          i = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return i;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return i;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var JS;
    {
      JS = !1;
      try {
        var R1 = Object.preventExtensions({});
      } catch {
        JS = !0;
      }
    }
    function y_(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = Le, this.subtreeFlags = Le, this.deletions = null, this.lanes = B, this.childLanes = B, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !JS && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var ci = function(e, t, a, i) {
      return new y_(e, t, a, i);
    };
    function e0(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function g_(e) {
      return typeof e == "function" && !e0(e) && e.defaultProps === void 0;
    }
    function S_(e) {
      if (typeof e == "function")
        return e0(e) ? oe : de;
      if (e != null) {
        var t = e.$$typeof;
        if (t === W)
          return qe;
        if (t === Et)
          return ft;
      }
      return Xe;
    }
    function Zs(e, t) {
      var a = e.alternate;
      a === null ? (a = ci(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = Le, a.subtreeFlags = Le, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & ir, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case Xe:
        case de:
        case Pe:
          a.type = $f(e.type);
          break;
        case oe:
          a.type = qS(e.type);
          break;
        case qe:
          a.type = KS(e.type);
          break;
      }
      return a;
    }
    function E_(e, t) {
      e.flags &= ir | un;
      var a = e.alternate;
      if (a === null)
        e.childLanes = B, e.lanes = t, e.child = null, e.subtreeFlags = Le, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = Le, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function C_(e, t, a) {
      var i;
      return e === Nh ? (i = we, t === !0 && (i |= vt, i |= Ra)) : i = Re, Ca && (i |= Qe), ci(te, null, null, i);
    }
    function t0(e, t, a, i, u, s) {
      var f = Xe, p = e;
      if (typeof e == "function")
        e0(e) ? (f = oe, p = qS(p)) : p = $f(p);
      else if (typeof e == "string")
        f = le;
      else
        e:
          switch (e) {
            case ya:
              return Qo(a.children, u, s, t);
            case vi:
              f = Ze, u |= vt, (u & we) !== Re && (u |= Ra);
              break;
            case hi:
              return R_(a, u, s, t);
            case xe:
              return T_(a, u, s, t);
            case dt:
              return x_(a, u, s, t);
            case Kt:
              return T1(a, u, s, t);
            case ln:
            case lt:
            case Er:
            case mi:
            case An:
            default: {
              if (typeof e == "object" && e !== null)
                switch (e.$$typeof) {
                  case R:
                    f = nt;
                    break e;
                  case $:
                    f = rn;
                    break e;
                  case W:
                    f = qe, p = KS(p);
                    break e;
                  case Et:
                    f = ft;
                    break e;
                  case Ae:
                    f = an, p = null;
                    break e;
                }
              var v = "";
              {
                (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var y = i ? We(i) : null;
                y && (v += `

Check the render method of \`` + y + "`.");
              }
              throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + v));
            }
          }
      var g = ci(f, a, t, u);
      return g.elementType = e, g.type = p, g.lanes = s, g._debugOwner = i, g;
    }
    function n0(e, t, a) {
      var i = null;
      i = e._owner;
      var u = e.type, s = e.key, f = e.props, p = t0(u, s, f, i, t, a);
      return p._debugSource = e._source, p._debugOwner = e._owner, p;
    }
    function Qo(e, t, a, i) {
      var u = ci(Ee, e, i, t);
      return u.lanes = a, u;
    }
    function R_(e, t, a, i) {
      typeof e.id != "string" && S('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = ci(mt, e, i, t | Qe);
      return u.elementType = hi, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function T_(e, t, a, i) {
      var u = ci(Oe, e, i, t);
      return u.elementType = xe, u.lanes = a, u;
    }
    function x_(e, t, a, i) {
      var u = ci(kt, e, i, t);
      return u.elementType = dt, u.lanes = a, u;
    }
    function T1(e, t, a, i) {
      var u = ci(ze, e, i, t);
      u.elementType = Kt, u.lanes = a;
      var s = {
        isHidden: !1
      };
      return u.stateNode = s, u;
    }
    function r0(e, t, a) {
      var i = ci(Ve, e, null, t);
      return i.lanes = a, i;
    }
    function w_() {
      var e = ci(le, null, null, Re);
      return e.elementType = "DELETED", e;
    }
    function b_(e) {
      var t = ci(Wt, null, null, Re);
      return t.stateNode = e, t;
    }
    function a0(e, t, a) {
      var i = e.children !== null ? e.children : [], u = ci(ve, i, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function x1(e, t) {
      return e === null && (e = ci(Xe, null, null, Re)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function __(e, t, a, i, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Hy, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Hn, this.eventTimes = Ts(B), this.expirationTimes = Ts(nn), this.pendingLanes = B, this.suspendedLanes = B, this.pingedLanes = B, this.expiredLanes = B, this.mutableReadLanes = B, this.finishedLanes = B, this.entangledLanes = B, this.entanglements = Ts(B), this.identifierPrefix = i, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < ys; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case Nh:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case No:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function w1(e, t, a, i, u, s, f, p, v, y) {
      var g = new __(e, t, a, p, v), b = C_(t, s);
      g.current = b, b.stateNode = g;
      {
        var x = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        b.memoizedState = x;
      }
      return yg(b), g;
    }
    var i0 = "18.3.1";
    function k_(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return Yr(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: kr,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var l0, u0;
    l0 = !1, u0 = {};
    function b1(e) {
      if (!e)
        return si;
      var t = za(e), a = cx(t);
      if (t.tag === oe) {
        var i = t.type;
        if (Fl(i))
          return J0(t, i, a);
      }
      return a;
    }
    function D_(e, t) {
      {
        var a = za(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var u = Fa(a);
        if (u === null)
          return null;
        if (u.mode & vt) {
          var s = We(a) || "Component";
          if (!u0[s]) {
            u0[s] = !0;
            var f = gn;
            try {
              Bt(u), a.mode & vt ? S("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s) : S("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s);
            } finally {
              f ? Bt(f) : Tn();
            }
          }
        }
        return u.stateNode;
      }
    }
    function _1(e, t, a, i, u, s, f, p) {
      var v = !1, y = null;
      return w1(e, t, v, y, a, i, u, s, f);
    }
    function k1(e, t, a, i, u, s, f, p, v, y) {
      var g = !0, b = w1(a, i, g, e, u, s, f, p, v);
      b.context = b1(null);
      var x = b.current, M = ba(), U = Io(x), F = bu(M, U);
      return F.callback = t ?? null, Ao(x, F, U), Ab(b, U, M), b;
    }
    function Yp(e, t, a, i) {
      Rd(t, e);
      var u = t.current, s = ba(), f = Io(u);
      wd(f);
      var p = b1(a);
      t.context === null ? t.context = p : t.pendingContext = p, qr && gn !== null && !l0 && (l0 = !0, S(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, We(gn) || "Unknown"));
      var v = bu(s, f);
      v.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && S("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), v.callback = i);
      var y = Ao(u, v, f);
      return y !== null && (hr(y, u, f, s), Gh(y, u, f)), f;
    }
    function jm(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case le:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function O_(e) {
      switch (e.tag) {
        case te: {
          var t = e.stateNode;
          if (Gc(t)) {
            var a = kd(t);
            Vb(t, a);
          }
          break;
        }
        case Oe: {
          Ou(function() {
            var u = Ga(e, De);
            if (u !== null) {
              var s = ba();
              hr(u, e, De, s);
            }
          });
          var i = De;
          o0(e, i);
          break;
        }
      }
    }
    function D1(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = Yv(a.retryLane, t));
    }
    function o0(e, t) {
      D1(e, t);
      var a = e.alternate;
      a && D1(a, t);
    }
    function L_(e) {
      if (e.tag === Oe) {
        var t = Ss, a = Ga(e, t);
        if (a !== null) {
          var i = ba();
          hr(a, e, t, i);
        }
        o0(e, t);
      }
    }
    function M_(e) {
      if (e.tag === Oe) {
        var t = Io(e), a = Ga(e, t);
        if (a !== null) {
          var i = ba();
          hr(a, e, t, i);
        }
        o0(e, t);
      }
    }
    function O1(e) {
      var t = _v(e);
      return t === null ? null : t.stateNode;
    }
    var L1 = function(e) {
      return null;
    };
    function N_(e) {
      return L1(e);
    }
    var M1 = function(e) {
      return !1;
    };
    function z_(e) {
      return M1(e);
    }
    var N1 = null, z1 = null, U1 = null, A1 = null, j1 = null, F1 = null, H1 = null, V1 = null, P1 = null;
    {
      var B1 = function(e, t, a) {
        var i = t[a], u = Rt(e) ? e.slice() : ut({}, e);
        return a + 1 === t.length ? (Rt(u) ? u.splice(i, 1) : delete u[i], u) : (u[i] = B1(e[i], t, a + 1), u);
      }, $1 = function(e, t) {
        return B1(e, t, 0);
      }, I1 = function(e, t, a, i) {
        var u = t[i], s = Rt(e) ? e.slice() : ut({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[u], Rt(s) ? s.splice(u, 1) : delete s[u];
        } else
          s[u] = I1(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            i + 1
          );
        return s;
      }, Y1 = function(e, t, a) {
        if (t.length !== a.length) {
          Ie("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              Ie("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return I1(e, t, a, 0);
      }, Q1 = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var u = t[a], s = Rt(e) ? e.slice() : ut({}, e);
        return s[u] = Q1(e[u], t, a + 1, i), s;
      }, W1 = function(e, t, a) {
        return Q1(e, t, 0, a);
      }, s0 = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      N1 = function(e, t, a, i) {
        var u = s0(e, t);
        if (u !== null) {
          var s = W1(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = ut({}, e.memoizedProps);
          var f = Ga(e, De);
          f !== null && hr(f, e, De, nn);
        }
      }, z1 = function(e, t, a) {
        var i = s0(e, t);
        if (i !== null) {
          var u = $1(i.memoizedState, a);
          i.memoizedState = u, i.baseState = u, e.memoizedProps = ut({}, e.memoizedProps);
          var s = Ga(e, De);
          s !== null && hr(s, e, De, nn);
        }
      }, U1 = function(e, t, a, i) {
        var u = s0(e, t);
        if (u !== null) {
          var s = Y1(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = ut({}, e.memoizedProps);
          var f = Ga(e, De);
          f !== null && hr(f, e, De, nn);
        }
      }, A1 = function(e, t, a) {
        e.pendingProps = W1(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Ga(e, De);
        i !== null && hr(i, e, De, nn);
      }, j1 = function(e, t) {
        e.pendingProps = $1(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = Ga(e, De);
        a !== null && hr(a, e, De, nn);
      }, F1 = function(e, t, a) {
        e.pendingProps = Y1(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Ga(e, De);
        i !== null && hr(i, e, De, nn);
      }, H1 = function(e) {
        var t = Ga(e, De);
        t !== null && hr(t, e, De, nn);
      }, V1 = function(e) {
        L1 = e;
      }, P1 = function(e) {
        M1 = e;
      };
    }
    function U_(e) {
      var t = Fa(e);
      return t === null ? null : t.stateNode;
    }
    function A_(e) {
      return null;
    }
    function j_() {
      return gn;
    }
    function F_(e) {
      var t = e.findFiberByHostInstance, a = A.ReactCurrentDispatcher;
      return Cd({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: N1,
        overrideHookStateDeletePath: z1,
        overrideHookStateRenamePath: U1,
        overrideProps: A1,
        overridePropsDeletePath: j1,
        overridePropsRenamePath: F1,
        setErrorHandler: V1,
        setSuspenseHandler: P1,
        scheduleUpdate: H1,
        currentDispatcherRef: a,
        findHostInstanceByFiber: U_,
        findFiberByHostInstance: t || A_,
        // React Refresh
        findHostInstancesForRefresh: v_,
        scheduleRefresh: d_,
        scheduleRoot: p_,
        setRefreshHandler: f_,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: j_,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: i0
      });
    }
    var G1 = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function c0(e) {
      this._internalRoot = e;
    }
    Fm.prototype.render = c0.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? S("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : Hm(arguments[1]) ? S("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && S("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== jn) {
          var i = O1(t.current);
          i && i.parentNode !== a && S("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      Yp(e, t, null, null);
    }, Fm.prototype.unmount = c0.prototype.unmount = function() {
      typeof arguments[0] == "function" && S("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        l1() && S("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Ou(function() {
          Yp(null, e, null, null);
        }), G0(t);
      }
    };
    function H_(e, t) {
      if (!Hm(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      q1(e);
      var a = !1, i = !1, u = "", s = G1;
      t != null && (t.hydrate ? Ie("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === ti && S(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = _1(e, Nh, null, a, i, u, s);
      bh(f.current, e);
      var p = e.nodeType === jn ? e.parentNode : e;
      return Xd(p), new c0(f);
    }
    function Fm(e) {
      this._internalRoot = e;
    }
    function V_(e) {
      e && dy(e);
    }
    Fm.prototype.unstable_scheduleHydration = V_;
    function P_(e, t, a) {
      if (!Hm(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      q1(e), t === void 0 && S("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, u = a != null && a.hydratedSources || null, s = !1, f = !1, p = "", v = G1;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (p = a.identifierPrefix), a.onRecoverableError !== void 0 && (v = a.onRecoverableError));
      var y = k1(t, null, e, Nh, i, s, f, p, v);
      if (bh(y.current, e), Xd(e), u)
        for (var g = 0; g < u.length; g++) {
          var b = u[g];
          Yx(y, b);
        }
      return new Fm(y);
    }
    function Hm(e) {
      return !!(e && (e.nodeType === Xr || e.nodeType === ii || e.nodeType === Xl || !V));
    }
    function Qp(e) {
      return !!(e && (e.nodeType === Xr || e.nodeType === ii || e.nodeType === Xl || e.nodeType === jn && e.nodeValue === " react-mount-point-unstable "));
    }
    function q1(e) {
      e.nodeType === Xr && e.tagName && e.tagName.toUpperCase() === "BODY" && S("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), op(e) && (e._reactRootContainer ? S("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : S("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var B_ = A.ReactCurrentOwner, K1;
    K1 = function(e) {
      if (e._reactRootContainer && e.nodeType !== jn) {
        var t = O1(e._reactRootContainer.current);
        t && t.parentNode !== e && S("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = f0(e), u = !!(i && Lo(i));
      u && !a && S("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Xr && e.tagName && e.tagName.toUpperCase() === "BODY" && S("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function f0(e) {
      return e ? e.nodeType === ii ? e.documentElement : e.firstChild : null;
    }
    function X1() {
    }
    function $_(e, t, a, i, u) {
      if (u) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var x = jm(f);
            s.call(x);
          };
        }
        var f = k1(
          t,
          i,
          e,
          No,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          X1
        );
        e._reactRootContainer = f, bh(f.current, e);
        var p = e.nodeType === jn ? e.parentNode : e;
        return Xd(p), Ou(), f;
      } else {
        for (var v; v = e.lastChild; )
          e.removeChild(v);
        if (typeof i == "function") {
          var y = i;
          i = function() {
            var x = jm(g);
            y.call(x);
          };
        }
        var g = _1(
          e,
          No,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          X1
        );
        e._reactRootContainer = g, bh(g.current, e);
        var b = e.nodeType === jn ? e.parentNode : e;
        return Xd(b), Ou(function() {
          Yp(t, g, a, i);
        }), g;
      }
    }
    function I_(e, t) {
      e !== null && typeof e != "function" && S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function Vm(e, t, a, i, u) {
      K1(a), I_(u === void 0 ? null : u, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = $_(a, t, e, u, i);
      else {
        if (f = s, typeof u == "function") {
          var p = u;
          u = function() {
            var v = jm(f);
            p.call(v);
          };
        }
        Yp(t, f, e, u);
      }
      return jm(f);
    }
    var Z1 = !1;
    function Y_(e) {
      {
        Z1 || (Z1 = !0, S("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = B_.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || S("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ct(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Xr ? e : D_(e, "findDOMNode");
    }
    function Q_(e, t, a) {
      if (S("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = op(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return Vm(null, e, t, !0, a);
    }
    function W_(e, t, a) {
      if (S("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = op(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return Vm(null, e, t, !1, a);
    }
    function G_(e, t, a, i) {
      if (S("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qp(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !cs(e))
        throw new Error("parentComponent must be a valid React Component");
      return Vm(e, t, a, !1, i);
    }
    var J1 = !1;
    function q_(e) {
      if (J1 || (J1 = !0, S("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Qp(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = op(e) && e._reactRootContainer === void 0;
        t && S("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = f0(e), i = a && !Lo(a);
          i && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Ou(function() {
          Vm(null, null, e, !1, function() {
            e._reactRootContainer = null, G0(e);
          });
        }), !0;
      } else {
        {
          var u = f0(e), s = !!(u && Lo(u)), f = e.nodeType === Xr && Qp(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    yo(O_), cy(L_), Kc(M_), Gv(Ba), qv(xr), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && S("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), xv(XR), pc(BS, Pb, Ou);
    function K_(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Hm(t))
        throw new Error("Target container is not a DOM element.");
      return k_(e, t, null, a);
    }
    function X_(e, t, a, i) {
      return G_(e, t, a, i);
    }
    var d0 = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Lo, Ef, _h, dc, us, BS]
    };
    function Z_(e, t) {
      return d0.usingClientEntryPoint || S('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), H_(e, t);
    }
    function J_(e, t, a) {
      return d0.usingClientEntryPoint || S('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), P_(e, t, a);
    }
    function ek(e) {
      return l1() && S("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Ou(e);
    }
    var tk = F_({
      findFiberByHostInstance: js,
      bundleType: 1,
      version: i0,
      rendererPackageName: "react-dom"
    });
    if (!tk && hn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var eR = window.location.protocol;
      /^(https?|file):$/.test(eR) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (eR === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    Ja.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = d0, Ja.createPortal = K_, Ja.createRoot = Z_, Ja.findDOMNode = Y_, Ja.flushSync = ek, Ja.hydrate = Q_, Ja.hydrateRoot = J_, Ja.render = W_, Ja.unmountComponentAtNode = q_, Ja.unstable_batchedUpdates = BS, Ja.unstable_renderSubtreeIntoContainer = X_, Ja.version = i0, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Ja;
}
function vR() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(vR);
    } catch (q) {
      console.error(q);
    }
  }
}
process.env.NODE_ENV === "production" ? (vR(), y0.exports = fk()) : y0.exports = dk();
var pk = y0.exports, g0, $m = pk;
if (process.env.NODE_ENV === "production")
  g0 = $m.createRoot, $m.hydrateRoot;
else {
  var fR = $m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  g0 = function(q, X) {
    fR.usingClientEntryPoint = !0;
    try {
      return $m.createRoot(q, X);
    } finally {
      fR.usingClientEntryPoint = !1;
    }
  };
}
var Nu = Xp();
const h0 = /* @__PURE__ */ ak(Nu);
var vk = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const hk = (q) => q.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Js = (q, X) => {
  const A = Nu.forwardRef(
    ({ color: zt = "currentColor", size: Ut = 24, strokeWidth: Ie = 2, absoluteStrokeWidth: S, children: ct, ...de }, oe) => Nu.createElement(
      "svg",
      {
        ref: oe,
        ...vk,
        width: Ut,
        height: Ut,
        stroke: zt,
        strokeWidth: S ? Number(Ie) * 24 / Number(Ut) : Ie,
        className: `lucide lucide-${hk(q)}`,
        ...de
      },
      [
        ...X.map(([Xe, te]) => Nu.createElement(Xe, te)),
        ...(Array.isArray(ct) ? ct : [ct]) || []
      ]
    )
  );
  return A.displayName = `${q}`, A;
}, mk = Js("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]), yk = Js("Maximize2", [
  ["polyline", { points: "15 3 21 3 21 9", key: "mznyad" }],
  ["polyline", { points: "9 21 3 21 3 15", key: "1avn1i" }],
  ["line", { x1: "21", x2: "14", y1: "3", y2: "10", key: "ota7mn" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]
]), S0 = Js("MessageCircle", [
  ["path", { d: "m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z", key: "v2veuj" }]
]), gk = Js("Minimize2", [
  ["polyline", { points: "4 14 10 14 10 20", key: "11kfnr" }],
  ["polyline", { points: "20 10 14 10 14 4", key: "rlmsce" }],
  ["line", { x1: "14", x2: "21", y1: "10", y2: "3", key: "o5lafz" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]
]), Sk = Js("Send", [
  ["line", { x1: "22", x2: "11", y1: "2", y2: "13", key: "2qtwb" }],
  ["polygon", { points: "22 2 15 22 11 13 2 9 22 2", key: "12uapv" }]
]), hR = Js("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]), Ek = Js("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]), fn = {
  background: "#1A2332",
  text: "#E9E9E9",
  accent: "#00D4B8",
  secondary: "#2A3441",
  border: "#3A3F51"
};
function Ck({ onOpen: q }) {
  return /* @__PURE__ */ ht.jsxs(
    "button",
    {
      onClick: q,
      style: {
        position: "fixed",
        top: "1rem",
        right: "1rem",
        background: fn.secondary,
        border: `2px solid ${fn.border}`,
        borderRadius: "0.5rem",
        padding: "0.5rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        color: fn.text,
        zIndex: 9999,
        cursor: "pointer"
      },
      children: [
        /* @__PURE__ */ ht.jsx(hR, { size: 16 }),
        /* @__PURE__ */ ht.jsx(S0, { size: 16 })
      ]
    }
  );
}
function Rk({ isOpen: q, onClose: X, user: A }) {
  const [zt, Ut] = h0.useState([]), [Ie, S] = h0.useState(""), [ct, de] = h0.useState(!1), oe = Nu.useRef(null), Xe = Nu.useRef(null), te = () => {
    var Ee;
    (Ee = oe.current) == null || Ee.scrollIntoView({ behavior: "smooth" });
  };
  Nu.useEffect(() => {
    var Ee;
    q && !ct && (te(), (Ee = Xe.current) == null || Ee.focus());
  }, [q, ct, zt]), Nu.useEffect(() => {
    const Ee = (Ze) => {
      Ze.key === "Escape" && q && X();
    };
    return document.addEventListener("keydown", Ee), () => document.removeEventListener("keydown", Ee);
  }, [q, X]);
  const ve = () => {
    if (!Ie.trim())
      return;
    const Ee = {
      id: Date.now(),
      text: Ie,
      sender: A.username,
      timestamp: /* @__PURE__ */ new Date(),
      isSystem: !1
    };
    Ut((Ze) => [...Ze, Ee]), S(""), setTimeout(() => {
      const Ze = [
        "¡Interesante punto de vista! 🤔",
        "Gracias por participar en la conversación 👍",
        "¿Alguien más tiene experiencia con esto? 🙋‍♂️",
        "Excelente aporte al debate 💭",
        "Me gusta esa perspectiva 🎯",
        "Buen punto para discutir 📝"
      ], rn = Ze[Math.floor(Math.random() * Ze.length)];
      Ut((nt) => [
        ...nt,
        {
          id: Date.now() + 1,
          text: rn,
          sender: "Bot_EEVI",
          timestamp: /* @__PURE__ */ new Date(),
          isSystem: !0
        }
      ]);
    }, 1500);
  }, le = (Ee) => {
    Ee.key === "Enter" && !Ee.shiftKey && (Ee.preventDefault(), ve());
  }, Ve = (Ee) => Ee.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  return q ? /* @__PURE__ */ ht.jsxs(
    "div",
    {
      className: "chat-modal-overlay",
      style: {
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        width: "20rem",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        backgroundColor: fn.background,
        color: fn.text,
        border: `2px solid ${fn.border}`,
        zIndex: 9998,
        display: "flex",
        flexDirection: "column"
      },
      children: [
        /* @__PURE__ */ ht.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem",
              borderBottom: `2px solid ${fn.border}`,
              backgroundColor: fn.secondary,
              borderTopLeftRadius: "0.5rem",
              borderTopRightRadius: "0.5rem"
            },
            children: [
              /* @__PURE__ */ ht.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [
                /* @__PURE__ */ ht.jsx(S0, { size: 18, color: fn.accent }),
                /* @__PURE__ */ ht.jsx("span", { style: { fontWeight: 600 }, children: "CHAT GLOBAL EEVI" })
              ] }),
              /* @__PURE__ */ ht.jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [
                /* @__PURE__ */ ht.jsx(
                  "button",
                  {
                    onClick: () => de(!ct),
                    style: { background: "none", border: "none", cursor: "pointer" },
                    children: ct ? /* @__PURE__ */ ht.jsx(yk, { size: 16 }) : /* @__PURE__ */ ht.jsx(gk, { size: 16 })
                  }
                ),
                /* @__PURE__ */ ht.jsx("button", { onClick: X, style: { background: "none", border: "none", cursor: "pointer" }, children: /* @__PURE__ */ ht.jsx(Ek, { size: 16, color: fn.text }) })
              ] })
            ]
          }
        ),
        !ct && /* @__PURE__ */ ht.jsxs(ht.Fragment, { children: [
          /* @__PURE__ */ ht.jsxs(
            "div",
            {
              style: {
                flex: 1,
                overflowY: "auto",
                padding: "0.75rem"
              },
              children: [
                zt.map((Ee) => /* @__PURE__ */ ht.jsxs("div", { style: { marginBottom: "0.5rem" }, children: [
                  /* @__PURE__ */ ht.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.75rem" }, children: [
                    /* @__PURE__ */ ht.jsx(hR, { size: 12, color: Ee.isSystem ? fn.accent : fn.text }),
                    /* @__PURE__ */ ht.jsx("span", { style: { fontWeight: 600 }, children: Ee.sender }),
                    /* @__PURE__ */ ht.jsx(mk, { size: 10, color: "#888" }),
                    /* @__PURE__ */ ht.jsx("span", { style: { color: "#888" }, children: Ve(Ee.timestamp) })
                  ] }),
                  /* @__PURE__ */ ht.jsx(
                    "div",
                    {
                      style: {
                        marginLeft: Ee.sender === A.username ? "1rem" : 0,
                        padding: "0.5rem",
                        borderLeft: `4px solid ${Ee.isSystem ? fn.accent : fn.border}`,
                        backgroundColor: Ee.isSystem ? fn.secondary : fn.border,
                        borderRadius: "0.25rem",
                        color: fn.text,
                        fontSize: "0.875rem"
                      },
                      children: Ee.text
                    }
                  )
                ] }, Ee.id)),
                /* @__PURE__ */ ht.jsx("div", { ref: oe })
              ]
            }
          ),
          /* @__PURE__ */ ht.jsxs(
            "div",
            {
              style: {
                borderTop: `2px solid ${fn.border}`,
                padding: "0.75rem",
                display: "flex",
                flexDirection: "column"
              },
              children: [
                /* @__PURE__ */ ht.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }, children: [
                  /* @__PURE__ */ ht.jsx("span", { style: { fontSize: "0.75rem", color: fn.accent }, children: "Conectado como:" }),
                  /* @__PURE__ */ ht.jsx("span", { style: { fontSize: "0.75rem", fontWeight: 600 }, children: A.username })
                ] }),
                /* @__PURE__ */ ht.jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [
                  /* @__PURE__ */ ht.jsx(
                    "input",
                    {
                      ref: Xe,
                      type: "text",
                      value: Ie,
                      onChange: (Ee) => S(Ee.target.value),
                      onKeyPress: le,
                      placeholder: "Escribe tu mensaje...",
                      style: {
                        flex: 1,
                        padding: "0.5rem",
                        borderRadius: "0.25rem",
                        border: `2px solid ${fn.border}`,
                        backgroundColor: fn.background,
                        color: fn.text,
                        fontSize: "0.875rem"
                      }
                    }
                  ),
                  /* @__PURE__ */ ht.jsx(
                    "button",
                    {
                      onClick: ve,
                      disabled: !Ie.trim(),
                      style: {
                        padding: "0.5rem 1rem",
                        borderRadius: "0.25rem",
                        border: `2px solid ${fn.accent}`,
                        backgroundColor: fn.accent,
                        color: fn.background,
                        cursor: Ie.trim() ? "pointer" : "not-allowed"
                      },
                      children: /* @__PURE__ */ ht.jsx(Sk, { size: 16 })
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        ct && /* @__PURE__ */ ht.jsxs("div", { style: { padding: "1rem", textAlign: "center" }, children: [
          /* @__PURE__ */ ht.jsx(S0, { size: 20, color: fn.accent }),
          /* @__PURE__ */ ht.jsx("div", { style: { color: fn.text }, children: "Chat minimizado" })
        ] })
      ]
    }
  ) : null;
}
function Tk() {
  const [q, X] = Nu.useState(!1), A = { username: "Usuario_EEVI" };
  return /* @__PURE__ */ ht.jsxs(ht.Fragment, { children: [
    /* @__PURE__ */ ht.jsx(Ck, { onOpen: () => X(!0) }),
    /* @__PURE__ */ ht.jsx(Rk, { isOpen: q, onClose: () => X(!1), user: A })
  ] });
}
const dR = document.getElementById("eevi-chat-root");
dR && g0(dR).render(/* @__PURE__ */ ht.jsx(Tk, {}));
