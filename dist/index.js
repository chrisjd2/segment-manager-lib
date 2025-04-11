import { ref as N, computed as Oe, watch as un, createElementBlock as x, openBlock as h, normalizeClass as We, createElementVNode as f, createCommentVNode as B, normalizeStyle as En, createBlock as pe, unref as S, Fragment as ge, renderList as Ae, createTextVNode as nt, toDisplayString as ie, withKeys as $a, renderSlot as er, createVNode as Y, onMounted as wn, onUnmounted as rh, resolveComponent as g0, withCtx as Vt, withModifiers as ah, nextTick as c0 } from "vue";
import { CataUiInputCheckbox as Sn, CataUiIcon as Ot, CataUiStatusLabel as sh, CataUiInputDate as x0, CataUiInputSelect as Ft, CataUiInput as $t, CataUiButton as ct, CataUiTooltip as d0, CataUiModal as y0, CataUiTabs as Ia, CataUiSpinner as Nn, CataUiTabSwitch as lh } from "@catalyst/ui-library";
import { defineStore as k0 } from "pinia";
import oi from "axios";
import An from "dayjs";
import { CataCoreUiChart as La } from "@catalyst-core/ui-library";
import { v4 as Ca } from "uuid";
import { Container as Ba, Draggable as oh } from "vue3-smooth-dnd";
import { LottieAnimation as uh } from "lottie-web-vue";
import { useIntersectionObserver as f0, promiseTimeout as ch } from "@vueuse/core";
const dh = {
  async fetch_database_model(o, I) {
    try {
      const a = await gh(o, I);
      this.set_custom_database_model(a.data);
    } catch (a) {
      const _ = {
        error: a,
        headline: "Error",
        message: a.response.data || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(_);
    }
  },
  async fetch_custom_segment_settings(o) {
    var I;
    try {
      const a = await xh(o);
      this.set_custom_segment_settings(a.data);
    } catch (a) {
      const _ = {
        error: a,
        headline: "Error",
        message: ((I = a.response) == null ? void 0 : I.data) || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(_);
    }
  },
  async generate_ai_query(o, I) {
    var a;
    try {
      return (await kh(o, I)).data;
    } catch (_) {
      const m = {
        error: _,
        headline: "Error",
        message: ((a = _ == null ? void 0 : _.response) == null ? void 0 : a.data) || "Sorry, an error occurred while generating your query."
      };
      this.set_ApiError(m);
    }
  },
  async validate_query(o) {
    var I;
    try {
      const a = await validateQuery(o);
    } catch (a) {
      const _ = {
        error: a,
        headline: "Error",
        message: ((I = a == null ? void 0 : a.response) == null ? void 0 : I.data) || "Sorry, an error occurred while validating your query."
      };
      this.set_ApiError(_);
    }
  },
  async run_query(o, I) {
    var a;
    try {
      return (await yh(o, I)).count;
    } catch (_) {
      const m = {
        error: _,
        headline: "Error",
        message: ((a = _ == null ? void 0 : _.response) == null ? void 0 : a.data) || "Sorry, an error occurred while validating your query."
      };
      this.set_ApiError(m);
    }
  },
  set_ApiError(o) {
    this.apiError = o;
  },
  set_custom_segment_settings(o) {
    this.settings = o;
  },
  set_customSegmentUrl(o) {
    this.customSegmentUrl = o;
  },
  set_custom_database_model(o) {
    this.databaseModel = o;
  },
  set_ai_generated_message(o) {
    this.aiGeneratedInfoMessage = o;
  },
  set_ai_generated_query(o) {
    this.aiGeneratedQuery = o;
  },
  set_free_form_query(o) {
    this.freeFormQuery = o;
  }
}, fh = {
  get_segment_settings(o) {
    return o.settings;
  },
  get_databaseModel(o) {
    return o.databaseModel;
  },
  get_aiGeneratedQuery(o) {
    return o.aiGeneratedQuery;
  },
  get_aiGeneratedMessage(o) {
    return o.aiGeneratedInfoMessage;
  }
}, nr = k0("customSegmentStore", {
  state: () => ({
    customSegmentUrl: "",
    databaseModel: [],
    settings: null,
    aiGeneratedInfo: null,
    aiGeneratedQuery: null,
    aiGeneratedInfoMessage: null,
    freeFormQuery: null
  }),
  actions: dh,
  getters: fh
}), Cn = "", ir = oi.create(), ui = oi.create();
oi.create();
ir.interceptors.request.use(
  (o) => {
    const I = cn();
    return o.baseURL = I.baseUrl, o.headers.Authorization = `Bearer ${I.token}`, o.headers.Accept = "application/json", o.headers["Content-Type"] = "application/json", o.headers["x-tenant"] = I.tenantId, o.headers["brand-id"] = I.brandId, o.headers["Cache-Control"] = "no-cache, no-store, must-revalidate", o.headers.Pragma = "no-cache", o.headers.Expires = "0", v0(o), o;
  },
  (o) => Promise.reject(o)
);
ui.interceptors.request.use(
  (o) => {
    const I = cn(), a = nr();
    return o.baseURL = a.customSegmentUrl, o.headers.Authorization = `Bearer ${I.token}`, o.headers.Accept = "application/json", o.headers["Content-Type"] = "application/json", o.headers["x-tenant"] = I.tenantId, o.headers["brand-id"] = I.brandId, v0(o), o;
  },
  (o) => Promise.reject(o)
);
const ph = () => oi.get("/appConfig.json").then((o) => o.data).catch((o) => {
  throw o;
}), v0 = (o) => {
  (o.method === "put" || o.method === "post") && o.data === void 0 && (o.data = {});
}, p0 = (o, I) => ir.get(`${Cn}/api/v1/segments/${I ?? 1}`, { params: o }).then((a) => a.data).catch((a) => {
  throw a;
}), hh = (o) => ir.get(`${Cn}/api/v1/insights/${o}`, { params: queryParams }).then((I) => I.data).catch((I) => {
  throw I;
}), mh = () => ir.get(`${Cn}/api/v1/settings`).then((o) => o.data).catch((o) => {
  throw o;
}), gh = (o, I) => ui.get(`${Cn}/api/v1/settings/platform/${o}`).then((a) => a.data).catch((a) => {
  throw a;
}), xh = () => ui.get(`${Cn}/api/v1/settings/`).then((o) => o.data).catch((o) => {
  throw o;
}), yh = (o, I) => ui.post(`${Cn}/api/v1/query/${I}`, o).then((a) => a.data).catch((a) => {
  throw a;
}), kh = (o, I) => ui.post(`${Cn}/api/v1/query/gen/${I}`, o).then((a) => a.data).catch((a) => {
  throw a;
}), vh = {
  async fetch_appSettings() {
    try {
      const o = await ph();
      this.set_appSettings(o);
    } catch (o) {
      throw this.set_ApiError(o), o;
    }
  },
  set_appSettings(o) {
    this.appSettings = o;
  },
  set_applicationType(o) {
    this.applicationType = o;
  },
  async fetch_insights() {
    try {
      return await hh(this.brandId, this.tenantId);
    } catch (o) {
      const I = {
        error: o,
        headline: "Error",
        message: o.response || "Sorry, an error occurred while getting insights your data."
      };
      this.set_ApiError(I);
    }
  },
  async fetch_segments() {
    try {
      if (Object.keys(this.profile).length > 0 && this.profile.market.length > 0 && this.applicationType === "standalone")
        this.set_demographics(this.profile);
      else if (this.brief.region && this.brief.market && this.brief.language && this.brief.channel) {
        const m = {
          region: this.brief.region,
          market: this.brief.market,
          language: this.brief.language,
          channel: this.brief.channel
        };
        this.set_demographics(m);
      }
      const o = this.platform || 1;
      this.currentPage = 1;
      const I = {
        ...this.query,
        page: 1
      }, a = await p0(I, o);
      let _;
      a != null && a.data && (_ = a.data.map((m) => ({
        ...m,
        status: {
          type: m.status,
          value: m.status ? m.status : "active",
          color: this.stateColors[m.status]
        }
      }))), this.set_numberOfPages(a.totalPages), this.set_segments(_);
    } catch (o) {
      const I = {
        error: o,
        headline: "Error",
        message: o.response || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(I);
    }
  },
  async fetch_nextSegmentPage() {
    var a;
    const o = this.platform, I = {
      ...this.query,
      page: this.currentPage + 1
    };
    try {
      const _ = await p0(I, o), m = _.data.map((w) => ({
        ...w,
        status: {
          type: w.status,
          value: w.status ? w.status : "active",
          color: this.stateColors[w.status]
        }
      }));
      this.set_numberOfPages(_.totalPages), this.add_segments(m);
    } catch (_) {
      const m = {
        error: _,
        headline: "Error",
        message: ((a = _.response) == null ? void 0 : a.data) || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(m);
    }
  },
  async fetch_segment_settings(o) {
    var I;
    try {
      const a = await mh(o);
      this.set_segment_settings(a.data);
    } catch (a) {
      const _ = {
        error: a,
        headline: "Error",
        message: ((I = a.response) == null ? void 0 : I.data) || "Sorry, an error occurred while getting your data."
      };
      this.set_ApiError(_);
    }
  },
  set_ApiError(o) {
    this.apiError = o;
  },
  set_tenantId(o) {
    this.tenantId = o;
  },
  set_brandId(o) {
    this.brandId = o;
  },
  set_baseUrl(o) {
    this.baseUrl = o;
  },
  set_token(o) {
    this.token = o;
  },
  set_brief(o) {
    this.brief = o;
  },
  set_profile(o) {
    this.profile = o;
  },
  set_demographics(o) {
    this.query = {
      ...this.query,
      demographics: o
    };
  },
  set_segments(o) {
    o ? this.segments = o : this.segments = null;
  },
  set_numberOfPages(o) {
    this.numberOfPages = o;
  },
  set_platform(o) {
    this.platform = o;
  },
  set_query(o) {
    this.query = o;
  },
  set_searchTerm(o) {
    o || delete this.query.searchTerm, this.query.searchTerm = o;
  },
  set_filterQuery(o) {
    this.query = {
      ...this.query,
      ...o.value
    };
  },
  reset_filterQuery() {
    this.query.page = 1, this.query = {
      ...this.query,
      name: null,
      description: null,
      count: null,
      status: null
    };
  },
  set_sortQuery(o) {
    this.query.sortDirection = o.sortOrder === 1 ? "asc" : "desc", this.query.sortField = o.sortColumn, this.query = {
      ...this.query
    };
  },
  set_categoryQuery(o) {
    this.query.category = o;
  },
  set_locationQuery(o) {
    this.query.location = o;
  },
  add_segments(o) {
    this.segments.push(...o), this.currentPage += 1;
  },
  set_loadingItems(o) {
    this.loadingItems = o;
  },
  remove_SortQuery(o) {
    this.sortQuery = null;
  },
  set_segment_settings(o) {
    this.settings = o;
  },
  set_market(o) {
    this.market = o;
  },
  set_selectedSegment(o) {
    this.selectedSegment = o;
  },
  set_selectedSegmentType(o) {
    this.selectedSegmentType = o;
  },
  set_activeTab(o) {
    this.activeTab = o;
  },
  set_audienceType(o) {
    this.audienceType = o;
  }
}, _h = {
  get_market(o) {
    return o.market;
  },
  get_brief(o) {
    return o.brief;
  },
  get_profiles(o) {
    return o.profiles;
  },
  get_segments(o) {
    return o.segments;
  },
  get_isLastPage(o) {
    return o.currentPage < o.numberOfPages;
  },
  get_loadingItems(o) {
    return o.loadingItems;
  },
  get_query(o) {
    return o.query;
  },
  get_segment_settings(o) {
    return o.settings;
  },
  get_selectedSegment(o) {
    return o.selectedSegment;
  },
  get_segmentModel(o) {
    return o.segmentModel;
  },
  get_selectedSegmentType(o) {
    return o.selectedSegmentType;
  },
  get_activeTab(o) {
    return o.activeTab;
  },
  get_audienceType(o) {
    return o.audienceType;
  },
  get_aiQuery(o) {
    return o.aiQuery;
  }
}, cn = k0("segmentManagerStore", {
  state: () => ({
    baseUrl: "https://sm-standard-segments-838902823068.europe-west2.run.app",
    applicationType: "",
    tenantId: "",
    brandId: "3",
    token: "",
    brief: {},
    profiles: [],
    profile: {},
    selectedProfile: null,
    stateColors: {
      active: "#28a745",
      inactive: "#999999",
      pending: "#ffc107"
    },
    isFetchingSegments: !1,
    activeTab: "standard",
    segments: [],
    platform: 1,
    currentPage: 1,
    numberOfPages: null,
    segmentDatabaseModel: [],
    query: {
      page: 1,
      pageSize: 15,
      category: 1,
      sortField: null,
      sortDirection: "desc",
      location: null,
      name: null,
      description: null,
      count: null,
      status: null,
      searchTerm: null,
      demographics: {
        region: "",
        market: "",
        language: "",
        channel: ""
      }
    },
    selectedFilters: {
      name: "",
      description: "",
      count: "",
      status: ""
    },
    settings: null,
    selectedSegment: null,
    selectedSegmentType: "standard",
    audienceType: "attr",
    market: null,
    fetchBriefsAbortController: null,
    fetchCalBriefsAbortController: null,
    apiError: null,
    appAlerts: [],
    appSettings: null
  }),
  actions: vh,
  getters: _h
}), li = Object.freeze({
  ACCESS_DENIED: "accessDenied",
  ADD_CLICKED: "addClicked",
  ADD: "add",
  BRIEF_ADDED: "briefAdded",
  BRIEF_DELETED: "briefDeleted",
  CHANGE_OPTION: "changeOption",
  CHANGE_STATE: "changeState",
  CHANGE_VIEW: "changeView",
  CLEAR_FILTERS: "clearFilters",
  CLICK: "click",
  CLOSE: "close",
  COLUMN_SORTED: "columnSorted",
  CONTENT_PIECE_CHECKED: "contentPieceChecked",
  CONTENT_PIECE_INSERT: "contentPieceInsert",
  COPY: "copy",
  DELETE_CLICKED: "deleteClicked",
  ERROR: "error",
  EXIT_CONFIRM: "exitConfirm",
  EXPAND_CLICKED: "expandClicked",
  FIELD_MESSAGE: "fieldMessage",
  FILTER_CHANGE: "filterChange",
  GRID_RESIZE: "gridResize",
  HEADER_STEP_CLICKED: "headerStepClicked",
  IFRAME_LOADED: "iframeLoaded",
  IMAGE_CLICKED: "imageClicked",
  IMAGE_ERROR: "imageError",
  IMAGE_LOADED: "imageLoaded",
  IMPORT_ACTION_CLICK: "importActionClick",
  INPUT: "input",
  INSERT_CLICKED: "insertClicked",
  INTERSECTING: "intersecting",
  ITEMS_DELETED: "itemsDeleted",
  ITEMS_MOVED: "itemsMoved",
  LABEL_STATE_CHANGED: "labelStateChanged",
  LINK_STATE_CHANGED: "linkStateChanged",
  LOAD: "load",
  MESSAGE: "message",
  MOUSEDOWN: "mousedown",
  MOUSELEAVE: "mouseleave",
  MOUSEMOVE: "mousemove",
  MOUSEUP: "mouseup",
  ON_ACTION_CLICK: "onActionClick",
  PAGE_CHANGED: "pageChanged",
  PREVIEW_CONTROLLS_COLLAPSE: "previewControllsCollapse",
  PREVIEW_HEIGHT_UPDATE: "previewHeightUpdate",
  PREVIEW_TYPE_CHANGED: "previewTypeChanged",
  RELOAD_GRID: "reloadGrid",
  REMOVE_CLICKED: "removeClicked",
  REMOVE: "remove",
  REQUEST_ERROR: "requestError",
  RESET_COLUMNS: "resetColumns",
  RESIZE: "resize",
  ROW_CHECKED: "rowChecked",
  ROW_CLICKED: "rowClicked",
  SAVE_AND_DOWNLOAD: "saveAndDownload",
  SCROLL_TO_ELEMENT: "scrollToElement",
  SENDER_STATE_CHANGED: "senderStateChanged",
  SET_CONTENT_SOURCE: "setContentSource",
  SET_METADATA: "setMetadata",
  SET_SUBJECT_LINE: "setSubjectLine",
  SET_STATUS: "setStatus",
  SPACING_STATE_CHANGED: "spacingStateChanged",
  SUBMIT: "submit",
  SUCCESS: "success",
  TOGGLE: "toggle",
  TYPE_CLICKED: "typeClicked",
  UPDATE_VIEW: "updateView",
  UPLOADING: "uploading",
  VALUE_CHANGE: "valueChange",
  VIEW_STATE_CHANGED: "viewStateChanged"
}), Ke = (o, I) => {
  const a = o.__vccOpts || o;
  for (const [_, m] of I)
    a[_] = m;
  return a;
}, bh = ["onClick"], Eh = { key: 0 }, Sh = ["onClick"], Ah = { class: "text-center" }, wh = ["title"], Ch = ["title"], Th = ["onClick"], Dh = {
  key: 0,
  class: "checkbox-container"
}, Ih = ["onKeydown", "onClick"], Lh = ["src"], Bh = {
  key: 4,
  class: "d-flex justify-content-end pr-45"
}, Fh = ["title"], $h = {
  key: 0,
  class: "no-matches"
}, Vh = {
  __name: "BaseTable",
  props: {
    rows: Array,
    columns: Array,
    stickyHeader: Number,
    showNoMatchLabel: {
      type: Boolean,
      default: !0
    },
    inactive: {
      type: Boolean,
      default: !1
    },
    selectable: {
      type: Boolean,
      default: !0
    },
    sortable: {
      type: Boolean,
      default: !0
    },
    collapseControls: {
      type: Boolean,
      default: !1
    },
    small: {
      type: Boolean,
      default: !1
    },
    trRelative: {
      type: Boolean,
      default: !1
    },
    checkedRows: {
      type: Array,
      default: () => []
    },
    fixedActions: {
      type: Boolean,
      default: !0
    },
    enableHover: {
      type: Boolean,
      default: !0
    },
    maxWidthCell: {
      type: String,
      default: "400"
    },
    minWidthCell: {
      type: Object
    },
    enableSingleSelect: {
      type: Boolean,
      default: !1
    },
    expandable: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["rowChecked", "rowClicked", "columnSorted"],
  setup(o, { emit: I }) {
    const a = I, _ = o, m = N(null), w = N(!1), C = N(1), R = N([]), J = N(null), G = N(!1), z = N({}), K = Oe(
      {
        get() {
          return _.checkedRows;
        },
        set(q) {
          R.value = q;
        }
      }
    ), H = Oe(() => _.stickyHeader !== void 0 ? `position: sticky; z-index: 10; top: ${_.stickyHeader}px;` : "");
    function L() {
      _.expandable && _.rows.length > 0 && (G.value = !G.value, G.value === !1 && (z.value = {}));
    }
    function A(q) {
      return _.expandable && q.details.length === 1;
    }
    function D(q) {
      z[q] ? z[q] = !z[q] : this.$set(z, q, !0);
    }
    function Z(q) {
      J.value = q;
    }
    function ye(q, $, F) {
      F.key !== "actions" && F.type !== "link" && $.showInAction !== !1 && a("rowClicked", { event: q, row: $ });
    }
    function he(q) {
      _.sortable && q.key !== "actions" && q.type !== "link" && (m.value === q.key ? C.value *= -1 : (m.value = q.key, C.value = 1), a("columnSorted", { sortColumn: m.value, sortOrder: C }));
    }
    function ce(q, $) {
      let F = "";
      if (typeof q == "object" ? F = q.value : F = q, $ === "datetime") {
        const V = An(new Date(F));
        return An(V).format("DD MMM YYYY");
      }
      if ($ === "datetimehour") {
        const V = An(new Date(F));
        return An(V).format("DD MMM YYYY, HH:mm");
      }
      return $ === "number" || (typeof F == "number" || typeof F == "string" && !Number.isNaN(Number(F))) && String(F).trim() !== "" ? (typeof F == "string" ? Number(F) : F).toLocaleString() : F;
    }
    function de(q) {
      return q == null ? "" : (typeof q == "string" ? parseInt(q, 10) : q).toLocaleString();
    }
    return un(w, (q) => {
      q === "true" || q === !0 ? _.rows.forEach(($) => {
        !R.value.includes($.id) && $.showInAction !== !1 && R.value.push($.id);
      }) : R.value = [], a("rowChecked", R.value);
    }), (q, $) => (h(), x("div", {
      class: We(["base-table-wrapper", { inactive: o.inactive }])
    }, [
      f("table", {
        class: We(["base-table", { small: o.small, "enable-hover": o.enableHover }]),
        ref: "baseTable"
      }, [
        f("thead", null, [
          f("tr", {
            onClick: $[1] || ($[1] = (F) => L())
          }, [
            !o.collapseControls && !o.expandable ? (h(), x("th", {
              key: 0,
              class: "checkbox-container",
              style: En(H.value)
            }, [
              o.selectable ? (h(), pe(S(Sn), {
                key: 0,
                modelValue: w.value,
                "onUpdate:modelValue": $[0] || ($[0] = (F) => w.value = F)
              }, null, 8, ["modelValue"])) : B("", !0)
            ], 4)) : B("", !0),
            o.expandable ? (h(), x("th", {
              key: 1,
              class: We(["text-center", {
                expandable: o.expandable
              }]),
              style: En(H.value)
            }, [
              o.rows.length > 0 && o.rows[0].details.length > 1 ? (h(), pe(S(Ot), {
                key: 0,
                class: "expand-icon",
                icon: G.value ? "bi-caret-down-fill" : "bi-caret-right-fill",
                color: G.value ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                size: "16"
              }, null, 8, ["icon", "color"])) : B("", !0)
            ], 6)) : B("", !0),
            (h(!0), x(ge, null, Ae(o.columns, (F) => (h(), x("th", {
              style: En(H.value),
              key: F.id,
              onClick: (V) => he(F),
              class: We({
                actions: F.key === "actions",
                active: m.value === F.key,
                sortable: o.sortable && F.key !== "actions" && F.type != "link",
                expandable: o.expandable
              })
            }, [
              F.key !== "actions" && F.type != "link" ? (h(), x(ge, { key: 0 }, [
                nt(ie(F.value) + " ", 1),
                o.sortable ? (h(), pe(S(Ot), {
                  key: 0,
                  class: "sort-icon",
                  icon: "bi-chevron-expand",
                  size: "16"
                })) : B("", !0)
              ], 64)) : B("", !0)
            ], 14, bh))), 128))
          ])
        ]),
        o.rows ? (h(), x("tbody", Eh, [
          (h(!0), x(ge, null, Ae(o.rows, (F) => (h(), x(ge, null, [
            (h(!0), x(ge, null, Ae(F.details, (V) => (h(), x(ge, null, [
              o.expandable & G.value || A(F) ? (h(), x("tr", {
                class: We({ expandable: o.expandable && V.details.length === 1 }),
                key: V.id,
                onClick: (ve) => D(V.id)
              }, [
                f("td", Ah, [
                  V.details.length > 1 ? (h(), pe(S(Ot), {
                    key: 0,
                    class: "expand-icon",
                    icon: z.value[V.id] ? "bi-caret-down-fill" : "bi-caret-right-fill",
                    color: z.value[V.id] ? "var(--wpp-primary-color-400)" : "var(--wpp-grey-color-400)",
                    size: 16
                  }, null, 8, ["icon", "color"])) : B("", !0)
                ]),
                (h(!0), x(ge, null, Ae(o.columns, (ve) => (h(), x("td", {
                  style: En({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[ve.key] ? `${o.minWidthCell[ve.key]}px` : "0px"
                  }),
                  key: ve.key
                }, [
                  f("template", null, [
                    f("span", {
                      title: ce(V[ve.key].value || V[ve.key], ve.type)
                    }, ie(ce(V[ve.key], ve.type)), 9, wh)
                  ])
                ], 4))), 128))
              ], 10, Sh)) : B("", !0),
              V.details.length > 1 && z.value[V.id] ? (h(!0), x(ge, { key: 1 }, Ae(V.details, (ve) => (h(), x("tr", {
                class: "subrow-details",
                key: ve.id
              }, [
                $[4] || ($[4] = f("td", { class: "d-flex text-center align-items-start pt-1" }, null, -1)),
                (h(!0), x(ge, null, Ae(o.columns, (Fe) => (h(), x("td", {
                  style: En({
                    "max-width": `${o.maxWidthCell}px`,
                    "min-width": o.minWidthCell && o.minWidthCell[Fe.key] ? `${o.minWidthCell[Fe.key]}px` : "0px"
                  }),
                  key: Fe.key
                }, [
                  f("template", null, [
                    f("span", {
                      title: ce(ve[Fe.key], Fe.type)
                    }, ie(ce(ve[Fe.key], Fe.type)), 9, Ch)
                  ])
                ], 4))), 128))
              ]))), 128)) : B("", !0)
            ], 64))), 256)),
            (o.expandable && F.details.length) > 1 || o.expandable && F.details[0].details.length > 1 || !o.expandable ? (h(), x("tr", {
              class: We({
                active: K.value.includes(F.id),
                static: F.showInAction === !1,
                trRelative: o.trRelative,
                activeSelected: J.value === F._id && o.enableSingleSelect,
                expandable: o.expandable,
                bold: o.expandable
              }),
              key: F.id,
              onClick: (V) => Z(F._id)
            }, [
              o.collapseControls ? B("", !0) : (h(), x("td", Dh, [
                o.selectable && F.showInAction !== !1 ? (h(), pe(S(Sn), {
                  key: 0,
                  modelValue: K.value,
                  "onUpdate:modelValue": $[2] || ($[2] = (V) => K.value = V),
                  val: F.id,
                  onInput: $[3] || ($[3] = (V) => q.$emit(S(li).ROW_CHECKED, R.value))
                }, null, 8, ["modelValue", "val"])) : B("", !0)
              ])),
              (h(!0), x(ge, null, Ae(o.columns, (V) => (h(), x("td", {
                class: We({
                  actions: V.key === "actions",
                  fixedActions: o.fixedActions && V.key === "actions"
                }),
                style: En({
                  "max-width": `${o.maxWidthCell}px`,
                  "min-width": o.minWidthCell && o.minWidthCell[V.key] ? `${o.minWidthCell[V.key]}px` : "0px"
                }),
                key: V.key,
                onKeydown: $a((ve) => ye(ve, F, V), ["enter"]),
                onClick: (ve) => ye(ve, F, V)
              }, [
                F[V.key] !== void 0 && F[V.key] !== null && V.key !== "actions" ? (h(), x(ge, { key: 0 }, [
                  F[V.key].icon ? (h(), x("img", {
                    key: 0,
                    alt: "",
                    src: F[V.key].icon,
                    class: We(V.key)
                  }, null, 10, Lh)) : F[V.key].biicon ? (h(), x("span", {
                    key: 1,
                    class: We(["table-bi-icon", F[V.key].biicon]),
                    style: En({ color: F[V.key].color })
                  }, null, 6)) : B("", !0),
                  F[V.key].type ? (h(), pe(S(sh), {
                    key: 2,
                    "font-size": 12,
                    label: F[V.key].value,
                    color: F[V.key].color
                  }, null, 8, ["label", "color"])) : V.type === "link" ? er(q.$slots, "linkHandler", {
                    key: 3,
                    link: { row: F, columnKey: V.key }
                  }, void 0, !0) : V.type === "number" ? (h(), x("span", Bh, ie(de(F[V.key])), 1)) : (h(), x("span", {
                    key: 5,
                    title: ce(F[V.key].value || F[V.key], V.type)
                  }, ie(ce(F[V.key], V.type)), 9, Fh))
                ], 64)) : B("", !0),
                V.key === "actions" ? er(q.$slots, "actionButton", {
                  key: 1,
                  row: F
                }, void 0, !0) : B("", !0)
              ], 46, Ih))), 128))
            ], 10, Th)) : B("", !0)
          ], 64))), 256))
        ])) : B("", !0)
      ], 2),
      (o.rows && o.rows.length <= 0 || !o.rows) && o.showNoMatchLabel ? (h(), x("p", $h, " No matches found ")) : B("", !0)
    ], 2));
  }
}, Oh = /* @__PURE__ */ Ke(Vh, [["__scopeId", "data-v-bdd2a344"]]);
var si = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, tr = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
tr.exports;
(function(o, I) {
  (function() {
    var a, _ = "4.17.21", m = 200, w = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", C = "Expected a function", R = "Invalid `variable` option passed into `_.template`", J = "__lodash_hash_undefined__", G = 500, z = "__lodash_placeholder__", K = 1, H = 2, L = 4, A = 1, D = 2, Z = 1, ye = 2, he = 4, ce = 8, de = 16, q = 32, $ = 64, F = 128, V = 256, ve = 512, Fe = 30, Me = "...", Pe = 800, kt = 16, Pt = 1, dn = 2, fn = 3, Tt = 1 / 0, ze = 9007199254740991, j = 17976931348623157e292, U = NaN, T = 4294967295, se = T - 1, vt = T >>> 1, Dt = [
      ["ary", F],
      ["bind", Z],
      ["bindKey", ye],
      ["curry", ce],
      ["curryRight", de],
      ["flip", ve],
      ["partial", q],
      ["partialRight", $],
      ["rearg", V]
    ], _t = "[object Arguments]", Rt = "[object Array]", De = "[object AsyncFunction]", Zt = "[object Boolean]", Jt = "[object Date]", rr = "[object DOMException]", Tn = "[object Error]", Gt = "[object Function]", ci = "[object GeneratorFunction]", it = "[object Map]", Xt = "[object Number]", ar = "[object Null]", bt = "[object Object]", di = "[object Promise]", sr = "[object Proxy]", X = "[object RegExp]", b = "[object Set]", M = "[object String]", Se = "[object Symbol]", O = "[object Undefined]", oe = "[object WeakMap]", Et = "[object WeakSet]", pn = "[object ArrayBuffer]", Mt = "[object DataView]", qn = "[object Float32Array]", lr = "[object Float64Array]", or = "[object Int8Array]", ur = "[object Int16Array]", cr = "[object Int32Array]", dr = "[object Uint8Array]", fr = "[object Uint8ClampedArray]", pr = "[object Uint16Array]", hr = "[object Uint32Array]", E0 = /\b__p \+= '';/g, S0 = /\b(__p \+=) '' \+/g, A0 = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Va = /&(?:amp|lt|gt|quot|#39);/g, Oa = /[&<>"']/g, w0 = RegExp(Va.source), C0 = RegExp(Oa.source), T0 = /<%-([\s\S]+?)%>/g, D0 = /<%([\s\S]+?)%>/g, Pa = /<%=([\s\S]+?)%>/g, I0 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, L0 = /^\w*$/, B0 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, mr = /[\\^$.*+?()[\]{}|]/g, F0 = RegExp(mr.source), gr = /^\s+/, $0 = /\s/, V0 = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, O0 = /\{\n\/\* \[wrapped with (.+)\] \*/, P0 = /,? & /, R0 = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, G0 = /[()=,{}\[\]\/\s]/, M0 = /\\(\\)?/g, U0 = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Ra = /\w*$/, W0 = /^[-+]0x[0-9a-f]+$/i, N0 = /^0b[01]+$/i, q0 = /^\[object .+?Constructor\]$/, z0 = /^0o[0-7]+$/i, H0 = /^(?:0|[1-9]\d*)$/, Q0 = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, fi = /($^)/, K0 = /['\n\r\u2028\u2029\\]/g, pi = "\\ud800-\\udfff", Y0 = "\\u0300-\\u036f", Z0 = "\\ufe20-\\ufe2f", J0 = "\\u20d0-\\u20ff", Ga = Y0 + Z0 + J0, Ma = "\\u2700-\\u27bf", Ua = "a-z\\xdf-\\xf6\\xf8-\\xff", X0 = "\\xac\\xb1\\xd7\\xf7", j0 = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", eo = "\\u2000-\\u206f", to = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Wa = "A-Z\\xc0-\\xd6\\xd8-\\xde", Na = "\\ufe0e\\ufe0f", qa = X0 + j0 + eo + to, xr = "['’]", no = "[" + pi + "]", za = "[" + qa + "]", hi = "[" + Ga + "]", Ha = "\\d+", io = "[" + Ma + "]", Qa = "[" + Ua + "]", Ka = "[^" + pi + qa + Ha + Ma + Ua + Wa + "]", yr = "\\ud83c[\\udffb-\\udfff]", ro = "(?:" + hi + "|" + yr + ")", Ya = "[^" + pi + "]", kr = "(?:\\ud83c[\\udde6-\\uddff]){2}", vr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Dn = "[" + Wa + "]", Za = "\\u200d", Ja = "(?:" + Qa + "|" + Ka + ")", ao = "(?:" + Dn + "|" + Ka + ")", Xa = "(?:" + xr + "(?:d|ll|m|re|s|t|ve))?", ja = "(?:" + xr + "(?:D|LL|M|RE|S|T|VE))?", es = ro + "?", ts = "[" + Na + "]?", so = "(?:" + Za + "(?:" + [Ya, kr, vr].join("|") + ")" + ts + es + ")*", lo = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", oo = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ns = ts + es + so, uo = "(?:" + [io, kr, vr].join("|") + ")" + ns, co = "(?:" + [Ya + hi + "?", hi, kr, vr, no].join("|") + ")", fo = RegExp(xr, "g"), po = RegExp(hi, "g"), _r = RegExp(yr + "(?=" + yr + ")|" + co + ns, "g"), ho = RegExp([
      Dn + "?" + Qa + "+" + Xa + "(?=" + [za, Dn, "$"].join("|") + ")",
      ao + "+" + ja + "(?=" + [za, Dn + Ja, "$"].join("|") + ")",
      Dn + "?" + Ja + "+" + Xa,
      Dn + "+" + ja,
      oo,
      lo,
      Ha,
      uo
    ].join("|"), "g"), mo = RegExp("[" + Za + pi + Ga + Na + "]"), go = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, xo = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], yo = -1, Te = {};
    Te[qn] = Te[lr] = Te[or] = Te[ur] = Te[cr] = Te[dr] = Te[fr] = Te[pr] = Te[hr] = !0, Te[_t] = Te[Rt] = Te[pn] = Te[Zt] = Te[Mt] = Te[Jt] = Te[Tn] = Te[Gt] = Te[it] = Te[Xt] = Te[bt] = Te[X] = Te[b] = Te[M] = Te[oe] = !1;
    var Ce = {};
    Ce[_t] = Ce[Rt] = Ce[pn] = Ce[Mt] = Ce[Zt] = Ce[Jt] = Ce[qn] = Ce[lr] = Ce[or] = Ce[ur] = Ce[cr] = Ce[it] = Ce[Xt] = Ce[bt] = Ce[X] = Ce[b] = Ce[M] = Ce[Se] = Ce[dr] = Ce[fr] = Ce[pr] = Ce[hr] = !0, Ce[Tn] = Ce[Gt] = Ce[oe] = !1;
    var ko = {
      // Latin-1 Supplement block.
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      Ç: "C",
      ç: "c",
      Ð: "D",
      ð: "d",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      Ñ: "N",
      ñ: "n",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ø: "O",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ø: "o",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      Ý: "Y",
      ý: "y",
      ÿ: "y",
      Æ: "Ae",
      æ: "ae",
      Þ: "Th",
      þ: "th",
      ß: "ss",
      // Latin Extended-A block.
      Ā: "A",
      Ă: "A",
      Ą: "A",
      ā: "a",
      ă: "a",
      ą: "a",
      Ć: "C",
      Ĉ: "C",
      Ċ: "C",
      Č: "C",
      ć: "c",
      ĉ: "c",
      ċ: "c",
      č: "c",
      Ď: "D",
      Đ: "D",
      ď: "d",
      đ: "d",
      Ē: "E",
      Ĕ: "E",
      Ė: "E",
      Ę: "E",
      Ě: "E",
      ē: "e",
      ĕ: "e",
      ė: "e",
      ę: "e",
      ě: "e",
      Ĝ: "G",
      Ğ: "G",
      Ġ: "G",
      Ģ: "G",
      ĝ: "g",
      ğ: "g",
      ġ: "g",
      ģ: "g",
      Ĥ: "H",
      Ħ: "H",
      ĥ: "h",
      ħ: "h",
      Ĩ: "I",
      Ī: "I",
      Ĭ: "I",
      Į: "I",
      İ: "I",
      ĩ: "i",
      ī: "i",
      ĭ: "i",
      į: "i",
      ı: "i",
      Ĵ: "J",
      ĵ: "j",
      Ķ: "K",
      ķ: "k",
      ĸ: "k",
      Ĺ: "L",
      Ļ: "L",
      Ľ: "L",
      Ŀ: "L",
      Ł: "L",
      ĺ: "l",
      ļ: "l",
      ľ: "l",
      ŀ: "l",
      ł: "l",
      Ń: "N",
      Ņ: "N",
      Ň: "N",
      Ŋ: "N",
      ń: "n",
      ņ: "n",
      ň: "n",
      ŋ: "n",
      Ō: "O",
      Ŏ: "O",
      Ő: "O",
      ō: "o",
      ŏ: "o",
      ő: "o",
      Ŕ: "R",
      Ŗ: "R",
      Ř: "R",
      ŕ: "r",
      ŗ: "r",
      ř: "r",
      Ś: "S",
      Ŝ: "S",
      Ş: "S",
      Š: "S",
      ś: "s",
      ŝ: "s",
      ş: "s",
      š: "s",
      Ţ: "T",
      Ť: "T",
      Ŧ: "T",
      ţ: "t",
      ť: "t",
      ŧ: "t",
      Ũ: "U",
      Ū: "U",
      Ŭ: "U",
      Ů: "U",
      Ű: "U",
      Ų: "U",
      ũ: "u",
      ū: "u",
      ŭ: "u",
      ů: "u",
      ű: "u",
      ų: "u",
      Ŵ: "W",
      ŵ: "w",
      Ŷ: "Y",
      ŷ: "y",
      Ÿ: "Y",
      Ź: "Z",
      Ż: "Z",
      Ž: "Z",
      ź: "z",
      ż: "z",
      ž: "z",
      Ĳ: "IJ",
      ĳ: "ij",
      Œ: "Oe",
      œ: "oe",
      ŉ: "'n",
      ſ: "s"
    }, vo = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, _o = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, bo = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, Eo = parseFloat, So = parseInt, is = typeof si == "object" && si && si.Object === Object && si, Ao = typeof self == "object" && self && self.Object === Object && self, Ne = is || Ao || Function("return this")(), br = I && !I.nodeType && I, hn = br && !0 && o && !o.nodeType && o, rs = hn && hn.exports === br, Er = rs && is.process, dt = function() {
      try {
        var d = hn && hn.require && hn.require("util").types;
        return d || Er && Er.binding && Er.binding("util");
      } catch {
      }
    }(), as = dt && dt.isArrayBuffer, ss = dt && dt.isDate, ls = dt && dt.isMap, os = dt && dt.isRegExp, us = dt && dt.isSet, cs = dt && dt.isTypedArray;
    function rt(d, y, g) {
      switch (g.length) {
        case 0:
          return d.call(y);
        case 1:
          return d.call(y, g[0]);
        case 2:
          return d.call(y, g[0], g[1]);
        case 3:
          return d.call(y, g[0], g[1], g[2]);
      }
      return d.apply(y, g);
    }
    function wo(d, y, g, W) {
      for (var re = -1, _e = d == null ? 0 : d.length; ++re < _e; ) {
        var Re = d[re];
        y(W, Re, g(Re), d);
      }
      return W;
    }
    function ft(d, y) {
      for (var g = -1, W = d == null ? 0 : d.length; ++g < W && y(d[g], g, d) !== !1; )
        ;
      return d;
    }
    function Co(d, y) {
      for (var g = d == null ? 0 : d.length; g-- && y(d[g], g, d) !== !1; )
        ;
      return d;
    }
    function ds(d, y) {
      for (var g = -1, W = d == null ? 0 : d.length; ++g < W; )
        if (!y(d[g], g, d))
          return !1;
      return !0;
    }
    function jt(d, y) {
      for (var g = -1, W = d == null ? 0 : d.length, re = 0, _e = []; ++g < W; ) {
        var Re = d[g];
        y(Re, g, d) && (_e[re++] = Re);
      }
      return _e;
    }
    function mi(d, y) {
      var g = d == null ? 0 : d.length;
      return !!g && In(d, y, 0) > -1;
    }
    function Sr(d, y, g) {
      for (var W = -1, re = d == null ? 0 : d.length; ++W < re; )
        if (g(y, d[W]))
          return !0;
      return !1;
    }
    function Ie(d, y) {
      for (var g = -1, W = d == null ? 0 : d.length, re = Array(W); ++g < W; )
        re[g] = y(d[g], g, d);
      return re;
    }
    function en(d, y) {
      for (var g = -1, W = y.length, re = d.length; ++g < W; )
        d[re + g] = y[g];
      return d;
    }
    function Ar(d, y, g, W) {
      var re = -1, _e = d == null ? 0 : d.length;
      for (W && _e && (g = d[++re]); ++re < _e; )
        g = y(g, d[re], re, d);
      return g;
    }
    function To(d, y, g, W) {
      var re = d == null ? 0 : d.length;
      for (W && re && (g = d[--re]); re--; )
        g = y(g, d[re], re, d);
      return g;
    }
    function wr(d, y) {
      for (var g = -1, W = d == null ? 0 : d.length; ++g < W; )
        if (y(d[g], g, d))
          return !0;
      return !1;
    }
    var Do = Cr("length");
    function Io(d) {
      return d.split("");
    }
    function Lo(d) {
      return d.match(R0) || [];
    }
    function fs(d, y, g) {
      var W;
      return g(d, function(re, _e, Re) {
        if (y(re, _e, Re))
          return W = _e, !1;
      }), W;
    }
    function gi(d, y, g, W) {
      for (var re = d.length, _e = g + (W ? 1 : -1); W ? _e-- : ++_e < re; )
        if (y(d[_e], _e, d))
          return _e;
      return -1;
    }
    function In(d, y, g) {
      return y === y ? No(d, y, g) : gi(d, ps, g);
    }
    function Bo(d, y, g, W) {
      for (var re = g - 1, _e = d.length; ++re < _e; )
        if (W(d[re], y))
          return re;
      return -1;
    }
    function ps(d) {
      return d !== d;
    }
    function hs(d, y) {
      var g = d == null ? 0 : d.length;
      return g ? Dr(d, y) / g : U;
    }
    function Cr(d) {
      return function(y) {
        return y == null ? a : y[d];
      };
    }
    function Tr(d) {
      return function(y) {
        return d == null ? a : d[y];
      };
    }
    function ms(d, y, g, W, re) {
      return re(d, function(_e, Re, we) {
        g = W ? (W = !1, _e) : y(g, _e, Re, we);
      }), g;
    }
    function Fo(d, y) {
      var g = d.length;
      for (d.sort(y); g--; )
        d[g] = d[g].value;
      return d;
    }
    function Dr(d, y) {
      for (var g, W = -1, re = d.length; ++W < re; ) {
        var _e = y(d[W]);
        _e !== a && (g = g === a ? _e : g + _e);
      }
      return g;
    }
    function Ir(d, y) {
      for (var g = -1, W = Array(d); ++g < d; )
        W[g] = y(g);
      return W;
    }
    function $o(d, y) {
      return Ie(y, function(g) {
        return [g, d[g]];
      });
    }
    function gs(d) {
      return d && d.slice(0, vs(d) + 1).replace(gr, "");
    }
    function at(d) {
      return function(y) {
        return d(y);
      };
    }
    function Lr(d, y) {
      return Ie(y, function(g) {
        return d[g];
      });
    }
    function zn(d, y) {
      return d.has(y);
    }
    function xs(d, y) {
      for (var g = -1, W = d.length; ++g < W && In(y, d[g], 0) > -1; )
        ;
      return g;
    }
    function ys(d, y) {
      for (var g = d.length; g-- && In(y, d[g], 0) > -1; )
        ;
      return g;
    }
    function Vo(d, y) {
      for (var g = d.length, W = 0; g--; )
        d[g] === y && ++W;
      return W;
    }
    var Oo = Tr(ko), Po = Tr(vo);
    function Ro(d) {
      return "\\" + bo[d];
    }
    function Go(d, y) {
      return d == null ? a : d[y];
    }
    function Ln(d) {
      return mo.test(d);
    }
    function Mo(d) {
      return go.test(d);
    }
    function Uo(d) {
      for (var y, g = []; !(y = d.next()).done; )
        g.push(y.value);
      return g;
    }
    function Br(d) {
      var y = -1, g = Array(d.size);
      return d.forEach(function(W, re) {
        g[++y] = [re, W];
      }), g;
    }
    function ks(d, y) {
      return function(g) {
        return d(y(g));
      };
    }
    function tn(d, y) {
      for (var g = -1, W = d.length, re = 0, _e = []; ++g < W; ) {
        var Re = d[g];
        (Re === y || Re === z) && (d[g] = z, _e[re++] = g);
      }
      return _e;
    }
    function xi(d) {
      var y = -1, g = Array(d.size);
      return d.forEach(function(W) {
        g[++y] = W;
      }), g;
    }
    function Wo(d) {
      var y = -1, g = Array(d.size);
      return d.forEach(function(W) {
        g[++y] = [W, W];
      }), g;
    }
    function No(d, y, g) {
      for (var W = g - 1, re = d.length; ++W < re; )
        if (d[W] === y)
          return W;
      return -1;
    }
    function qo(d, y, g) {
      for (var W = g + 1; W--; )
        if (d[W] === y)
          return W;
      return W;
    }
    function Bn(d) {
      return Ln(d) ? Ho(d) : Do(d);
    }
    function St(d) {
      return Ln(d) ? Qo(d) : Io(d);
    }
    function vs(d) {
      for (var y = d.length; y-- && $0.test(d.charAt(y)); )
        ;
      return y;
    }
    var zo = Tr(_o);
    function Ho(d) {
      for (var y = _r.lastIndex = 0; _r.test(d); )
        ++y;
      return y;
    }
    function Qo(d) {
      return d.match(_r) || [];
    }
    function Ko(d) {
      return d.match(ho) || [];
    }
    var Yo = function d(y) {
      y = y == null ? Ne : Fn.defaults(Ne.Object(), y, Fn.pick(Ne, xo));
      var g = y.Array, W = y.Date, re = y.Error, _e = y.Function, Re = y.Math, we = y.Object, Fr = y.RegExp, Zo = y.String, pt = y.TypeError, yi = g.prototype, Jo = _e.prototype, $n = we.prototype, ki = y["__core-js_shared__"], vi = Jo.toString, Ee = $n.hasOwnProperty, Xo = 0, _s = function() {
        var e = /[^.]+$/.exec(ki && ki.keys && ki.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }(), _i = $n.toString, jo = vi.call(we), eu = Ne._, tu = Fr(
        "^" + vi.call(Ee).replace(mr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), bi = rs ? y.Buffer : a, nn = y.Symbol, Ei = y.Uint8Array, bs = bi ? bi.allocUnsafe : a, Si = ks(we.getPrototypeOf, we), Es = we.create, Ss = $n.propertyIsEnumerable, Ai = yi.splice, As = nn ? nn.isConcatSpreadable : a, Hn = nn ? nn.iterator : a, mn = nn ? nn.toStringTag : a, wi = function() {
        try {
          var e = vn(we, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      }(), nu = y.clearTimeout !== Ne.clearTimeout && y.clearTimeout, iu = W && W.now !== Ne.Date.now && W.now, ru = y.setTimeout !== Ne.setTimeout && y.setTimeout, Ci = Re.ceil, Ti = Re.floor, $r = we.getOwnPropertySymbols, au = bi ? bi.isBuffer : a, ws = y.isFinite, su = yi.join, lu = ks(we.keys, we), Ge = Re.max, He = Re.min, ou = W.now, uu = y.parseInt, Cs = Re.random, cu = yi.reverse, Vr = vn(y, "DataView"), Qn = vn(y, "Map"), Or = vn(y, "Promise"), Vn = vn(y, "Set"), Kn = vn(y, "WeakMap"), Yn = vn(we, "create"), Di = Kn && new Kn(), On = {}, du = _n(Vr), fu = _n(Qn), pu = _n(Or), hu = _n(Vn), mu = _n(Kn), Ii = nn ? nn.prototype : a, Zn = Ii ? Ii.valueOf : a, Ts = Ii ? Ii.toString : a;
      function s(e) {
        if (Be(e) && !ae(e) && !(e instanceof xe)) {
          if (e instanceof ht)
            return e;
          if (Ee.call(e, "__wrapped__"))
            return Dl(e);
        }
        return new ht(e);
      }
      var Pn = /* @__PURE__ */ function() {
        function e() {
        }
        return function(t) {
          if (!Le(t))
            return {};
          if (Es)
            return Es(t);
          e.prototype = t;
          var n = new e();
          return e.prototype = a, n;
        };
      }();
      function Li() {
      }
      function ht(e, t) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = a;
      }
      s.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: T0,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: D0,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: Pa,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        variable: "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        imports: {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          _: s
        }
      }, s.prototype = Li.prototype, s.prototype.constructor = s, ht.prototype = Pn(Li.prototype), ht.prototype.constructor = ht;
      function xe(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = T, this.__views__ = [];
      }
      function gu() {
        var e = new xe(this.__wrapped__);
        return e.__actions__ = Xe(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = Xe(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = Xe(this.__views__), e;
      }
      function xu() {
        if (this.__filtered__) {
          var e = new xe(this);
          e.__dir__ = -1, e.__filtered__ = !0;
        } else
          e = this.clone(), e.__dir__ *= -1;
        return e;
      }
      function yu() {
        var e = this.__wrapped__.value(), t = this.__dir__, n = ae(e), i = t < 0, r = n ? e.length : 0, l = I1(0, r, this.__views__), u = l.start, c = l.end, p = c - u, k = i ? c : u - 1, v = this.__iteratees__, E = v.length, P = 0, Q = He(p, this.__takeCount__);
        if (!n || !i && r == p && Q == p)
          return Xs(e, this.__actions__);
        var te = [];
        e:
          for (; p-- && P < Q; ) {
            k += t;
            for (var ue = -1, ne = e[k]; ++ue < E; ) {
              var me = v[ue], ke = me.iteratee, ot = me.type, Je = ke(ne);
              if (ot == dn)
                ne = Je;
              else if (!Je) {
                if (ot == Pt)
                  continue e;
                break e;
              }
            }
            te[P++] = ne;
          }
        return te;
      }
      xe.prototype = Pn(Li.prototype), xe.prototype.constructor = xe;
      function gn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function ku() {
        this.__data__ = Yn ? Yn(null) : {}, this.size = 0;
      }
      function vu(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }
      function _u(e) {
        var t = this.__data__;
        if (Yn) {
          var n = t[e];
          return n === J ? a : n;
        }
        return Ee.call(t, e) ? t[e] : a;
      }
      function bu(e) {
        var t = this.__data__;
        return Yn ? t[e] !== a : Ee.call(t, e);
      }
      function Eu(e, t) {
        var n = this.__data__;
        return this.size += this.has(e) ? 0 : 1, n[e] = Yn && t === a ? J : t, this;
      }
      gn.prototype.clear = ku, gn.prototype.delete = vu, gn.prototype.get = _u, gn.prototype.has = bu, gn.prototype.set = Eu;
      function Ut(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function Su() {
        this.__data__ = [], this.size = 0;
      }
      function Au(e) {
        var t = this.__data__, n = Bi(t, e);
        if (n < 0)
          return !1;
        var i = t.length - 1;
        return n == i ? t.pop() : Ai.call(t, n, 1), --this.size, !0;
      }
      function wu(e) {
        var t = this.__data__, n = Bi(t, e);
        return n < 0 ? a : t[n][1];
      }
      function Cu(e) {
        return Bi(this.__data__, e) > -1;
      }
      function Tu(e, t) {
        var n = this.__data__, i = Bi(n, e);
        return i < 0 ? (++this.size, n.push([e, t])) : n[i][1] = t, this;
      }
      Ut.prototype.clear = Su, Ut.prototype.delete = Au, Ut.prototype.get = wu, Ut.prototype.has = Cu, Ut.prototype.set = Tu;
      function Wt(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var i = e[t];
          this.set(i[0], i[1]);
        }
      }
      function Du() {
        this.size = 0, this.__data__ = {
          hash: new gn(),
          map: new (Qn || Ut)(),
          string: new gn()
        };
      }
      function Iu(e) {
        var t = qi(this, e).delete(e);
        return this.size -= t ? 1 : 0, t;
      }
      function Lu(e) {
        return qi(this, e).get(e);
      }
      function Bu(e) {
        return qi(this, e).has(e);
      }
      function Fu(e, t) {
        var n = qi(this, e), i = n.size;
        return n.set(e, t), this.size += n.size == i ? 0 : 1, this;
      }
      Wt.prototype.clear = Du, Wt.prototype.delete = Iu, Wt.prototype.get = Lu, Wt.prototype.has = Bu, Wt.prototype.set = Fu;
      function xn(e) {
        var t = -1, n = e == null ? 0 : e.length;
        for (this.__data__ = new Wt(); ++t < n; )
          this.add(e[t]);
      }
      function $u(e) {
        return this.__data__.set(e, J), this;
      }
      function Vu(e) {
        return this.__data__.has(e);
      }
      xn.prototype.add = xn.prototype.push = $u, xn.prototype.has = Vu;
      function At(e) {
        var t = this.__data__ = new Ut(e);
        this.size = t.size;
      }
      function Ou() {
        this.__data__ = new Ut(), this.size = 0;
      }
      function Pu(e) {
        var t = this.__data__, n = t.delete(e);
        return this.size = t.size, n;
      }
      function Ru(e) {
        return this.__data__.get(e);
      }
      function Gu(e) {
        return this.__data__.has(e);
      }
      function Mu(e, t) {
        var n = this.__data__;
        if (n instanceof Ut) {
          var i = n.__data__;
          if (!Qn || i.length < m - 1)
            return i.push([e, t]), this.size = ++n.size, this;
          n = this.__data__ = new Wt(i);
        }
        return n.set(e, t), this.size = n.size, this;
      }
      At.prototype.clear = Ou, At.prototype.delete = Pu, At.prototype.get = Ru, At.prototype.has = Gu, At.prototype.set = Mu;
      function Ds(e, t) {
        var n = ae(e), i = !n && bn(e), r = !n && !i && on(e), l = !n && !i && !r && Un(e), u = n || i || r || l, c = u ? Ir(e.length, Zo) : [], p = c.length;
        for (var k in e)
          (t || Ee.call(e, k)) && !(u && // Safari 9 has enumerable `arguments.length` in strict mode.
          (k == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          r && (k == "offset" || k == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          l && (k == "buffer" || k == "byteLength" || k == "byteOffset") || // Skip index properties.
          Ht(k, p))) && c.push(k);
        return c;
      }
      function Is(e) {
        var t = e.length;
        return t ? e[Qr(0, t - 1)] : a;
      }
      function Uu(e, t) {
        return zi(Xe(e), yn(t, 0, e.length));
      }
      function Wu(e) {
        return zi(Xe(e));
      }
      function Pr(e, t, n) {
        (n !== a && !wt(e[t], n) || n === a && !(t in e)) && Nt(e, t, n);
      }
      function Jn(e, t, n) {
        var i = e[t];
        (!(Ee.call(e, t) && wt(i, n)) || n === a && !(t in e)) && Nt(e, t, n);
      }
      function Bi(e, t) {
        for (var n = e.length; n--; )
          if (wt(e[n][0], t))
            return n;
        return -1;
      }
      function Nu(e, t, n, i) {
        return rn(e, function(r, l, u) {
          t(i, r, n(r), u);
        }), i;
      }
      function Ls(e, t) {
        return e && Lt(t, Ue(t), e);
      }
      function qu(e, t) {
        return e && Lt(t, et(t), e);
      }
      function Nt(e, t, n) {
        t == "__proto__" && wi ? wi(e, t, {
          configurable: !0,
          enumerable: !0,
          value: n,
          writable: !0
        }) : e[t] = n;
      }
      function Rr(e, t) {
        for (var n = -1, i = t.length, r = g(i), l = e == null; ++n < i; )
          r[n] = l ? a : ya(e, t[n]);
        return r;
      }
      function yn(e, t, n) {
        return e === e && (n !== a && (e = e <= n ? e : n), t !== a && (e = e >= t ? e : t)), e;
      }
      function mt(e, t, n, i, r, l) {
        var u, c = t & K, p = t & H, k = t & L;
        if (n && (u = r ? n(e, i, r, l) : n(e)), u !== a)
          return u;
        if (!Le(e))
          return e;
        var v = ae(e);
        if (v) {
          if (u = B1(e), !c)
            return Xe(e, u);
        } else {
          var E = Qe(e), P = E == Gt || E == ci;
          if (on(e))
            return tl(e, c);
          if (E == bt || E == _t || P && !r) {
            if (u = p || P ? {} : vl(e), !c)
              return p ? _1(e, qu(u, e)) : v1(e, Ls(u, e));
          } else {
            if (!Ce[E])
              return r ? e : {};
            u = F1(e, E, c);
          }
        }
        l || (l = new At());
        var Q = l.get(e);
        if (Q)
          return Q;
        l.set(e, u), Yl(e) ? e.forEach(function(ne) {
          u.add(mt(ne, t, n, ne, e, l));
        }) : Ql(e) && e.forEach(function(ne, me) {
          u.set(me, mt(ne, t, n, me, e, l));
        });
        var te = k ? p ? ra : ia : p ? et : Ue, ue = v ? a : te(e);
        return ft(ue || e, function(ne, me) {
          ue && (me = ne, ne = e[me]), Jn(u, me, mt(ne, t, n, me, e, l));
        }), u;
      }
      function zu(e) {
        var t = Ue(e);
        return function(n) {
          return Bs(n, e, t);
        };
      }
      function Bs(e, t, n) {
        var i = n.length;
        if (e == null)
          return !i;
        for (e = we(e); i--; ) {
          var r = n[i], l = t[r], u = e[r];
          if (u === a && !(r in e) || !l(u))
            return !1;
        }
        return !0;
      }
      function Fs(e, t, n) {
        if (typeof e != "function")
          throw new pt(C);
        return ri(function() {
          e.apply(a, n);
        }, t);
      }
      function Xn(e, t, n, i) {
        var r = -1, l = mi, u = !0, c = e.length, p = [], k = t.length;
        if (!c)
          return p;
        n && (t = Ie(t, at(n))), i ? (l = Sr, u = !1) : t.length >= m && (l = zn, u = !1, t = new xn(t));
        e:
          for (; ++r < c; ) {
            var v = e[r], E = n == null ? v : n(v);
            if (v = i || v !== 0 ? v : 0, u && E === E) {
              for (var P = k; P--; )
                if (t[P] === E)
                  continue e;
              p.push(v);
            } else
              l(t, E, i) || p.push(v);
          }
        return p;
      }
      var rn = sl(It), $s = sl(Mr, !0);
      function Hu(e, t) {
        var n = !0;
        return rn(e, function(i, r, l) {
          return n = !!t(i, r, l), n;
        }), n;
      }
      function Fi(e, t, n) {
        for (var i = -1, r = e.length; ++i < r; ) {
          var l = e[i], u = t(l);
          if (u != null && (c === a ? u === u && !lt(u) : n(u, c)))
            var c = u, p = l;
        }
        return p;
      }
      function Qu(e, t, n, i) {
        var r = e.length;
        for (n = le(n), n < 0 && (n = -n > r ? 0 : r + n), i = i === a || i > r ? r : le(i), i < 0 && (i += r), i = n > i ? 0 : Jl(i); n < i; )
          e[n++] = t;
        return e;
      }
      function Vs(e, t) {
        var n = [];
        return rn(e, function(i, r, l) {
          t(i, r, l) && n.push(i);
        }), n;
      }
      function qe(e, t, n, i, r) {
        var l = -1, u = e.length;
        for (n || (n = V1), r || (r = []); ++l < u; ) {
          var c = e[l];
          t > 0 && n(c) ? t > 1 ? qe(c, t - 1, n, i, r) : en(r, c) : i || (r[r.length] = c);
        }
        return r;
      }
      var Gr = ll(), Os = ll(!0);
      function It(e, t) {
        return e && Gr(e, t, Ue);
      }
      function Mr(e, t) {
        return e && Os(e, t, Ue);
      }
      function $i(e, t) {
        return jt(t, function(n) {
          return Qt(e[n]);
        });
      }
      function kn(e, t) {
        t = sn(t, e);
        for (var n = 0, i = t.length; e != null && n < i; )
          e = e[Bt(t[n++])];
        return n && n == i ? e : a;
      }
      function Ps(e, t, n) {
        var i = t(e);
        return ae(e) ? i : en(i, n(e));
      }
      function Ye(e) {
        return e == null ? e === a ? O : ar : mn && mn in we(e) ? D1(e) : W1(e);
      }
      function Ur(e, t) {
        return e > t;
      }
      function Ku(e, t) {
        return e != null && Ee.call(e, t);
      }
      function Yu(e, t) {
        return e != null && t in we(e);
      }
      function Zu(e, t, n) {
        return e >= He(t, n) && e < Ge(t, n);
      }
      function Wr(e, t, n) {
        for (var i = n ? Sr : mi, r = e[0].length, l = e.length, u = l, c = g(l), p = 1 / 0, k = []; u--; ) {
          var v = e[u];
          u && t && (v = Ie(v, at(t))), p = He(v.length, p), c[u] = !n && (t || r >= 120 && v.length >= 120) ? new xn(u && v) : a;
        }
        v = e[0];
        var E = -1, P = c[0];
        e:
          for (; ++E < r && k.length < p; ) {
            var Q = v[E], te = t ? t(Q) : Q;
            if (Q = n || Q !== 0 ? Q : 0, !(P ? zn(P, te) : i(k, te, n))) {
              for (u = l; --u; ) {
                var ue = c[u];
                if (!(ue ? zn(ue, te) : i(e[u], te, n)))
                  continue e;
              }
              P && P.push(te), k.push(Q);
            }
          }
        return k;
      }
      function Ju(e, t, n, i) {
        return It(e, function(r, l, u) {
          t(i, n(r), l, u);
        }), i;
      }
      function jn(e, t, n) {
        t = sn(t, e), e = Sl(e, t);
        var i = e == null ? e : e[Bt(xt(t))];
        return i == null ? a : rt(i, e, n);
      }
      function Rs(e) {
        return Be(e) && Ye(e) == _t;
      }
      function Xu(e) {
        return Be(e) && Ye(e) == pn;
      }
      function ju(e) {
        return Be(e) && Ye(e) == Jt;
      }
      function ei(e, t, n, i, r) {
        return e === t ? !0 : e == null || t == null || !Be(e) && !Be(t) ? e !== e && t !== t : e1(e, t, n, i, ei, r);
      }
      function e1(e, t, n, i, r, l) {
        var u = ae(e), c = ae(t), p = u ? Rt : Qe(e), k = c ? Rt : Qe(t);
        p = p == _t ? bt : p, k = k == _t ? bt : k;
        var v = p == bt, E = k == bt, P = p == k;
        if (P && on(e)) {
          if (!on(t))
            return !1;
          u = !0, v = !1;
        }
        if (P && !v)
          return l || (l = new At()), u || Un(e) ? xl(e, t, n, i, r, l) : C1(e, t, p, n, i, r, l);
        if (!(n & A)) {
          var Q = v && Ee.call(e, "__wrapped__"), te = E && Ee.call(t, "__wrapped__");
          if (Q || te) {
            var ue = Q ? e.value() : e, ne = te ? t.value() : t;
            return l || (l = new At()), r(ue, ne, n, i, l);
          }
        }
        return P ? (l || (l = new At()), T1(e, t, n, i, r, l)) : !1;
      }
      function t1(e) {
        return Be(e) && Qe(e) == it;
      }
      function Nr(e, t, n, i) {
        var r = n.length, l = r, u = !i;
        if (e == null)
          return !l;
        for (e = we(e); r--; ) {
          var c = n[r];
          if (u && c[2] ? c[1] !== e[c[0]] : !(c[0] in e))
            return !1;
        }
        for (; ++r < l; ) {
          c = n[r];
          var p = c[0], k = e[p], v = c[1];
          if (u && c[2]) {
            if (k === a && !(p in e))
              return !1;
          } else {
            var E = new At();
            if (i)
              var P = i(k, v, p, e, t, E);
            if (!(P === a ? ei(v, k, A | D, i, E) : P))
              return !1;
          }
        }
        return !0;
      }
      function Gs(e) {
        if (!Le(e) || P1(e))
          return !1;
        var t = Qt(e) ? tu : q0;
        return t.test(_n(e));
      }
      function n1(e) {
        return Be(e) && Ye(e) == X;
      }
      function i1(e) {
        return Be(e) && Qe(e) == b;
      }
      function r1(e) {
        return Be(e) && Ji(e.length) && !!Te[Ye(e)];
      }
      function Ms(e) {
        return typeof e == "function" ? e : e == null ? tt : typeof e == "object" ? ae(e) ? Ns(e[0], e[1]) : Ws(e) : o0(e);
      }
      function qr(e) {
        if (!ii(e))
          return lu(e);
        var t = [];
        for (var n in we(e))
          Ee.call(e, n) && n != "constructor" && t.push(n);
        return t;
      }
      function a1(e) {
        if (!Le(e))
          return U1(e);
        var t = ii(e), n = [];
        for (var i in e)
          i == "constructor" && (t || !Ee.call(e, i)) || n.push(i);
        return n;
      }
      function zr(e, t) {
        return e < t;
      }
      function Us(e, t) {
        var n = -1, i = je(e) ? g(e.length) : [];
        return rn(e, function(r, l, u) {
          i[++n] = t(r, l, u);
        }), i;
      }
      function Ws(e) {
        var t = sa(e);
        return t.length == 1 && t[0][2] ? bl(t[0][0], t[0][1]) : function(n) {
          return n === e || Nr(n, e, t);
        };
      }
      function Ns(e, t) {
        return oa(e) && _l(t) ? bl(Bt(e), t) : function(n) {
          var i = ya(n, e);
          return i === a && i === t ? ka(n, e) : ei(t, i, A | D);
        };
      }
      function Vi(e, t, n, i, r) {
        e !== t && Gr(t, function(l, u) {
          if (r || (r = new At()), Le(l))
            s1(e, t, u, n, Vi, i, r);
          else {
            var c = i ? i(ca(e, u), l, u + "", e, t, r) : a;
            c === a && (c = l), Pr(e, u, c);
          }
        }, et);
      }
      function s1(e, t, n, i, r, l, u) {
        var c = ca(e, n), p = ca(t, n), k = u.get(p);
        if (k) {
          Pr(e, n, k);
          return;
        }
        var v = l ? l(c, p, n + "", e, t, u) : a, E = v === a;
        if (E) {
          var P = ae(p), Q = !P && on(p), te = !P && !Q && Un(p);
          v = p, P || Q || te ? ae(c) ? v = c : $e(c) ? v = Xe(c) : Q ? (E = !1, v = tl(p, !0)) : te ? (E = !1, v = nl(p, !0)) : v = [] : ai(p) || bn(p) ? (v = c, bn(c) ? v = Xl(c) : (!Le(c) || Qt(c)) && (v = vl(p))) : E = !1;
        }
        E && (u.set(p, v), r(v, p, i, l, u), u.delete(p)), Pr(e, n, v);
      }
      function qs(e, t) {
        var n = e.length;
        if (n)
          return t += t < 0 ? n : 0, Ht(t, n) ? e[t] : a;
      }
      function zs(e, t, n) {
        t.length ? t = Ie(t, function(l) {
          return ae(l) ? function(u) {
            return kn(u, l.length === 1 ? l[0] : l);
          } : l;
        }) : t = [tt];
        var i = -1;
        t = Ie(t, at(ee()));
        var r = Us(e, function(l, u, c) {
          var p = Ie(t, function(k) {
            return k(l);
          });
          return { criteria: p, index: ++i, value: l };
        });
        return Fo(r, function(l, u) {
          return k1(l, u, n);
        });
      }
      function l1(e, t) {
        return Hs(e, t, function(n, i) {
          return ka(e, i);
        });
      }
      function Hs(e, t, n) {
        for (var i = -1, r = t.length, l = {}; ++i < r; ) {
          var u = t[i], c = kn(e, u);
          n(c, u) && ti(l, sn(u, e), c);
        }
        return l;
      }
      function o1(e) {
        return function(t) {
          return kn(t, e);
        };
      }
      function Hr(e, t, n, i) {
        var r = i ? Bo : In, l = -1, u = t.length, c = e;
        for (e === t && (t = Xe(t)), n && (c = Ie(e, at(n))); ++l < u; )
          for (var p = 0, k = t[l], v = n ? n(k) : k; (p = r(c, v, p, i)) > -1; )
            c !== e && Ai.call(c, p, 1), Ai.call(e, p, 1);
        return e;
      }
      function Qs(e, t) {
        for (var n = e ? t.length : 0, i = n - 1; n--; ) {
          var r = t[n];
          if (n == i || r !== l) {
            var l = r;
            Ht(r) ? Ai.call(e, r, 1) : Zr(e, r);
          }
        }
        return e;
      }
      function Qr(e, t) {
        return e + Ti(Cs() * (t - e + 1));
      }
      function u1(e, t, n, i) {
        for (var r = -1, l = Ge(Ci((t - e) / (n || 1)), 0), u = g(l); l--; )
          u[i ? l : ++r] = e, e += n;
        return u;
      }
      function Kr(e, t) {
        var n = "";
        if (!e || t < 1 || t > ze)
          return n;
        do
          t % 2 && (n += e), t = Ti(t / 2), t && (e += e);
        while (t);
        return n;
      }
      function fe(e, t) {
        return da(El(e, t, tt), e + "");
      }
      function c1(e) {
        return Is(Wn(e));
      }
      function d1(e, t) {
        var n = Wn(e);
        return zi(n, yn(t, 0, n.length));
      }
      function ti(e, t, n, i) {
        if (!Le(e))
          return e;
        t = sn(t, e);
        for (var r = -1, l = t.length, u = l - 1, c = e; c != null && ++r < l; ) {
          var p = Bt(t[r]), k = n;
          if (p === "__proto__" || p === "constructor" || p === "prototype")
            return e;
          if (r != u) {
            var v = c[p];
            k = i ? i(v, p, c) : a, k === a && (k = Le(v) ? v : Ht(t[r + 1]) ? [] : {});
          }
          Jn(c, p, k), c = c[p];
        }
        return e;
      }
      var Ks = Di ? function(e, t) {
        return Di.set(e, t), e;
      } : tt, f1 = wi ? function(e, t) {
        return wi(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: _a(t),
          writable: !0
        });
      } : tt;
      function p1(e) {
        return zi(Wn(e));
      }
      function gt(e, t, n) {
        var i = -1, r = e.length;
        t < 0 && (t = -t > r ? 0 : r + t), n = n > r ? r : n, n < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
        for (var l = g(r); ++i < r; )
          l[i] = e[i + t];
        return l;
      }
      function h1(e, t) {
        var n;
        return rn(e, function(i, r, l) {
          return n = t(i, r, l), !n;
        }), !!n;
      }
      function Oi(e, t, n) {
        var i = 0, r = e == null ? i : e.length;
        if (typeof t == "number" && t === t && r <= vt) {
          for (; i < r; ) {
            var l = i + r >>> 1, u = e[l];
            u !== null && !lt(u) && (n ? u <= t : u < t) ? i = l + 1 : r = l;
          }
          return r;
        }
        return Yr(e, t, tt, n);
      }
      function Yr(e, t, n, i) {
        var r = 0, l = e == null ? 0 : e.length;
        if (l === 0)
          return 0;
        t = n(t);
        for (var u = t !== t, c = t === null, p = lt(t), k = t === a; r < l; ) {
          var v = Ti((r + l) / 2), E = n(e[v]), P = E !== a, Q = E === null, te = E === E, ue = lt(E);
          if (u)
            var ne = i || te;
          else
            k ? ne = te && (i || P) : c ? ne = te && P && (i || !Q) : p ? ne = te && P && !Q && (i || !ue) : Q || ue ? ne = !1 : ne = i ? E <= t : E < t;
          ne ? r = v + 1 : l = v;
        }
        return He(l, se);
      }
      function Ys(e, t) {
        for (var n = -1, i = e.length, r = 0, l = []; ++n < i; ) {
          var u = e[n], c = t ? t(u) : u;
          if (!n || !wt(c, p)) {
            var p = c;
            l[r++] = u === 0 ? 0 : u;
          }
        }
        return l;
      }
      function Zs(e) {
        return typeof e == "number" ? e : lt(e) ? U : +e;
      }
      function st(e) {
        if (typeof e == "string")
          return e;
        if (ae(e))
          return Ie(e, st) + "";
        if (lt(e))
          return Ts ? Ts.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function an(e, t, n) {
        var i = -1, r = mi, l = e.length, u = !0, c = [], p = c;
        if (n)
          u = !1, r = Sr;
        else if (l >= m) {
          var k = t ? null : A1(e);
          if (k)
            return xi(k);
          u = !1, r = zn, p = new xn();
        } else
          p = t ? [] : c;
        e:
          for (; ++i < l; ) {
            var v = e[i], E = t ? t(v) : v;
            if (v = n || v !== 0 ? v : 0, u && E === E) {
              for (var P = p.length; P--; )
                if (p[P] === E)
                  continue e;
              t && p.push(E), c.push(v);
            } else
              r(p, E, n) || (p !== c && p.push(E), c.push(v));
          }
        return c;
      }
      function Zr(e, t) {
        return t = sn(t, e), e = Sl(e, t), e == null || delete e[Bt(xt(t))];
      }
      function Js(e, t, n, i) {
        return ti(e, t, n(kn(e, t)), i);
      }
      function Pi(e, t, n, i) {
        for (var r = e.length, l = i ? r : -1; (i ? l-- : ++l < r) && t(e[l], l, e); )
          ;
        return n ? gt(e, i ? 0 : l, i ? l + 1 : r) : gt(e, i ? l + 1 : 0, i ? r : l);
      }
      function Xs(e, t) {
        var n = e;
        return n instanceof xe && (n = n.value()), Ar(t, function(i, r) {
          return r.func.apply(r.thisArg, en([i], r.args));
        }, n);
      }
      function Jr(e, t, n) {
        var i = e.length;
        if (i < 2)
          return i ? an(e[0]) : [];
        for (var r = -1, l = g(i); ++r < i; )
          for (var u = e[r], c = -1; ++c < i; )
            c != r && (l[r] = Xn(l[r] || u, e[c], t, n));
        return an(qe(l, 1), t, n);
      }
      function js(e, t, n) {
        for (var i = -1, r = e.length, l = t.length, u = {}; ++i < r; ) {
          var c = i < l ? t[i] : a;
          n(u, e[i], c);
        }
        return u;
      }
      function Xr(e) {
        return $e(e) ? e : [];
      }
      function jr(e) {
        return typeof e == "function" ? e : tt;
      }
      function sn(e, t) {
        return ae(e) ? e : oa(e, t) ? [e] : Tl(be(e));
      }
      var m1 = fe;
      function ln(e, t, n) {
        var i = e.length;
        return n = n === a ? i : n, !t && n >= i ? e : gt(e, t, n);
      }
      var el = nu || function(e) {
        return Ne.clearTimeout(e);
      };
      function tl(e, t) {
        if (t)
          return e.slice();
        var n = e.length, i = bs ? bs(n) : new e.constructor(n);
        return e.copy(i), i;
      }
      function ea(e) {
        var t = new e.constructor(e.byteLength);
        return new Ei(t).set(new Ei(e)), t;
      }
      function g1(e, t) {
        var n = t ? ea(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.byteLength);
      }
      function x1(e) {
        var t = new e.constructor(e.source, Ra.exec(e));
        return t.lastIndex = e.lastIndex, t;
      }
      function y1(e) {
        return Zn ? we(Zn.call(e)) : {};
      }
      function nl(e, t) {
        var n = t ? ea(e.buffer) : e.buffer;
        return new e.constructor(n, e.byteOffset, e.length);
      }
      function il(e, t) {
        if (e !== t) {
          var n = e !== a, i = e === null, r = e === e, l = lt(e), u = t !== a, c = t === null, p = t === t, k = lt(t);
          if (!c && !k && !l && e > t || l && u && p && !c && !k || i && u && p || !n && p || !r)
            return 1;
          if (!i && !l && !k && e < t || k && n && r && !i && !l || c && n && r || !u && r || !p)
            return -1;
        }
        return 0;
      }
      function k1(e, t, n) {
        for (var i = -1, r = e.criteria, l = t.criteria, u = r.length, c = n.length; ++i < u; ) {
          var p = il(r[i], l[i]);
          if (p) {
            if (i >= c)
              return p;
            var k = n[i];
            return p * (k == "desc" ? -1 : 1);
          }
        }
        return e.index - t.index;
      }
      function rl(e, t, n, i) {
        for (var r = -1, l = e.length, u = n.length, c = -1, p = t.length, k = Ge(l - u, 0), v = g(p + k), E = !i; ++c < p; )
          v[c] = t[c];
        for (; ++r < u; )
          (E || r < l) && (v[n[r]] = e[r]);
        for (; k--; )
          v[c++] = e[r++];
        return v;
      }
      function al(e, t, n, i) {
        for (var r = -1, l = e.length, u = -1, c = n.length, p = -1, k = t.length, v = Ge(l - c, 0), E = g(v + k), P = !i; ++r < v; )
          E[r] = e[r];
        for (var Q = r; ++p < k; )
          E[Q + p] = t[p];
        for (; ++u < c; )
          (P || r < l) && (E[Q + n[u]] = e[r++]);
        return E;
      }
      function Xe(e, t) {
        var n = -1, i = e.length;
        for (t || (t = g(i)); ++n < i; )
          t[n] = e[n];
        return t;
      }
      function Lt(e, t, n, i) {
        var r = !n;
        n || (n = {});
        for (var l = -1, u = t.length; ++l < u; ) {
          var c = t[l], p = i ? i(n[c], e[c], c, n, e) : a;
          p === a && (p = e[c]), r ? Nt(n, c, p) : Jn(n, c, p);
        }
        return n;
      }
      function v1(e, t) {
        return Lt(e, la(e), t);
      }
      function _1(e, t) {
        return Lt(e, yl(e), t);
      }
      function Ri(e, t) {
        return function(n, i) {
          var r = ae(n) ? wo : Nu, l = t ? t() : {};
          return r(n, e, ee(i, 2), l);
        };
      }
      function Rn(e) {
        return fe(function(t, n) {
          var i = -1, r = n.length, l = r > 1 ? n[r - 1] : a, u = r > 2 ? n[2] : a;
          for (l = e.length > 3 && typeof l == "function" ? (r--, l) : a, u && Ze(n[0], n[1], u) && (l = r < 3 ? a : l, r = 1), t = we(t); ++i < r; ) {
            var c = n[i];
            c && e(t, c, i, l);
          }
          return t;
        });
      }
      function sl(e, t) {
        return function(n, i) {
          if (n == null)
            return n;
          if (!je(n))
            return e(n, i);
          for (var r = n.length, l = t ? r : -1, u = we(n); (t ? l-- : ++l < r) && i(u[l], l, u) !== !1; )
            ;
          return n;
        };
      }
      function ll(e) {
        return function(t, n, i) {
          for (var r = -1, l = we(t), u = i(t), c = u.length; c--; ) {
            var p = u[e ? c : ++r];
            if (n(l[p], p, l) === !1)
              break;
          }
          return t;
        };
      }
      function b1(e, t, n) {
        var i = t & Z, r = ni(e);
        function l() {
          var u = this && this !== Ne && this instanceof l ? r : e;
          return u.apply(i ? n : this, arguments);
        }
        return l;
      }
      function ol(e) {
        return function(t) {
          t = be(t);
          var n = Ln(t) ? St(t) : a, i = n ? n[0] : t.charAt(0), r = n ? ln(n, 1).join("") : t.slice(1);
          return i[e]() + r;
        };
      }
      function Gn(e) {
        return function(t) {
          return Ar(s0(a0(t).replace(fo, "")), e, "");
        };
      }
      function ni(e) {
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return new e();
            case 1:
              return new e(t[0]);
            case 2:
              return new e(t[0], t[1]);
            case 3:
              return new e(t[0], t[1], t[2]);
            case 4:
              return new e(t[0], t[1], t[2], t[3]);
            case 5:
              return new e(t[0], t[1], t[2], t[3], t[4]);
            case 6:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
            case 7:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
          }
          var n = Pn(e.prototype), i = e.apply(n, t);
          return Le(i) ? i : n;
        };
      }
      function E1(e, t, n) {
        var i = ni(e);
        function r() {
          for (var l = arguments.length, u = g(l), c = l, p = Mn(r); c--; )
            u[c] = arguments[c];
          var k = l < 3 && u[0] !== p && u[l - 1] !== p ? [] : tn(u, p);
          if (l -= k.length, l < n)
            return pl(
              e,
              t,
              Gi,
              r.placeholder,
              a,
              u,
              k,
              a,
              a,
              n - l
            );
          var v = this && this !== Ne && this instanceof r ? i : e;
          return rt(v, this, u);
        }
        return r;
      }
      function ul(e) {
        return function(t, n, i) {
          var r = we(t);
          if (!je(t)) {
            var l = ee(n, 3);
            t = Ue(t), n = function(c) {
              return l(r[c], c, r);
            };
          }
          var u = e(t, n, i);
          return u > -1 ? r[l ? t[u] : u] : a;
        };
      }
      function cl(e) {
        return zt(function(t) {
          var n = t.length, i = n, r = ht.prototype.thru;
          for (e && t.reverse(); i--; ) {
            var l = t[i];
            if (typeof l != "function")
              throw new pt(C);
            if (r && !u && Ni(l) == "wrapper")
              var u = new ht([], !0);
          }
          for (i = u ? i : n; ++i < n; ) {
            l = t[i];
            var c = Ni(l), p = c == "wrapper" ? aa(l) : a;
            p && ua(p[0]) && p[1] == (F | ce | q | V) && !p[4].length && p[9] == 1 ? u = u[Ni(p[0])].apply(u, p[3]) : u = l.length == 1 && ua(l) ? u[c]() : u.thru(l);
          }
          return function() {
            var k = arguments, v = k[0];
            if (u && k.length == 1 && ae(v))
              return u.plant(v).value();
            for (var E = 0, P = n ? t[E].apply(this, k) : v; ++E < n; )
              P = t[E].call(this, P);
            return P;
          };
        });
      }
      function Gi(e, t, n, i, r, l, u, c, p, k) {
        var v = t & F, E = t & Z, P = t & ye, Q = t & (ce | de), te = t & ve, ue = P ? a : ni(e);
        function ne() {
          for (var me = arguments.length, ke = g(me), ot = me; ot--; )
            ke[ot] = arguments[ot];
          if (Q)
            var Je = Mn(ne), ut = Vo(ke, Je);
          if (i && (ke = rl(ke, i, r, Q)), l && (ke = al(ke, l, u, Q)), me -= ut, Q && me < k) {
            var Ve = tn(ke, Je);
            return pl(
              e,
              t,
              Gi,
              ne.placeholder,
              n,
              ke,
              Ve,
              c,
              p,
              k - me
            );
          }
          var Ct = E ? n : this, Yt = P ? Ct[e] : e;
          return me = ke.length, c ? ke = N1(ke, c) : te && me > 1 && ke.reverse(), v && p < me && (ke.length = p), this && this !== Ne && this instanceof ne && (Yt = ue || ni(Yt)), Yt.apply(Ct, ke);
        }
        return ne;
      }
      function dl(e, t) {
        return function(n, i) {
          return Ju(n, e, t(i), {});
        };
      }
      function Mi(e, t) {
        return function(n, i) {
          var r;
          if (n === a && i === a)
            return t;
          if (n !== a && (r = n), i !== a) {
            if (r === a)
              return i;
            typeof n == "string" || typeof i == "string" ? (n = st(n), i = st(i)) : (n = Zs(n), i = Zs(i)), r = e(n, i);
          }
          return r;
        };
      }
      function ta(e) {
        return zt(function(t) {
          return t = Ie(t, at(ee())), fe(function(n) {
            var i = this;
            return e(t, function(r) {
              return rt(r, i, n);
            });
          });
        });
      }
      function Ui(e, t) {
        t = t === a ? " " : st(t);
        var n = t.length;
        if (n < 2)
          return n ? Kr(t, e) : t;
        var i = Kr(t, Ci(e / Bn(t)));
        return Ln(t) ? ln(St(i), 0, e).join("") : i.slice(0, e);
      }
      function S1(e, t, n, i) {
        var r = t & Z, l = ni(e);
        function u() {
          for (var c = -1, p = arguments.length, k = -1, v = i.length, E = g(v + p), P = this && this !== Ne && this instanceof u ? l : e; ++k < v; )
            E[k] = i[k];
          for (; p--; )
            E[k++] = arguments[++c];
          return rt(P, r ? n : this, E);
        }
        return u;
      }
      function fl(e) {
        return function(t, n, i) {
          return i && typeof i != "number" && Ze(t, n, i) && (n = i = a), t = Kt(t), n === a ? (n = t, t = 0) : n = Kt(n), i = i === a ? t < n ? 1 : -1 : Kt(i), u1(t, n, i, e);
        };
      }
      function Wi(e) {
        return function(t, n) {
          return typeof t == "string" && typeof n == "string" || (t = yt(t), n = yt(n)), e(t, n);
        };
      }
      function pl(e, t, n, i, r, l, u, c, p, k) {
        var v = t & ce, E = v ? u : a, P = v ? a : u, Q = v ? l : a, te = v ? a : l;
        t |= v ? q : $, t &= ~(v ? $ : q), t & he || (t &= -4);
        var ue = [
          e,
          t,
          r,
          Q,
          E,
          te,
          P,
          c,
          p,
          k
        ], ne = n.apply(a, ue);
        return ua(e) && Al(ne, ue), ne.placeholder = i, wl(ne, e, t);
      }
      function na(e) {
        var t = Re[e];
        return function(n, i) {
          if (n = yt(n), i = i == null ? 0 : He(le(i), 292), i && ws(n)) {
            var r = (be(n) + "e").split("e"), l = t(r[0] + "e" + (+r[1] + i));
            return r = (be(l) + "e").split("e"), +(r[0] + "e" + (+r[1] - i));
          }
          return t(n);
        };
      }
      var A1 = Vn && 1 / xi(new Vn([, -0]))[1] == Tt ? function(e) {
        return new Vn(e);
      } : Sa;
      function hl(e) {
        return function(t) {
          var n = Qe(t);
          return n == it ? Br(t) : n == b ? Wo(t) : $o(t, e(t));
        };
      }
      function qt(e, t, n, i, r, l, u, c) {
        var p = t & ye;
        if (!p && typeof e != "function")
          throw new pt(C);
        var k = i ? i.length : 0;
        if (k || (t &= -97, i = r = a), u = u === a ? u : Ge(le(u), 0), c = c === a ? c : le(c), k -= r ? r.length : 0, t & $) {
          var v = i, E = r;
          i = r = a;
        }
        var P = p ? a : aa(e), Q = [
          e,
          t,
          n,
          i,
          r,
          v,
          E,
          l,
          u,
          c
        ];
        if (P && M1(Q, P), e = Q[0], t = Q[1], n = Q[2], i = Q[3], r = Q[4], c = Q[9] = Q[9] === a ? p ? 0 : e.length : Ge(Q[9] - k, 0), !c && t & (ce | de) && (t &= -25), !t || t == Z)
          var te = b1(e, t, n);
        else
          t == ce || t == de ? te = E1(e, t, c) : (t == q || t == (Z | q)) && !r.length ? te = S1(e, t, n, i) : te = Gi.apply(a, Q);
        var ue = P ? Ks : Al;
        return wl(ue(te, Q), e, t);
      }
      function ml(e, t, n, i) {
        return e === a || wt(e, $n[n]) && !Ee.call(i, n) ? t : e;
      }
      function gl(e, t, n, i, r, l) {
        return Le(e) && Le(t) && (l.set(t, e), Vi(e, t, a, gl, l), l.delete(t)), e;
      }
      function w1(e) {
        return ai(e) ? a : e;
      }
      function xl(e, t, n, i, r, l) {
        var u = n & A, c = e.length, p = t.length;
        if (c != p && !(u && p > c))
          return !1;
        var k = l.get(e), v = l.get(t);
        if (k && v)
          return k == t && v == e;
        var E = -1, P = !0, Q = n & D ? new xn() : a;
        for (l.set(e, t), l.set(t, e); ++E < c; ) {
          var te = e[E], ue = t[E];
          if (i)
            var ne = u ? i(ue, te, E, t, e, l) : i(te, ue, E, e, t, l);
          if (ne !== a) {
            if (ne)
              continue;
            P = !1;
            break;
          }
          if (Q) {
            if (!wr(t, function(me, ke) {
              if (!zn(Q, ke) && (te === me || r(te, me, n, i, l)))
                return Q.push(ke);
            })) {
              P = !1;
              break;
            }
          } else if (!(te === ue || r(te, ue, n, i, l))) {
            P = !1;
            break;
          }
        }
        return l.delete(e), l.delete(t), P;
      }
      function C1(e, t, n, i, r, l, u) {
        switch (n) {
          case Mt:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            e = e.buffer, t = t.buffer;
          case pn:
            return !(e.byteLength != t.byteLength || !l(new Ei(e), new Ei(t)));
          case Zt:
          case Jt:
          case Xt:
            return wt(+e, +t);
          case Tn:
            return e.name == t.name && e.message == t.message;
          case X:
          case M:
            return e == t + "";
          case it:
            var c = Br;
          case b:
            var p = i & A;
            if (c || (c = xi), e.size != t.size && !p)
              return !1;
            var k = u.get(e);
            if (k)
              return k == t;
            i |= D, u.set(e, t);
            var v = xl(c(e), c(t), i, r, l, u);
            return u.delete(e), v;
          case Se:
            if (Zn)
              return Zn.call(e) == Zn.call(t);
        }
        return !1;
      }
      function T1(e, t, n, i, r, l) {
        var u = n & A, c = ia(e), p = c.length, k = ia(t), v = k.length;
        if (p != v && !u)
          return !1;
        for (var E = p; E--; ) {
          var P = c[E];
          if (!(u ? P in t : Ee.call(t, P)))
            return !1;
        }
        var Q = l.get(e), te = l.get(t);
        if (Q && te)
          return Q == t && te == e;
        var ue = !0;
        l.set(e, t), l.set(t, e);
        for (var ne = u; ++E < p; ) {
          P = c[E];
          var me = e[P], ke = t[P];
          if (i)
            var ot = u ? i(ke, me, P, t, e, l) : i(me, ke, P, e, t, l);
          if (!(ot === a ? me === ke || r(me, ke, n, i, l) : ot)) {
            ue = !1;
            break;
          }
          ne || (ne = P == "constructor");
        }
        if (ue && !ne) {
          var Je = e.constructor, ut = t.constructor;
          Je != ut && "constructor" in e && "constructor" in t && !(typeof Je == "function" && Je instanceof Je && typeof ut == "function" && ut instanceof ut) && (ue = !1);
        }
        return l.delete(e), l.delete(t), ue;
      }
      function zt(e) {
        return da(El(e, a, Bl), e + "");
      }
      function ia(e) {
        return Ps(e, Ue, la);
      }
      function ra(e) {
        return Ps(e, et, yl);
      }
      var aa = Di ? function(e) {
        return Di.get(e);
      } : Sa;
      function Ni(e) {
        for (var t = e.name + "", n = On[t], i = Ee.call(On, t) ? n.length : 0; i--; ) {
          var r = n[i], l = r.func;
          if (l == null || l == e)
            return r.name;
        }
        return t;
      }
      function Mn(e) {
        var t = Ee.call(s, "placeholder") ? s : e;
        return t.placeholder;
      }
      function ee() {
        var e = s.iteratee || ba;
        return e = e === ba ? Ms : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function qi(e, t) {
        var n = e.__data__;
        return O1(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
      }
      function sa(e) {
        for (var t = Ue(e), n = t.length; n--; ) {
          var i = t[n], r = e[i];
          t[n] = [i, r, _l(r)];
        }
        return t;
      }
      function vn(e, t) {
        var n = Go(e, t);
        return Gs(n) ? n : a;
      }
      function D1(e) {
        var t = Ee.call(e, mn), n = e[mn];
        try {
          e[mn] = a;
          var i = !0;
        } catch {
        }
        var r = _i.call(e);
        return i && (t ? e[mn] = n : delete e[mn]), r;
      }
      var la = $r ? function(e) {
        return e == null ? [] : (e = we(e), jt($r(e), function(t) {
          return Ss.call(e, t);
        }));
      } : Aa, yl = $r ? function(e) {
        for (var t = []; e; )
          en(t, la(e)), e = Si(e);
        return t;
      } : Aa, Qe = Ye;
      (Vr && Qe(new Vr(new ArrayBuffer(1))) != Mt || Qn && Qe(new Qn()) != it || Or && Qe(Or.resolve()) != di || Vn && Qe(new Vn()) != b || Kn && Qe(new Kn()) != oe) && (Qe = function(e) {
        var t = Ye(e), n = t == bt ? e.constructor : a, i = n ? _n(n) : "";
        if (i)
          switch (i) {
            case du:
              return Mt;
            case fu:
              return it;
            case pu:
              return di;
            case hu:
              return b;
            case mu:
              return oe;
          }
        return t;
      });
      function I1(e, t, n) {
        for (var i = -1, r = n.length; ++i < r; ) {
          var l = n[i], u = l.size;
          switch (l.type) {
            case "drop":
              e += u;
              break;
            case "dropRight":
              t -= u;
              break;
            case "take":
              t = He(t, e + u);
              break;
            case "takeRight":
              e = Ge(e, t - u);
              break;
          }
        }
        return { start: e, end: t };
      }
      function L1(e) {
        var t = e.match(O0);
        return t ? t[1].split(P0) : [];
      }
      function kl(e, t, n) {
        t = sn(t, e);
        for (var i = -1, r = t.length, l = !1; ++i < r; ) {
          var u = Bt(t[i]);
          if (!(l = e != null && n(e, u)))
            break;
          e = e[u];
        }
        return l || ++i != r ? l : (r = e == null ? 0 : e.length, !!r && Ji(r) && Ht(u, r) && (ae(e) || bn(e)));
      }
      function B1(e) {
        var t = e.length, n = new e.constructor(t);
        return t && typeof e[0] == "string" && Ee.call(e, "index") && (n.index = e.index, n.input = e.input), n;
      }
      function vl(e) {
        return typeof e.constructor == "function" && !ii(e) ? Pn(Si(e)) : {};
      }
      function F1(e, t, n) {
        var i = e.constructor;
        switch (t) {
          case pn:
            return ea(e);
          case Zt:
          case Jt:
            return new i(+e);
          case Mt:
            return g1(e, n);
          case qn:
          case lr:
          case or:
          case ur:
          case cr:
          case dr:
          case fr:
          case pr:
          case hr:
            return nl(e, n);
          case it:
            return new i();
          case Xt:
          case M:
            return new i(e);
          case X:
            return x1(e);
          case b:
            return new i();
          case Se:
            return y1(e);
        }
      }
      function $1(e, t) {
        var n = t.length;
        if (!n)
          return e;
        var i = n - 1;
        return t[i] = (n > 1 ? "& " : "") + t[i], t = t.join(n > 2 ? ", " : " "), e.replace(V0, `{
/* [wrapped with ` + t + `] */
`);
      }
      function V1(e) {
        return ae(e) || bn(e) || !!(As && e && e[As]);
      }
      function Ht(e, t) {
        var n = typeof e;
        return t = t ?? ze, !!t && (n == "number" || n != "symbol" && H0.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function Ze(e, t, n) {
        if (!Le(n))
          return !1;
        var i = typeof t;
        return (i == "number" ? je(n) && Ht(t, n.length) : i == "string" && t in n) ? wt(n[t], e) : !1;
      }
      function oa(e, t) {
        if (ae(e))
          return !1;
        var n = typeof e;
        return n == "number" || n == "symbol" || n == "boolean" || e == null || lt(e) ? !0 : L0.test(e) || !I0.test(e) || t != null && e in we(t);
      }
      function O1(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
      }
      function ua(e) {
        var t = Ni(e), n = s[t];
        if (typeof n != "function" || !(t in xe.prototype))
          return !1;
        if (e === n)
          return !0;
        var i = aa(n);
        return !!i && e === i[0];
      }
      function P1(e) {
        return !!_s && _s in e;
      }
      var R1 = ki ? Qt : wa;
      function ii(e) {
        var t = e && e.constructor, n = typeof t == "function" && t.prototype || $n;
        return e === n;
      }
      function _l(e) {
        return e === e && !Le(e);
      }
      function bl(e, t) {
        return function(n) {
          return n == null ? !1 : n[e] === t && (t !== a || e in we(n));
        };
      }
      function G1(e) {
        var t = Yi(e, function(i) {
          return n.size === G && n.clear(), i;
        }), n = t.cache;
        return t;
      }
      function M1(e, t) {
        var n = e[1], i = t[1], r = n | i, l = r < (Z | ye | F), u = i == F && n == ce || i == F && n == V && e[7].length <= t[8] || i == (F | V) && t[7].length <= t[8] && n == ce;
        if (!(l || u))
          return e;
        i & Z && (e[2] = t[2], r |= n & Z ? 0 : he);
        var c = t[3];
        if (c) {
          var p = e[3];
          e[3] = p ? rl(p, c, t[4]) : c, e[4] = p ? tn(e[3], z) : t[4];
        }
        return c = t[5], c && (p = e[5], e[5] = p ? al(p, c, t[6]) : c, e[6] = p ? tn(e[5], z) : t[6]), c = t[7], c && (e[7] = c), i & F && (e[8] = e[8] == null ? t[8] : He(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = r, e;
      }
      function U1(e) {
        var t = [];
        if (e != null)
          for (var n in we(e))
            t.push(n);
        return t;
      }
      function W1(e) {
        return _i.call(e);
      }
      function El(e, t, n) {
        return t = Ge(t === a ? e.length - 1 : t, 0), function() {
          for (var i = arguments, r = -1, l = Ge(i.length - t, 0), u = g(l); ++r < l; )
            u[r] = i[t + r];
          r = -1;
          for (var c = g(t + 1); ++r < t; )
            c[r] = i[r];
          return c[t] = n(u), rt(e, this, c);
        };
      }
      function Sl(e, t) {
        return t.length < 2 ? e : kn(e, gt(t, 0, -1));
      }
      function N1(e, t) {
        for (var n = e.length, i = He(t.length, n), r = Xe(e); i--; ) {
          var l = t[i];
          e[i] = Ht(l, n) ? r[l] : a;
        }
        return e;
      }
      function ca(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var Al = Cl(Ks), ri = ru || function(e, t) {
        return Ne.setTimeout(e, t);
      }, da = Cl(f1);
      function wl(e, t, n) {
        var i = t + "";
        return da(e, $1(i, q1(L1(i), n)));
      }
      function Cl(e) {
        var t = 0, n = 0;
        return function() {
          var i = ou(), r = kt - (i - n);
          if (n = i, r > 0) {
            if (++t >= Pe)
              return arguments[0];
          } else
            t = 0;
          return e.apply(a, arguments);
        };
      }
      function zi(e, t) {
        var n = -1, i = e.length, r = i - 1;
        for (t = t === a ? i : t; ++n < t; ) {
          var l = Qr(n, r), u = e[l];
          e[l] = e[n], e[n] = u;
        }
        return e.length = t, e;
      }
      var Tl = G1(function(e) {
        var t = [];
        return e.charCodeAt(0) === 46 && t.push(""), e.replace(B0, function(n, i, r, l) {
          t.push(r ? l.replace(M0, "$1") : i || n);
        }), t;
      });
      function Bt(e) {
        if (typeof e == "string" || lt(e))
          return e;
        var t = e + "";
        return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
      }
      function _n(e) {
        if (e != null) {
          try {
            return vi.call(e);
          } catch {
          }
          try {
            return e + "";
          } catch {
          }
        }
        return "";
      }
      function q1(e, t) {
        return ft(Dt, function(n) {
          var i = "_." + n[0];
          t & n[1] && !mi(e, i) && e.push(i);
        }), e.sort();
      }
      function Dl(e) {
        if (e instanceof xe)
          return e.clone();
        var t = new ht(e.__wrapped__, e.__chain__);
        return t.__actions__ = Xe(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
      }
      function z1(e, t, n) {
        (n ? Ze(e, t, n) : t === a) ? t = 1 : t = Ge(le(t), 0);
        var i = e == null ? 0 : e.length;
        if (!i || t < 1)
          return [];
        for (var r = 0, l = 0, u = g(Ci(i / t)); r < i; )
          u[l++] = gt(e, r, r += t);
        return u;
      }
      function H1(e) {
        for (var t = -1, n = e == null ? 0 : e.length, i = 0, r = []; ++t < n; ) {
          var l = e[t];
          l && (r[i++] = l);
        }
        return r;
      }
      function Q1() {
        var e = arguments.length;
        if (!e)
          return [];
        for (var t = g(e - 1), n = arguments[0], i = e; i--; )
          t[i - 1] = arguments[i];
        return en(ae(n) ? Xe(n) : [n], qe(t, 1));
      }
      var K1 = fe(function(e, t) {
        return $e(e) ? Xn(e, qe(t, 1, $e, !0)) : [];
      }), Y1 = fe(function(e, t) {
        var n = xt(t);
        return $e(n) && (n = a), $e(e) ? Xn(e, qe(t, 1, $e, !0), ee(n, 2)) : [];
      }), Z1 = fe(function(e, t) {
        var n = xt(t);
        return $e(n) && (n = a), $e(e) ? Xn(e, qe(t, 1, $e, !0), a, n) : [];
      });
      function J1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : le(t), gt(e, t < 0 ? 0 : t, i)) : [];
      }
      function X1(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : le(t), t = i - t, gt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function j1(e, t) {
        return e && e.length ? Pi(e, ee(t, 3), !0, !0) : [];
      }
      function ec(e, t) {
        return e && e.length ? Pi(e, ee(t, 3), !0) : [];
      }
      function tc(e, t, n, i) {
        var r = e == null ? 0 : e.length;
        return r ? (n && typeof n != "number" && Ze(e, t, n) && (n = 0, i = r), Qu(e, t, n, i)) : [];
      }
      function Il(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = n == null ? 0 : le(n);
        return r < 0 && (r = Ge(i + r, 0)), gi(e, ee(t, 3), r);
      }
      function Ll(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = i - 1;
        return n !== a && (r = le(n), r = n < 0 ? Ge(i + r, 0) : He(r, i - 1)), gi(e, ee(t, 3), r, !0);
      }
      function Bl(e) {
        var t = e == null ? 0 : e.length;
        return t ? qe(e, 1) : [];
      }
      function nc(e) {
        var t = e == null ? 0 : e.length;
        return t ? qe(e, Tt) : [];
      }
      function ic(e, t) {
        var n = e == null ? 0 : e.length;
        return n ? (t = t === a ? 1 : le(t), qe(e, t)) : [];
      }
      function rc(e) {
        for (var t = -1, n = e == null ? 0 : e.length, i = {}; ++t < n; ) {
          var r = e[t];
          i[r[0]] = r[1];
        }
        return i;
      }
      function Fl(e) {
        return e && e.length ? e[0] : a;
      }
      function ac(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = n == null ? 0 : le(n);
        return r < 0 && (r = Ge(i + r, 0)), In(e, t, r);
      }
      function sc(e) {
        var t = e == null ? 0 : e.length;
        return t ? gt(e, 0, -1) : [];
      }
      var lc = fe(function(e) {
        var t = Ie(e, Xr);
        return t.length && t[0] === e[0] ? Wr(t) : [];
      }), oc = fe(function(e) {
        var t = xt(e), n = Ie(e, Xr);
        return t === xt(n) ? t = a : n.pop(), n.length && n[0] === e[0] ? Wr(n, ee(t, 2)) : [];
      }), uc = fe(function(e) {
        var t = xt(e), n = Ie(e, Xr);
        return t = typeof t == "function" ? t : a, t && n.pop(), n.length && n[0] === e[0] ? Wr(n, a, t) : [];
      });
      function cc(e, t) {
        return e == null ? "" : su.call(e, t);
      }
      function xt(e) {
        var t = e == null ? 0 : e.length;
        return t ? e[t - 1] : a;
      }
      function dc(e, t, n) {
        var i = e == null ? 0 : e.length;
        if (!i)
          return -1;
        var r = i;
        return n !== a && (r = le(n), r = r < 0 ? Ge(i + r, 0) : He(r, i - 1)), t === t ? qo(e, t, r) : gi(e, ps, r, !0);
      }
      function fc(e, t) {
        return e && e.length ? qs(e, le(t)) : a;
      }
      var pc = fe($l);
      function $l(e, t) {
        return e && e.length && t && t.length ? Hr(e, t) : e;
      }
      function hc(e, t, n) {
        return e && e.length && t && t.length ? Hr(e, t, ee(n, 2)) : e;
      }
      function mc(e, t, n) {
        return e && e.length && t && t.length ? Hr(e, t, a, n) : e;
      }
      var gc = zt(function(e, t) {
        var n = e == null ? 0 : e.length, i = Rr(e, t);
        return Qs(e, Ie(t, function(r) {
          return Ht(r, n) ? +r : r;
        }).sort(il)), i;
      });
      function xc(e, t) {
        var n = [];
        if (!(e && e.length))
          return n;
        var i = -1, r = [], l = e.length;
        for (t = ee(t, 3); ++i < l; ) {
          var u = e[i];
          t(u, i, e) && (n.push(u), r.push(i));
        }
        return Qs(e, r), n;
      }
      function fa(e) {
        return e == null ? e : cu.call(e);
      }
      function yc(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (n && typeof n != "number" && Ze(e, t, n) ? (t = 0, n = i) : (t = t == null ? 0 : le(t), n = n === a ? i : le(n)), gt(e, t, n)) : [];
      }
      function kc(e, t) {
        return Oi(e, t);
      }
      function vc(e, t, n) {
        return Yr(e, t, ee(n, 2));
      }
      function _c(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = Oi(e, t);
          if (i < n && wt(e[i], t))
            return i;
        }
        return -1;
      }
      function bc(e, t) {
        return Oi(e, t, !0);
      }
      function Ec(e, t, n) {
        return Yr(e, t, ee(n, 2), !0);
      }
      function Sc(e, t) {
        var n = e == null ? 0 : e.length;
        if (n) {
          var i = Oi(e, t, !0) - 1;
          if (wt(e[i], t))
            return i;
        }
        return -1;
      }
      function Ac(e) {
        return e && e.length ? Ys(e) : [];
      }
      function wc(e, t) {
        return e && e.length ? Ys(e, ee(t, 2)) : [];
      }
      function Cc(e) {
        var t = e == null ? 0 : e.length;
        return t ? gt(e, 1, t) : [];
      }
      function Tc(e, t, n) {
        return e && e.length ? (t = n || t === a ? 1 : le(t), gt(e, 0, t < 0 ? 0 : t)) : [];
      }
      function Dc(e, t, n) {
        var i = e == null ? 0 : e.length;
        return i ? (t = n || t === a ? 1 : le(t), t = i - t, gt(e, t < 0 ? 0 : t, i)) : [];
      }
      function Ic(e, t) {
        return e && e.length ? Pi(e, ee(t, 3), !1, !0) : [];
      }
      function Lc(e, t) {
        return e && e.length ? Pi(e, ee(t, 3)) : [];
      }
      var Bc = fe(function(e) {
        return an(qe(e, 1, $e, !0));
      }), Fc = fe(function(e) {
        var t = xt(e);
        return $e(t) && (t = a), an(qe(e, 1, $e, !0), ee(t, 2));
      }), $c = fe(function(e) {
        var t = xt(e);
        return t = typeof t == "function" ? t : a, an(qe(e, 1, $e, !0), a, t);
      });
      function Vc(e) {
        return e && e.length ? an(e) : [];
      }
      function Oc(e, t) {
        return e && e.length ? an(e, ee(t, 2)) : [];
      }
      function Pc(e, t) {
        return t = typeof t == "function" ? t : a, e && e.length ? an(e, a, t) : [];
      }
      function pa(e) {
        if (!(e && e.length))
          return [];
        var t = 0;
        return e = jt(e, function(n) {
          if ($e(n))
            return t = Ge(n.length, t), !0;
        }), Ir(t, function(n) {
          return Ie(e, Cr(n));
        });
      }
      function Vl(e, t) {
        if (!(e && e.length))
          return [];
        var n = pa(e);
        return t == null ? n : Ie(n, function(i) {
          return rt(t, a, i);
        });
      }
      var Rc = fe(function(e, t) {
        return $e(e) ? Xn(e, t) : [];
      }), Gc = fe(function(e) {
        return Jr(jt(e, $e));
      }), Mc = fe(function(e) {
        var t = xt(e);
        return $e(t) && (t = a), Jr(jt(e, $e), ee(t, 2));
      }), Uc = fe(function(e) {
        var t = xt(e);
        return t = typeof t == "function" ? t : a, Jr(jt(e, $e), a, t);
      }), Wc = fe(pa);
      function Nc(e, t) {
        return js(e || [], t || [], Jn);
      }
      function qc(e, t) {
        return js(e || [], t || [], ti);
      }
      var zc = fe(function(e) {
        var t = e.length, n = t > 1 ? e[t - 1] : a;
        return n = typeof n == "function" ? (e.pop(), n) : a, Vl(e, n);
      });
      function Ol(e) {
        var t = s(e);
        return t.__chain__ = !0, t;
      }
      function Hc(e, t) {
        return t(e), e;
      }
      function Hi(e, t) {
        return t(e);
      }
      var Qc = zt(function(e) {
        var t = e.length, n = t ? e[0] : 0, i = this.__wrapped__, r = function(l) {
          return Rr(l, e);
        };
        return t > 1 || this.__actions__.length || !(i instanceof xe) || !Ht(n) ? this.thru(r) : (i = i.slice(n, +n + (t ? 1 : 0)), i.__actions__.push({
          func: Hi,
          args: [r],
          thisArg: a
        }), new ht(i, this.__chain__).thru(function(l) {
          return t && !l.length && l.push(a), l;
        }));
      });
      function Kc() {
        return Ol(this);
      }
      function Yc() {
        return new ht(this.value(), this.__chain__);
      }
      function Zc() {
        this.__values__ === a && (this.__values__ = Zl(this.value()));
        var e = this.__index__ >= this.__values__.length, t = e ? a : this.__values__[this.__index__++];
        return { done: e, value: t };
      }
      function Jc() {
        return this;
      }
      function Xc(e) {
        for (var t, n = this; n instanceof Li; ) {
          var i = Dl(n);
          i.__index__ = 0, i.__values__ = a, t ? r.__wrapped__ = i : t = i;
          var r = i;
          n = n.__wrapped__;
        }
        return r.__wrapped__ = e, t;
      }
      function jc() {
        var e = this.__wrapped__;
        if (e instanceof xe) {
          var t = e;
          return this.__actions__.length && (t = new xe(this)), t = t.reverse(), t.__actions__.push({
            func: Hi,
            args: [fa],
            thisArg: a
          }), new ht(t, this.__chain__);
        }
        return this.thru(fa);
      }
      function ed() {
        return Xs(this.__wrapped__, this.__actions__);
      }
      var td = Ri(function(e, t, n) {
        Ee.call(e, n) ? ++e[n] : Nt(e, n, 1);
      });
      function nd(e, t, n) {
        var i = ae(e) ? ds : Hu;
        return n && Ze(e, t, n) && (t = a), i(e, ee(t, 3));
      }
      function id(e, t) {
        var n = ae(e) ? jt : Vs;
        return n(e, ee(t, 3));
      }
      var rd = ul(Il), ad = ul(Ll);
      function sd(e, t) {
        return qe(Qi(e, t), 1);
      }
      function ld(e, t) {
        return qe(Qi(e, t), Tt);
      }
      function od(e, t, n) {
        return n = n === a ? 1 : le(n), qe(Qi(e, t), n);
      }
      function Pl(e, t) {
        var n = ae(e) ? ft : rn;
        return n(e, ee(t, 3));
      }
      function Rl(e, t) {
        var n = ae(e) ? Co : $s;
        return n(e, ee(t, 3));
      }
      var ud = Ri(function(e, t, n) {
        Ee.call(e, n) ? e[n].push(t) : Nt(e, n, [t]);
      });
      function cd(e, t, n, i) {
        e = je(e) ? e : Wn(e), n = n && !i ? le(n) : 0;
        var r = e.length;
        return n < 0 && (n = Ge(r + n, 0)), Xi(e) ? n <= r && e.indexOf(t, n) > -1 : !!r && In(e, t, n) > -1;
      }
      var dd = fe(function(e, t, n) {
        var i = -1, r = typeof t == "function", l = je(e) ? g(e.length) : [];
        return rn(e, function(u) {
          l[++i] = r ? rt(t, u, n) : jn(u, t, n);
        }), l;
      }), fd = Ri(function(e, t, n) {
        Nt(e, n, t);
      });
      function Qi(e, t) {
        var n = ae(e) ? Ie : Us;
        return n(e, ee(t, 3));
      }
      function pd(e, t, n, i) {
        return e == null ? [] : (ae(t) || (t = t == null ? [] : [t]), n = i ? a : n, ae(n) || (n = n == null ? [] : [n]), zs(e, t, n));
      }
      var hd = Ri(function(e, t, n) {
        e[n ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function md(e, t, n) {
        var i = ae(e) ? Ar : ms, r = arguments.length < 3;
        return i(e, ee(t, 4), n, r, rn);
      }
      function gd(e, t, n) {
        var i = ae(e) ? To : ms, r = arguments.length < 3;
        return i(e, ee(t, 4), n, r, $s);
      }
      function xd(e, t) {
        var n = ae(e) ? jt : Vs;
        return n(e, Zi(ee(t, 3)));
      }
      function yd(e) {
        var t = ae(e) ? Is : c1;
        return t(e);
      }
      function kd(e, t, n) {
        (n ? Ze(e, t, n) : t === a) ? t = 1 : t = le(t);
        var i = ae(e) ? Uu : d1;
        return i(e, t);
      }
      function vd(e) {
        var t = ae(e) ? Wu : p1;
        return t(e);
      }
      function _d(e) {
        if (e == null)
          return 0;
        if (je(e))
          return Xi(e) ? Bn(e) : e.length;
        var t = Qe(e);
        return t == it || t == b ? e.size : qr(e).length;
      }
      function bd(e, t, n) {
        var i = ae(e) ? wr : h1;
        return n && Ze(e, t, n) && (t = a), i(e, ee(t, 3));
      }
      var Ed = fe(function(e, t) {
        if (e == null)
          return [];
        var n = t.length;
        return n > 1 && Ze(e, t[0], t[1]) ? t = [] : n > 2 && Ze(t[0], t[1], t[2]) && (t = [t[0]]), zs(e, qe(t, 1), []);
      }), Ki = iu || function() {
        return Ne.Date.now();
      };
      function Sd(e, t) {
        if (typeof t != "function")
          throw new pt(C);
        return e = le(e), function() {
          if (--e < 1)
            return t.apply(this, arguments);
        };
      }
      function Gl(e, t, n) {
        return t = n ? a : t, t = e && t == null ? e.length : t, qt(e, F, a, a, a, a, t);
      }
      function Ml(e, t) {
        var n;
        if (typeof t != "function")
          throw new pt(C);
        return e = le(e), function() {
          return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = a), n;
        };
      }
      var ha = fe(function(e, t, n) {
        var i = Z;
        if (n.length) {
          var r = tn(n, Mn(ha));
          i |= q;
        }
        return qt(e, i, t, n, r);
      }), Ul = fe(function(e, t, n) {
        var i = Z | ye;
        if (n.length) {
          var r = tn(n, Mn(Ul));
          i |= q;
        }
        return qt(t, i, e, n, r);
      });
      function Wl(e, t, n) {
        t = n ? a : t;
        var i = qt(e, ce, a, a, a, a, a, t);
        return i.placeholder = Wl.placeholder, i;
      }
      function Nl(e, t, n) {
        t = n ? a : t;
        var i = qt(e, de, a, a, a, a, a, t);
        return i.placeholder = Nl.placeholder, i;
      }
      function ql(e, t, n) {
        var i, r, l, u, c, p, k = 0, v = !1, E = !1, P = !0;
        if (typeof e != "function")
          throw new pt(C);
        t = yt(t) || 0, Le(n) && (v = !!n.leading, E = "maxWait" in n, l = E ? Ge(yt(n.maxWait) || 0, t) : l, P = "trailing" in n ? !!n.trailing : P);
        function Q(Ve) {
          var Ct = i, Yt = r;
          return i = r = a, k = Ve, u = e.apply(Yt, Ct), u;
        }
        function te(Ve) {
          return k = Ve, c = ri(me, t), v ? Q(Ve) : u;
        }
        function ue(Ve) {
          var Ct = Ve - p, Yt = Ve - k, u0 = t - Ct;
          return E ? He(u0, l - Yt) : u0;
        }
        function ne(Ve) {
          var Ct = Ve - p, Yt = Ve - k;
          return p === a || Ct >= t || Ct < 0 || E && Yt >= l;
        }
        function me() {
          var Ve = Ki();
          if (ne(Ve))
            return ke(Ve);
          c = ri(me, ue(Ve));
        }
        function ke(Ve) {
          return c = a, P && i ? Q(Ve) : (i = r = a, u);
        }
        function ot() {
          c !== a && el(c), k = 0, i = p = r = c = a;
        }
        function Je() {
          return c === a ? u : ke(Ki());
        }
        function ut() {
          var Ve = Ki(), Ct = ne(Ve);
          if (i = arguments, r = this, p = Ve, Ct) {
            if (c === a)
              return te(p);
            if (E)
              return el(c), c = ri(me, t), Q(p);
          }
          return c === a && (c = ri(me, t)), u;
        }
        return ut.cancel = ot, ut.flush = Je, ut;
      }
      var Ad = fe(function(e, t) {
        return Fs(e, 1, t);
      }), wd = fe(function(e, t, n) {
        return Fs(e, yt(t) || 0, n);
      });
      function Cd(e) {
        return qt(e, ve);
      }
      function Yi(e, t) {
        if (typeof e != "function" || t != null && typeof t != "function")
          throw new pt(C);
        var n = function() {
          var i = arguments, r = t ? t.apply(this, i) : i[0], l = n.cache;
          if (l.has(r))
            return l.get(r);
          var u = e.apply(this, i);
          return n.cache = l.set(r, u) || l, u;
        };
        return n.cache = new (Yi.Cache || Wt)(), n;
      }
      Yi.Cache = Wt;
      function Zi(e) {
        if (typeof e != "function")
          throw new pt(C);
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return !e.call(this);
            case 1:
              return !e.call(this, t[0]);
            case 2:
              return !e.call(this, t[0], t[1]);
            case 3:
              return !e.call(this, t[0], t[1], t[2]);
          }
          return !e.apply(this, t);
        };
      }
      function Td(e) {
        return Ml(2, e);
      }
      var Dd = m1(function(e, t) {
        t = t.length == 1 && ae(t[0]) ? Ie(t[0], at(ee())) : Ie(qe(t, 1), at(ee()));
        var n = t.length;
        return fe(function(i) {
          for (var r = -1, l = He(i.length, n); ++r < l; )
            i[r] = t[r].call(this, i[r]);
          return rt(e, this, i);
        });
      }), ma = fe(function(e, t) {
        var n = tn(t, Mn(ma));
        return qt(e, q, a, t, n);
      }), zl = fe(function(e, t) {
        var n = tn(t, Mn(zl));
        return qt(e, $, a, t, n);
      }), Id = zt(function(e, t) {
        return qt(e, V, a, a, a, t);
      });
      function Ld(e, t) {
        if (typeof e != "function")
          throw new pt(C);
        return t = t === a ? t : le(t), fe(e, t);
      }
      function Bd(e, t) {
        if (typeof e != "function")
          throw new pt(C);
        return t = t == null ? 0 : Ge(le(t), 0), fe(function(n) {
          var i = n[t], r = ln(n, 0, t);
          return i && en(r, i), rt(e, this, r);
        });
      }
      function Fd(e, t, n) {
        var i = !0, r = !0;
        if (typeof e != "function")
          throw new pt(C);
        return Le(n) && (i = "leading" in n ? !!n.leading : i, r = "trailing" in n ? !!n.trailing : r), ql(e, t, {
          leading: i,
          maxWait: t,
          trailing: r
        });
      }
      function $d(e) {
        return Gl(e, 1);
      }
      function Vd(e, t) {
        return ma(jr(t), e);
      }
      function Od() {
        if (!arguments.length)
          return [];
        var e = arguments[0];
        return ae(e) ? e : [e];
      }
      function Pd(e) {
        return mt(e, L);
      }
      function Rd(e, t) {
        return t = typeof t == "function" ? t : a, mt(e, L, t);
      }
      function Gd(e) {
        return mt(e, K | L);
      }
      function Md(e, t) {
        return t = typeof t == "function" ? t : a, mt(e, K | L, t);
      }
      function Ud(e, t) {
        return t == null || Bs(e, t, Ue(t));
      }
      function wt(e, t) {
        return e === t || e !== e && t !== t;
      }
      var Wd = Wi(Ur), Nd = Wi(function(e, t) {
        return e >= t;
      }), bn = Rs(/* @__PURE__ */ function() {
        return arguments;
      }()) ? Rs : function(e) {
        return Be(e) && Ee.call(e, "callee") && !Ss.call(e, "callee");
      }, ae = g.isArray, qd = as ? at(as) : Xu;
      function je(e) {
        return e != null && Ji(e.length) && !Qt(e);
      }
      function $e(e) {
        return Be(e) && je(e);
      }
      function zd(e) {
        return e === !0 || e === !1 || Be(e) && Ye(e) == Zt;
      }
      var on = au || wa, Hd = ss ? at(ss) : ju;
      function Qd(e) {
        return Be(e) && e.nodeType === 1 && !ai(e);
      }
      function Kd(e) {
        if (e == null)
          return !0;
        if (je(e) && (ae(e) || typeof e == "string" || typeof e.splice == "function" || on(e) || Un(e) || bn(e)))
          return !e.length;
        var t = Qe(e);
        if (t == it || t == b)
          return !e.size;
        if (ii(e))
          return !qr(e).length;
        for (var n in e)
          if (Ee.call(e, n))
            return !1;
        return !0;
      }
      function Yd(e, t) {
        return ei(e, t);
      }
      function Zd(e, t, n) {
        n = typeof n == "function" ? n : a;
        var i = n ? n(e, t) : a;
        return i === a ? ei(e, t, a, n) : !!i;
      }
      function ga(e) {
        if (!Be(e))
          return !1;
        var t = Ye(e);
        return t == Tn || t == rr || typeof e.message == "string" && typeof e.name == "string" && !ai(e);
      }
      function Jd(e) {
        return typeof e == "number" && ws(e);
      }
      function Qt(e) {
        if (!Le(e))
          return !1;
        var t = Ye(e);
        return t == Gt || t == ci || t == De || t == sr;
      }
      function Hl(e) {
        return typeof e == "number" && e == le(e);
      }
      function Ji(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= ze;
      }
      function Le(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function Be(e) {
        return e != null && typeof e == "object";
      }
      var Ql = ls ? at(ls) : t1;
      function Xd(e, t) {
        return e === t || Nr(e, t, sa(t));
      }
      function jd(e, t, n) {
        return n = typeof n == "function" ? n : a, Nr(e, t, sa(t), n);
      }
      function ef(e) {
        return Kl(e) && e != +e;
      }
      function tf(e) {
        if (R1(e))
          throw new re(w);
        return Gs(e);
      }
      function nf(e) {
        return e === null;
      }
      function rf(e) {
        return e == null;
      }
      function Kl(e) {
        return typeof e == "number" || Be(e) && Ye(e) == Xt;
      }
      function ai(e) {
        if (!Be(e) || Ye(e) != bt)
          return !1;
        var t = Si(e);
        if (t === null)
          return !0;
        var n = Ee.call(t, "constructor") && t.constructor;
        return typeof n == "function" && n instanceof n && vi.call(n) == jo;
      }
      var xa = os ? at(os) : n1;
      function af(e) {
        return Hl(e) && e >= -9007199254740991 && e <= ze;
      }
      var Yl = us ? at(us) : i1;
      function Xi(e) {
        return typeof e == "string" || !ae(e) && Be(e) && Ye(e) == M;
      }
      function lt(e) {
        return typeof e == "symbol" || Be(e) && Ye(e) == Se;
      }
      var Un = cs ? at(cs) : r1;
      function sf(e) {
        return e === a;
      }
      function lf(e) {
        return Be(e) && Qe(e) == oe;
      }
      function of(e) {
        return Be(e) && Ye(e) == Et;
      }
      var uf = Wi(zr), cf = Wi(function(e, t) {
        return e <= t;
      });
      function Zl(e) {
        if (!e)
          return [];
        if (je(e))
          return Xi(e) ? St(e) : Xe(e);
        if (Hn && e[Hn])
          return Uo(e[Hn]());
        var t = Qe(e), n = t == it ? Br : t == b ? xi : Wn;
        return n(e);
      }
      function Kt(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = yt(e), e === Tt || e === -1 / 0) {
          var t = e < 0 ? -1 : 1;
          return t * j;
        }
        return e === e ? e : 0;
      }
      function le(e) {
        var t = Kt(e), n = t % 1;
        return t === t ? n ? t - n : t : 0;
      }
      function Jl(e) {
        return e ? yn(le(e), 0, T) : 0;
      }
      function yt(e) {
        if (typeof e == "number")
          return e;
        if (lt(e))
          return U;
        if (Le(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = Le(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = gs(e);
        var n = N0.test(e);
        return n || z0.test(e) ? So(e.slice(2), n ? 2 : 8) : W0.test(e) ? U : +e;
      }
      function Xl(e) {
        return Lt(e, et(e));
      }
      function df(e) {
        return e ? yn(le(e), -9007199254740991, ze) : e === 0 ? e : 0;
      }
      function be(e) {
        return e == null ? "" : st(e);
      }
      var ff = Rn(function(e, t) {
        if (ii(t) || je(t)) {
          Lt(t, Ue(t), e);
          return;
        }
        for (var n in t)
          Ee.call(t, n) && Jn(e, n, t[n]);
      }), jl = Rn(function(e, t) {
        Lt(t, et(t), e);
      }), ji = Rn(function(e, t, n, i) {
        Lt(t, et(t), e, i);
      }), pf = Rn(function(e, t, n, i) {
        Lt(t, Ue(t), e, i);
      }), hf = zt(Rr);
      function mf(e, t) {
        var n = Pn(e);
        return t == null ? n : Ls(n, t);
      }
      var gf = fe(function(e, t) {
        e = we(e);
        var n = -1, i = t.length, r = i > 2 ? t[2] : a;
        for (r && Ze(t[0], t[1], r) && (i = 1); ++n < i; )
          for (var l = t[n], u = et(l), c = -1, p = u.length; ++c < p; ) {
            var k = u[c], v = e[k];
            (v === a || wt(v, $n[k]) && !Ee.call(e, k)) && (e[k] = l[k]);
          }
        return e;
      }), xf = fe(function(e) {
        return e.push(a, gl), rt(e0, a, e);
      });
      function yf(e, t) {
        return fs(e, ee(t, 3), It);
      }
      function kf(e, t) {
        return fs(e, ee(t, 3), Mr);
      }
      function vf(e, t) {
        return e == null ? e : Gr(e, ee(t, 3), et);
      }
      function _f(e, t) {
        return e == null ? e : Os(e, ee(t, 3), et);
      }
      function bf(e, t) {
        return e && It(e, ee(t, 3));
      }
      function Ef(e, t) {
        return e && Mr(e, ee(t, 3));
      }
      function Sf(e) {
        return e == null ? [] : $i(e, Ue(e));
      }
      function Af(e) {
        return e == null ? [] : $i(e, et(e));
      }
      function ya(e, t, n) {
        var i = e == null ? a : kn(e, t);
        return i === a ? n : i;
      }
      function wf(e, t) {
        return e != null && kl(e, t, Ku);
      }
      function ka(e, t) {
        return e != null && kl(e, t, Yu);
      }
      var Cf = dl(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = _i.call(t)), e[t] = n;
      }, _a(tt)), Tf = dl(function(e, t, n) {
        t != null && typeof t.toString != "function" && (t = _i.call(t)), Ee.call(e, t) ? e[t].push(n) : e[t] = [n];
      }, ee), Df = fe(jn);
      function Ue(e) {
        return je(e) ? Ds(e) : qr(e);
      }
      function et(e) {
        return je(e) ? Ds(e, !0) : a1(e);
      }
      function If(e, t) {
        var n = {};
        return t = ee(t, 3), It(e, function(i, r, l) {
          Nt(n, t(i, r, l), i);
        }), n;
      }
      function Lf(e, t) {
        var n = {};
        return t = ee(t, 3), It(e, function(i, r, l) {
          Nt(n, r, t(i, r, l));
        }), n;
      }
      var Bf = Rn(function(e, t, n) {
        Vi(e, t, n);
      }), e0 = Rn(function(e, t, n, i) {
        Vi(e, t, n, i);
      }), Ff = zt(function(e, t) {
        var n = {};
        if (e == null)
          return n;
        var i = !1;
        t = Ie(t, function(l) {
          return l = sn(l, e), i || (i = l.length > 1), l;
        }), Lt(e, ra(e), n), i && (n = mt(n, K | H | L, w1));
        for (var r = t.length; r--; )
          Zr(n, t[r]);
        return n;
      });
      function $f(e, t) {
        return t0(e, Zi(ee(t)));
      }
      var Vf = zt(function(e, t) {
        return e == null ? {} : l1(e, t);
      });
      function t0(e, t) {
        if (e == null)
          return {};
        var n = Ie(ra(e), function(i) {
          return [i];
        });
        return t = ee(t), Hs(e, n, function(i, r) {
          return t(i, r[0]);
        });
      }
      function Of(e, t, n) {
        t = sn(t, e);
        var i = -1, r = t.length;
        for (r || (r = 1, e = a); ++i < r; ) {
          var l = e == null ? a : e[Bt(t[i])];
          l === a && (i = r, l = n), e = Qt(l) ? l.call(e) : l;
        }
        return e;
      }
      function Pf(e, t, n) {
        return e == null ? e : ti(e, t, n);
      }
      function Rf(e, t, n, i) {
        return i = typeof i == "function" ? i : a, e == null ? e : ti(e, t, n, i);
      }
      var n0 = hl(Ue), i0 = hl(et);
      function Gf(e, t, n) {
        var i = ae(e), r = i || on(e) || Un(e);
        if (t = ee(t, 4), n == null) {
          var l = e && e.constructor;
          r ? n = i ? new l() : [] : Le(e) ? n = Qt(l) ? Pn(Si(e)) : {} : n = {};
        }
        return (r ? ft : It)(e, function(u, c, p) {
          return t(n, u, c, p);
        }), n;
      }
      function Mf(e, t) {
        return e == null ? !0 : Zr(e, t);
      }
      function Uf(e, t, n) {
        return e == null ? e : Js(e, t, jr(n));
      }
      function Wf(e, t, n, i) {
        return i = typeof i == "function" ? i : a, e == null ? e : Js(e, t, jr(n), i);
      }
      function Wn(e) {
        return e == null ? [] : Lr(e, Ue(e));
      }
      function Nf(e) {
        return e == null ? [] : Lr(e, et(e));
      }
      function qf(e, t, n) {
        return n === a && (n = t, t = a), n !== a && (n = yt(n), n = n === n ? n : 0), t !== a && (t = yt(t), t = t === t ? t : 0), yn(yt(e), t, n);
      }
      function zf(e, t, n) {
        return t = Kt(t), n === a ? (n = t, t = 0) : n = Kt(n), e = yt(e), Zu(e, t, n);
      }
      function Hf(e, t, n) {
        if (n && typeof n != "boolean" && Ze(e, t, n) && (t = n = a), n === a && (typeof t == "boolean" ? (n = t, t = a) : typeof e == "boolean" && (n = e, e = a)), e === a && t === a ? (e = 0, t = 1) : (e = Kt(e), t === a ? (t = e, e = 0) : t = Kt(t)), e > t) {
          var i = e;
          e = t, t = i;
        }
        if (n || e % 1 || t % 1) {
          var r = Cs();
          return He(e + r * (t - e + Eo("1e-" + ((r + "").length - 1))), t);
        }
        return Qr(e, t);
      }
      var Qf = Gn(function(e, t, n) {
        return t = t.toLowerCase(), e + (n ? r0(t) : t);
      });
      function r0(e) {
        return va(be(e).toLowerCase());
      }
      function a0(e) {
        return e = be(e), e && e.replace(Q0, Oo).replace(po, "");
      }
      function Kf(e, t, n) {
        e = be(e), t = st(t);
        var i = e.length;
        n = n === a ? i : yn(le(n), 0, i);
        var r = n;
        return n -= t.length, n >= 0 && e.slice(n, r) == t;
      }
      function Yf(e) {
        return e = be(e), e && C0.test(e) ? e.replace(Oa, Po) : e;
      }
      function Zf(e) {
        return e = be(e), e && F0.test(e) ? e.replace(mr, "\\$&") : e;
      }
      var Jf = Gn(function(e, t, n) {
        return e + (n ? "-" : "") + t.toLowerCase();
      }), Xf = Gn(function(e, t, n) {
        return e + (n ? " " : "") + t.toLowerCase();
      }), jf = ol("toLowerCase");
      function ep(e, t, n) {
        e = be(e), t = le(t);
        var i = t ? Bn(e) : 0;
        if (!t || i >= t)
          return e;
        var r = (t - i) / 2;
        return Ui(Ti(r), n) + e + Ui(Ci(r), n);
      }
      function tp(e, t, n) {
        e = be(e), t = le(t);
        var i = t ? Bn(e) : 0;
        return t && i < t ? e + Ui(t - i, n) : e;
      }
      function np(e, t, n) {
        e = be(e), t = le(t);
        var i = t ? Bn(e) : 0;
        return t && i < t ? Ui(t - i, n) + e : e;
      }
      function ip(e, t, n) {
        return n || t == null ? t = 0 : t && (t = +t), uu(be(e).replace(gr, ""), t || 0);
      }
      function rp(e, t, n) {
        return (n ? Ze(e, t, n) : t === a) ? t = 1 : t = le(t), Kr(be(e), t);
      }
      function ap() {
        var e = arguments, t = be(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var sp = Gn(function(e, t, n) {
        return e + (n ? "_" : "") + t.toLowerCase();
      });
      function lp(e, t, n) {
        return n && typeof n != "number" && Ze(e, t, n) && (t = n = a), n = n === a ? T : n >>> 0, n ? (e = be(e), e && (typeof t == "string" || t != null && !xa(t)) && (t = st(t), !t && Ln(e)) ? ln(St(e), 0, n) : e.split(t, n)) : [];
      }
      var op = Gn(function(e, t, n) {
        return e + (n ? " " : "") + va(t);
      });
      function up(e, t, n) {
        return e = be(e), n = n == null ? 0 : yn(le(n), 0, e.length), t = st(t), e.slice(n, n + t.length) == t;
      }
      function cp(e, t, n) {
        var i = s.templateSettings;
        n && Ze(e, t, n) && (t = a), e = be(e), t = ji({}, t, i, ml);
        var r = ji({}, t.imports, i.imports, ml), l = Ue(r), u = Lr(r, l), c, p, k = 0, v = t.interpolate || fi, E = "__p += '", P = Fr(
          (t.escape || fi).source + "|" + v.source + "|" + (v === Pa ? U0 : fi).source + "|" + (t.evaluate || fi).source + "|$",
          "g"
        ), Q = "//# sourceURL=" + (Ee.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++yo + "]") + `
`;
        e.replace(P, function(ne, me, ke, ot, Je, ut) {
          return ke || (ke = ot), E += e.slice(k, ut).replace(K0, Ro), me && (c = !0, E += `' +
__e(` + me + `) +
'`), Je && (p = !0, E += `';
` + Je + `;
__p += '`), ke && (E += `' +
((__t = (` + ke + `)) == null ? '' : __t) +
'`), k = ut + ne.length, ne;
        }), E += `';
`;
        var te = Ee.call(t, "variable") && t.variable;
        if (!te)
          E = `with (obj) {
` + E + `
}
`;
        else if (G0.test(te))
          throw new re(R);
        E = (p ? E.replace(E0, "") : E).replace(S0, "$1").replace(A0, "$1;"), E = "function(" + (te || "obj") + `) {
` + (te ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c ? ", __e = _.escape" : "") + (p ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + E + `return __p
}`;
        var ue = l0(function() {
          return _e(l, Q + "return " + E).apply(a, u);
        });
        if (ue.source = E, ga(ue))
          throw ue;
        return ue;
      }
      function dp(e) {
        return be(e).toLowerCase();
      }
      function fp(e) {
        return be(e).toUpperCase();
      }
      function pp(e, t, n) {
        if (e = be(e), e && (n || t === a))
          return gs(e);
        if (!e || !(t = st(t)))
          return e;
        var i = St(e), r = St(t), l = xs(i, r), u = ys(i, r) + 1;
        return ln(i, l, u).join("");
      }
      function hp(e, t, n) {
        if (e = be(e), e && (n || t === a))
          return e.slice(0, vs(e) + 1);
        if (!e || !(t = st(t)))
          return e;
        var i = St(e), r = ys(i, St(t)) + 1;
        return ln(i, 0, r).join("");
      }
      function mp(e, t, n) {
        if (e = be(e), e && (n || t === a))
          return e.replace(gr, "");
        if (!e || !(t = st(t)))
          return e;
        var i = St(e), r = xs(i, St(t));
        return ln(i, r).join("");
      }
      function gp(e, t) {
        var n = Fe, i = Me;
        if (Le(t)) {
          var r = "separator" in t ? t.separator : r;
          n = "length" in t ? le(t.length) : n, i = "omission" in t ? st(t.omission) : i;
        }
        e = be(e);
        var l = e.length;
        if (Ln(e)) {
          var u = St(e);
          l = u.length;
        }
        if (n >= l)
          return e;
        var c = n - Bn(i);
        if (c < 1)
          return i;
        var p = u ? ln(u, 0, c).join("") : e.slice(0, c);
        if (r === a)
          return p + i;
        if (u && (c += p.length - c), xa(r)) {
          if (e.slice(c).search(r)) {
            var k, v = p;
            for (r.global || (r = Fr(r.source, be(Ra.exec(r)) + "g")), r.lastIndex = 0; k = r.exec(v); )
              var E = k.index;
            p = p.slice(0, E === a ? c : E);
          }
        } else if (e.indexOf(st(r), c) != c) {
          var P = p.lastIndexOf(r);
          P > -1 && (p = p.slice(0, P));
        }
        return p + i;
      }
      function xp(e) {
        return e = be(e), e && w0.test(e) ? e.replace(Va, zo) : e;
      }
      var yp = Gn(function(e, t, n) {
        return e + (n ? " " : "") + t.toUpperCase();
      }), va = ol("toUpperCase");
      function s0(e, t, n) {
        return e = be(e), t = n ? a : t, t === a ? Mo(e) ? Ko(e) : Lo(e) : e.match(t) || [];
      }
      var l0 = fe(function(e, t) {
        try {
          return rt(e, a, t);
        } catch (n) {
          return ga(n) ? n : new re(n);
        }
      }), kp = zt(function(e, t) {
        return ft(t, function(n) {
          n = Bt(n), Nt(e, n, ha(e[n], e));
        }), e;
      });
      function vp(e) {
        var t = e == null ? 0 : e.length, n = ee();
        return e = t ? Ie(e, function(i) {
          if (typeof i[1] != "function")
            throw new pt(C);
          return [n(i[0]), i[1]];
        }) : [], fe(function(i) {
          for (var r = -1; ++r < t; ) {
            var l = e[r];
            if (rt(l[0], this, i))
              return rt(l[1], this, i);
          }
        });
      }
      function _p(e) {
        return zu(mt(e, K));
      }
      function _a(e) {
        return function() {
          return e;
        };
      }
      function bp(e, t) {
        return e == null || e !== e ? t : e;
      }
      var Ep = cl(), Sp = cl(!0);
      function tt(e) {
        return e;
      }
      function ba(e) {
        return Ms(typeof e == "function" ? e : mt(e, K));
      }
      function Ap(e) {
        return Ws(mt(e, K));
      }
      function wp(e, t) {
        return Ns(e, mt(t, K));
      }
      var Cp = fe(function(e, t) {
        return function(n) {
          return jn(n, e, t);
        };
      }), Tp = fe(function(e, t) {
        return function(n) {
          return jn(e, n, t);
        };
      });
      function Ea(e, t, n) {
        var i = Ue(t), r = $i(t, i);
        n == null && !(Le(t) && (r.length || !i.length)) && (n = t, t = e, e = this, r = $i(t, Ue(t)));
        var l = !(Le(n) && "chain" in n) || !!n.chain, u = Qt(e);
        return ft(r, function(c) {
          var p = t[c];
          e[c] = p, u && (e.prototype[c] = function() {
            var k = this.__chain__;
            if (l || k) {
              var v = e(this.__wrapped__), E = v.__actions__ = Xe(this.__actions__);
              return E.push({ func: p, args: arguments, thisArg: e }), v.__chain__ = k, v;
            }
            return p.apply(e, en([this.value()], arguments));
          });
        }), e;
      }
      function Dp() {
        return Ne._ === this && (Ne._ = eu), this;
      }
      function Sa() {
      }
      function Ip(e) {
        return e = le(e), fe(function(t) {
          return qs(t, e);
        });
      }
      var Lp = ta(Ie), Bp = ta(ds), Fp = ta(wr);
      function o0(e) {
        return oa(e) ? Cr(Bt(e)) : o1(e);
      }
      function $p(e) {
        return function(t) {
          return e == null ? a : kn(e, t);
        };
      }
      var Vp = fl(), Op = fl(!0);
      function Aa() {
        return [];
      }
      function wa() {
        return !1;
      }
      function Pp() {
        return {};
      }
      function Rp() {
        return "";
      }
      function Gp() {
        return !0;
      }
      function Mp(e, t) {
        if (e = le(e), e < 1 || e > ze)
          return [];
        var n = T, i = He(e, T);
        t = ee(t), e -= T;
        for (var r = Ir(i, t); ++n < e; )
          t(n);
        return r;
      }
      function Up(e) {
        return ae(e) ? Ie(e, Bt) : lt(e) ? [e] : Xe(Tl(be(e)));
      }
      function Wp(e) {
        var t = ++Xo;
        return be(e) + t;
      }
      var Np = Mi(function(e, t) {
        return e + t;
      }, 0), qp = na("ceil"), zp = Mi(function(e, t) {
        return e / t;
      }, 1), Hp = na("floor");
      function Qp(e) {
        return e && e.length ? Fi(e, tt, Ur) : a;
      }
      function Kp(e, t) {
        return e && e.length ? Fi(e, ee(t, 2), Ur) : a;
      }
      function Yp(e) {
        return hs(e, tt);
      }
      function Zp(e, t) {
        return hs(e, ee(t, 2));
      }
      function Jp(e) {
        return e && e.length ? Fi(e, tt, zr) : a;
      }
      function Xp(e, t) {
        return e && e.length ? Fi(e, ee(t, 2), zr) : a;
      }
      var jp = Mi(function(e, t) {
        return e * t;
      }, 1), eh = na("round"), th = Mi(function(e, t) {
        return e - t;
      }, 0);
      function nh(e) {
        return e && e.length ? Dr(e, tt) : 0;
      }
      function ih(e, t) {
        return e && e.length ? Dr(e, ee(t, 2)) : 0;
      }
      return s.after = Sd, s.ary = Gl, s.assign = ff, s.assignIn = jl, s.assignInWith = ji, s.assignWith = pf, s.at = hf, s.before = Ml, s.bind = ha, s.bindAll = kp, s.bindKey = Ul, s.castArray = Od, s.chain = Ol, s.chunk = z1, s.compact = H1, s.concat = Q1, s.cond = vp, s.conforms = _p, s.constant = _a, s.countBy = td, s.create = mf, s.curry = Wl, s.curryRight = Nl, s.debounce = ql, s.defaults = gf, s.defaultsDeep = xf, s.defer = Ad, s.delay = wd, s.difference = K1, s.differenceBy = Y1, s.differenceWith = Z1, s.drop = J1, s.dropRight = X1, s.dropRightWhile = j1, s.dropWhile = ec, s.fill = tc, s.filter = id, s.flatMap = sd, s.flatMapDeep = ld, s.flatMapDepth = od, s.flatten = Bl, s.flattenDeep = nc, s.flattenDepth = ic, s.flip = Cd, s.flow = Ep, s.flowRight = Sp, s.fromPairs = rc, s.functions = Sf, s.functionsIn = Af, s.groupBy = ud, s.initial = sc, s.intersection = lc, s.intersectionBy = oc, s.intersectionWith = uc, s.invert = Cf, s.invertBy = Tf, s.invokeMap = dd, s.iteratee = ba, s.keyBy = fd, s.keys = Ue, s.keysIn = et, s.map = Qi, s.mapKeys = If, s.mapValues = Lf, s.matches = Ap, s.matchesProperty = wp, s.memoize = Yi, s.merge = Bf, s.mergeWith = e0, s.method = Cp, s.methodOf = Tp, s.mixin = Ea, s.negate = Zi, s.nthArg = Ip, s.omit = Ff, s.omitBy = $f, s.once = Td, s.orderBy = pd, s.over = Lp, s.overArgs = Dd, s.overEvery = Bp, s.overSome = Fp, s.partial = ma, s.partialRight = zl, s.partition = hd, s.pick = Vf, s.pickBy = t0, s.property = o0, s.propertyOf = $p, s.pull = pc, s.pullAll = $l, s.pullAllBy = hc, s.pullAllWith = mc, s.pullAt = gc, s.range = Vp, s.rangeRight = Op, s.rearg = Id, s.reject = xd, s.remove = xc, s.rest = Ld, s.reverse = fa, s.sampleSize = kd, s.set = Pf, s.setWith = Rf, s.shuffle = vd, s.slice = yc, s.sortBy = Ed, s.sortedUniq = Ac, s.sortedUniqBy = wc, s.split = lp, s.spread = Bd, s.tail = Cc, s.take = Tc, s.takeRight = Dc, s.takeRightWhile = Ic, s.takeWhile = Lc, s.tap = Hc, s.throttle = Fd, s.thru = Hi, s.toArray = Zl, s.toPairs = n0, s.toPairsIn = i0, s.toPath = Up, s.toPlainObject = Xl, s.transform = Gf, s.unary = $d, s.union = Bc, s.unionBy = Fc, s.unionWith = $c, s.uniq = Vc, s.uniqBy = Oc, s.uniqWith = Pc, s.unset = Mf, s.unzip = pa, s.unzipWith = Vl, s.update = Uf, s.updateWith = Wf, s.values = Wn, s.valuesIn = Nf, s.without = Rc, s.words = s0, s.wrap = Vd, s.xor = Gc, s.xorBy = Mc, s.xorWith = Uc, s.zip = Wc, s.zipObject = Nc, s.zipObjectDeep = qc, s.zipWith = zc, s.entries = n0, s.entriesIn = i0, s.extend = jl, s.extendWith = ji, Ea(s, s), s.add = Np, s.attempt = l0, s.camelCase = Qf, s.capitalize = r0, s.ceil = qp, s.clamp = qf, s.clone = Pd, s.cloneDeep = Gd, s.cloneDeepWith = Md, s.cloneWith = Rd, s.conformsTo = Ud, s.deburr = a0, s.defaultTo = bp, s.divide = zp, s.endsWith = Kf, s.eq = wt, s.escape = Yf, s.escapeRegExp = Zf, s.every = nd, s.find = rd, s.findIndex = Il, s.findKey = yf, s.findLast = ad, s.findLastIndex = Ll, s.findLastKey = kf, s.floor = Hp, s.forEach = Pl, s.forEachRight = Rl, s.forIn = vf, s.forInRight = _f, s.forOwn = bf, s.forOwnRight = Ef, s.get = ya, s.gt = Wd, s.gte = Nd, s.has = wf, s.hasIn = ka, s.head = Fl, s.identity = tt, s.includes = cd, s.indexOf = ac, s.inRange = zf, s.invoke = Df, s.isArguments = bn, s.isArray = ae, s.isArrayBuffer = qd, s.isArrayLike = je, s.isArrayLikeObject = $e, s.isBoolean = zd, s.isBuffer = on, s.isDate = Hd, s.isElement = Qd, s.isEmpty = Kd, s.isEqual = Yd, s.isEqualWith = Zd, s.isError = ga, s.isFinite = Jd, s.isFunction = Qt, s.isInteger = Hl, s.isLength = Ji, s.isMap = Ql, s.isMatch = Xd, s.isMatchWith = jd, s.isNaN = ef, s.isNative = tf, s.isNil = rf, s.isNull = nf, s.isNumber = Kl, s.isObject = Le, s.isObjectLike = Be, s.isPlainObject = ai, s.isRegExp = xa, s.isSafeInteger = af, s.isSet = Yl, s.isString = Xi, s.isSymbol = lt, s.isTypedArray = Un, s.isUndefined = sf, s.isWeakMap = lf, s.isWeakSet = of, s.join = cc, s.kebabCase = Jf, s.last = xt, s.lastIndexOf = dc, s.lowerCase = Xf, s.lowerFirst = jf, s.lt = uf, s.lte = cf, s.max = Qp, s.maxBy = Kp, s.mean = Yp, s.meanBy = Zp, s.min = Jp, s.minBy = Xp, s.stubArray = Aa, s.stubFalse = wa, s.stubObject = Pp, s.stubString = Rp, s.stubTrue = Gp, s.multiply = jp, s.nth = fc, s.noConflict = Dp, s.noop = Sa, s.now = Ki, s.pad = ep, s.padEnd = tp, s.padStart = np, s.parseInt = ip, s.random = Hf, s.reduce = md, s.reduceRight = gd, s.repeat = rp, s.replace = ap, s.result = Of, s.round = eh, s.runInContext = d, s.sample = yd, s.size = _d, s.snakeCase = sp, s.some = bd, s.sortedIndex = kc, s.sortedIndexBy = vc, s.sortedIndexOf = _c, s.sortedLastIndex = bc, s.sortedLastIndexBy = Ec, s.sortedLastIndexOf = Sc, s.startCase = op, s.startsWith = up, s.subtract = th, s.sum = nh, s.sumBy = ih, s.template = cp, s.times = Mp, s.toFinite = Kt, s.toInteger = le, s.toLength = Jl, s.toLower = dp, s.toNumber = yt, s.toSafeInteger = df, s.toString = be, s.toUpper = fp, s.trim = pp, s.trimEnd = hp, s.trimStart = mp, s.truncate = gp, s.unescape = xp, s.uniqueId = Wp, s.upperCase = yp, s.upperFirst = va, s.each = Pl, s.eachRight = Rl, s.first = Fl, Ea(s, function() {
        var e = {};
        return It(s, function(t, n) {
          Ee.call(s.prototype, n) || (e[n] = t);
        }), e;
      }(), { chain: !1 }), s.VERSION = _, ft(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        s[e].placeholder = s;
      }), ft(["drop", "take"], function(e, t) {
        xe.prototype[e] = function(n) {
          n = n === a ? 1 : Ge(le(n), 0);
          var i = this.__filtered__ && !t ? new xe(this) : this.clone();
          return i.__filtered__ ? i.__takeCount__ = He(n, i.__takeCount__) : i.__views__.push({
            size: He(n, T),
            type: e + (i.__dir__ < 0 ? "Right" : "")
          }), i;
        }, xe.prototype[e + "Right"] = function(n) {
          return this.reverse()[e](n).reverse();
        };
      }), ft(["filter", "map", "takeWhile"], function(e, t) {
        var n = t + 1, i = n == Pt || n == fn;
        xe.prototype[e] = function(r) {
          var l = this.clone();
          return l.__iteratees__.push({
            iteratee: ee(r, 3),
            type: n
          }), l.__filtered__ = l.__filtered__ || i, l;
        };
      }), ft(["head", "last"], function(e, t) {
        var n = "take" + (t ? "Right" : "");
        xe.prototype[e] = function() {
          return this[n](1).value()[0];
        };
      }), ft(["initial", "tail"], function(e, t) {
        var n = "drop" + (t ? "" : "Right");
        xe.prototype[e] = function() {
          return this.__filtered__ ? new xe(this) : this[n](1);
        };
      }), xe.prototype.compact = function() {
        return this.filter(tt);
      }, xe.prototype.find = function(e) {
        return this.filter(e).head();
      }, xe.prototype.findLast = function(e) {
        return this.reverse().find(e);
      }, xe.prototype.invokeMap = fe(function(e, t) {
        return typeof e == "function" ? new xe(this) : this.map(function(n) {
          return jn(n, e, t);
        });
      }), xe.prototype.reject = function(e) {
        return this.filter(Zi(ee(e)));
      }, xe.prototype.slice = function(e, t) {
        e = le(e);
        var n = this;
        return n.__filtered__ && (e > 0 || t < 0) ? new xe(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), t !== a && (t = le(t), n = t < 0 ? n.dropRight(-t) : n.take(t - e)), n);
      }, xe.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, xe.prototype.toArray = function() {
        return this.take(T);
      }, It(xe.prototype, function(e, t) {
        var n = /^(?:filter|find|map|reject)|While$/.test(t), i = /^(?:head|last)$/.test(t), r = s[i ? "take" + (t == "last" ? "Right" : "") : t], l = i || /^find/.test(t);
        r && (s.prototype[t] = function() {
          var u = this.__wrapped__, c = i ? [1] : arguments, p = u instanceof xe, k = c[0], v = p || ae(u), E = function(me) {
            var ke = r.apply(s, en([me], c));
            return i && P ? ke[0] : ke;
          };
          v && n && typeof k == "function" && k.length != 1 && (p = v = !1);
          var P = this.__chain__, Q = !!this.__actions__.length, te = l && !P, ue = p && !Q;
          if (!l && v) {
            u = ue ? u : new xe(this);
            var ne = e.apply(u, c);
            return ne.__actions__.push({ func: Hi, args: [E], thisArg: a }), new ht(ne, P);
          }
          return te && ue ? e.apply(this, c) : (ne = this.thru(E), te ? i ? ne.value()[0] : ne.value() : ne);
        });
      }), ft(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = yi[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", i = /^(?:pop|shift)$/.test(e);
        s.prototype[e] = function() {
          var r = arguments;
          if (i && !this.__chain__) {
            var l = this.value();
            return t.apply(ae(l) ? l : [], r);
          }
          return this[n](function(u) {
            return t.apply(ae(u) ? u : [], r);
          });
        };
      }), It(xe.prototype, function(e, t) {
        var n = s[t];
        if (n) {
          var i = n.name + "";
          Ee.call(On, i) || (On[i] = []), On[i].push({ name: t, func: n });
        }
      }), On[Gi(a, ye).name] = [{
        name: "wrapper",
        func: a
      }], xe.prototype.clone = gu, xe.prototype.reverse = xu, xe.prototype.value = yu, s.prototype.at = Qc, s.prototype.chain = Kc, s.prototype.commit = Yc, s.prototype.next = Zc, s.prototype.plant = Xc, s.prototype.reverse = jc, s.prototype.toJSON = s.prototype.valueOf = s.prototype.value = ed, s.prototype.first = s.prototype.head, Hn && (s.prototype[Hn] = Jc), s;
    }, Fn = Yo();
    hn ? ((hn.exports = Fn)._ = Fn, br._ = Fn) : Ne._ = Fn;
  }).call(si);
})(tr, tr.exports);
var Ph = tr.exports;
const Rh = { class: "d-flex align-items-center mb-30" }, Gh = {
  __name: "BaseTableFilters",
  props: {
    filters: Array,
    prefix: {
      type: String,
      default: ""
    },
    inactive: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    li.FILTER_CHANGE,
    li.CLEAR_FILTERS
  ],
  setup(o, { emit: I }) {
    const a = I, _ = o, m = Oe(() => _.filters ? _.filters.filter((J) => J.model) : []), w = Oe(() => {
      const J = {};
      return m.value.forEach((G) => {
        J[G.key] = G.model;
      }), J;
    }), C = Ph.debounce(() => {
      a(li.FILTER_CHANGE, w);
    }, 800);
    function R() {
      a(li.CLEAR_FILTERS), document.activeElement.blur();
    }
    return (J, G) => (h(), x("div", {
      class: We(["base-table-filters", { inactive: o.inactive }])
    }, [
      f("h6", Rh, [
        Y(S(Ot), {
          class: "mr-5",
          icon: "bi-funnel-fill"
        }),
        G[1] || (G[1] = nt(" Filters "))
      ]),
      er(J.$slots, "customFields", {}, void 0, !0),
      (h(!0), x(ge, null, Ae(o.filters, (z, K) => (h(), x(ge, null, [
        z.type === "datetime" || z.type === "datetimehour" ? (h(), pe(S(x0), {
          class: "filter-elm",
          key: `${o.prefix}${z.key}`,
          label: z.value,
          disabled: o.filters[K].disabled,
          modelValue: o.filters[K].model,
          "onUpdate:modelValue": (H) => o.filters[K].model = H,
          onInput: S(C)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"])) : z.dataSource ? (h(), pe(S(Ft), {
          class: "filter-elm",
          key: `${o.prefix}${z.key}`,
          options: z.key === "campaign" ? J.campaignlist : z.dataSource,
          label: z.value,
          disabled: o.filters[K].disabled,
          singleSelect: !1,
          modelValue: o.filters[K].model,
          "onUpdate:modelValue": (H) => o.filters[K].model = H,
          onClick: (H) => J.filterClicked(z.key),
          onInput: S(C)
        }, null, 8, ["options", "label", "disabled", "modelValue", "onUpdate:modelValue", "onClick", "onInput"])) : (h(), pe(S($t), {
          type: "text",
          class: "filter-elm",
          key: `${o.prefix}${z.key}`,
          label: z.value,
          disabled: o.filters[K].disabled,
          modelValue: o.filters[K].model,
          "onUpdate:modelValue": (H) => o.filters[K].model = H,
          onInput: S(C)
        }, null, 8, ["label", "disabled", "modelValue", "onUpdate:modelValue", "onInput"]))
      ], 64))), 256)),
      Y(S(ct), {
        type: "tertiary",
        label: "Clear filters",
        onClick: G[0] || (G[0] = (z) => R())
      })
    ], 2));
  }
}, Mh = /* @__PURE__ */ Ke(Gh, [["__scopeId", "data-v-4191254b"]]), Uh = {
  __name: "UiIntersectionObserver",
  props: { options: Object },
  emits: ["intersecting"],
  setup(o, { emit: I }) {
    const a = I, m = o.options || {}, w = new IntersectionObserver(([R]) => {
      a("intersecting", R.isIntersecting);
    }, m), C = N(null);
    return wn(() => {
      C.value && w.observe(C.value);
    }), rh(() => {
      w.disconnect();
    }), (R, J) => (h(), x("div", {
      ref_key: "targetELement",
      ref: C,
      class: "observer",
      style: { height: "3px" }
    }, [
      er(R.$slots, "default")
    ], 512));
  }
}, _0 = "data:image/svg+xml,%3csvg%20width='161'%20height='161'%20viewBox='0%200%20161%20161'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='80.5'%20cy='80.5'%20r='80'%20fill='%23E0EBFF'/%3e%3cpath%20d='M134.325%2081.3329C134.68%2080.0166%20136.629%2080.0166%20136.984%2081.3329L137.169%2082.0227C137.298%2082.5005%20137.695%2082.8691%20138.197%2082.9776L138.584%2083.0613C140.012%2083.37%20140.012%2085.3214%20138.584%2085.6301L138.197%2085.7138C137.695%2085.8223%20137.298%2086.1909%20137.169%2086.6687L136.984%2087.3585C136.629%2088.6748%20134.68%2088.6748%20134.325%2087.3585L134.139%2086.6687C134.011%2086.1909%20133.614%2085.8223%20133.112%2085.7138L132.725%2085.6301C131.297%2085.3214%20131.297%2083.37%20132.725%2083.0613L133.112%2082.9776C133.614%2082.8691%20134.011%2082.5005%20134.139%2082.0227L134.325%2081.3329Z'%20fill='%230A2FFF'/%3e%3cellipse%20cx='141.808'%20cy='72.3457'%20rx='1.9999'%20ry='2'%20fill='%2385A3FF'/%3e%3cpath%20d='M74.8387%209.6568C75.2822%208.01153%2077.7182%208.01154%2078.1616%209.65681L78.394%2010.5191C78.5549%2011.1163%2079.0506%2011.5771%2079.678%2011.7127L80.1617%2011.8173C81.9465%2012.2032%2081.9465%2014.6425%2080.1617%2015.0284L79.678%2015.133C79.0506%2015.2686%2078.5549%2015.7294%2078.394%2016.3266L78.1616%2017.1889C77.7182%2018.8342%2075.2822%2018.8342%2074.8387%2017.1889L74.6064%2016.3266C74.4454%2015.7294%2073.9498%2015.2686%2073.3223%2015.133L72.8386%2015.0284C71.0538%2014.6425%2071.0538%2012.2032%2072.8386%2011.8173L73.3223%2011.7127C73.9498%2011.5771%2074.4454%2011.1163%2074.6064%2010.5191L74.8387%209.6568Z'%20fill='%2385A3FF'/%3e%3ccircle%20cx='87.5'%20cy='20.8076'%20r='2'%20fill='%230A2FFF'/%3e%3ccircle%20cx='17.1162'%20cy='56.1924'%20r='2'%20fill='%23C2D4FF'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter0_f_953_1687)'%3e%3crect%20x='16.5'%20y='69.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='16.5'%20y='66.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='46.5'%20y='72.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='46.5'%20y='82.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='31.5'%20cy='80.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M31.502%2075.675C31.6724%2075.675%2031.8282%2075.7713%2031.9044%2075.9238L33.1754%2078.4656L36.1953%2078.9302C36.3629%2078.956%2036.5018%2079.0738%2036.5546%2079.235C36.6073%2079.3962%2036.565%2079.5733%2036.4451%2079.6932L34.3564%2081.7819L34.8217%2084.8065C34.8475%2084.9742%2034.7768%2085.1421%2034.6388%2085.2408C34.5009%2085.3396%2034.3192%2085.3524%2034.1688%2085.2739L31.502%2083.8825L28.8351%2085.2739C28.6847%2085.3524%2028.503%2085.3396%2028.3651%2085.2408C28.2271%2085.1421%2028.1564%2084.9742%2028.1822%2084.8065L28.6475%2081.7819L26.5588%2079.6932C26.4389%2079.5733%2026.3966%2079.3962%2026.4493%2079.235C26.5021%2079.0738%2026.641%2078.956%2026.8086%2078.9302L29.8285%2078.4656L31.0995%2075.9238C31.1757%2075.7713%2031.3315%2075.675%2031.502%2075.675ZM31.502%2077.1313L30.5295%2079.0763C30.4642%2079.2068%2030.3397%2079.2976%2030.1954%2079.3198L27.8231%2079.6847L29.4452%2081.3068C29.5465%2081.4081%2029.5935%2081.5517%2029.5717%2081.6934L29.2069%2084.0648L31.2938%2082.976C31.4242%2082.9079%2031.5797%2082.9079%2031.7101%2082.976L33.797%2084.0648L33.4322%2081.6934C33.4104%2081.5517%2033.4574%2081.4081%2033.5587%2081.3068L35.1808%2079.6847L32.8085%2079.3198C32.6643%2079.2976%2032.5397%2079.2068%2032.4744%2079.0763L31.502%2077.1313Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter1_f_953_1687)'%3e%3crect%20x='33.5'%20y='103.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='100.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='106.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='116.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='114.5'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%20109.675C48.6724%20109.675%2048.8282%20109.771%2048.9044%20109.924L50.1754%20112.466L53.1953%20112.93C53.3629%20112.956%2053.5018%20113.074%2053.5546%20113.235C53.6073%20113.396%2053.565%20113.573%2053.4451%20113.693L51.3564%20115.782L51.8217%20118.807C51.8475%20118.974%2051.7768%20119.142%2051.6388%20119.241C51.5009%20119.34%2051.3192%20119.352%2051.1688%20119.274L48.502%20117.883L45.8351%20119.274C45.6847%20119.352%2045.503%20119.34%2045.3651%20119.241C45.2271%20119.142%2045.1564%20118.974%2045.1822%20118.807L45.6475%20115.782L43.5588%20113.693C43.4389%20113.573%2043.3966%20113.396%2043.4493%20113.235C43.5021%20113.074%2043.641%20112.956%2043.8086%20112.93L46.8285%20112.466L48.0995%20109.924C48.1757%20109.771%2048.3315%20109.675%2048.502%20109.675ZM48.502%20111.131L47.5295%20113.076C47.4642%20113.207%2047.3397%20113.298%2047.1954%20113.32L44.8231%20113.685L46.4452%20115.307C46.5465%20115.408%2046.5935%20115.552%2046.5717%20115.693L46.2069%20118.065L48.2938%20116.976C48.4242%20116.908%2048.5797%20116.908%2048.7101%20116.976L50.797%20118.065L50.4322%20115.693C50.4104%20115.552%2050.4574%20115.408%2050.5587%20115.307L52.1808%20113.685L49.8085%20113.32C49.6643%20113.298%2049.5397%20113.207%2049.4744%20113.076L48.502%20111.131Z'%20fill='%23F8F9FB'/%3e%3cg%20opacity='0.5'%20filter='url(%23filter2_f_953_1687)'%3e%3crect%20x='33.5'%20y='35.5'%20width='100'%20height='25'%20rx='4'%20fill='%230014CC'/%3e%3c/g%3e%3crect%20x='33.5'%20y='32.5'%20width='100'%20height='28'%20rx='4'%20fill='white'/%3e%3crect%20x='63.5'%20y='38.5'%20width='28'%20height='6'%20rx='1'%20fill='%2385A3FF'/%3e%3crect%20x='63.5'%20y='48.5'%20width='64'%20height='6'%20rx='1'%20fill='%23E0EBFF'/%3e%3cellipse%20cx='48.5'%20cy='46.5002'%20rx='9'%20ry='9.00016'%20fill='%230014CC'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M48.502%2041.675C48.6724%2041.675%2048.8282%2041.7713%2048.9044%2041.9238L50.1754%2044.4656L53.1953%2044.9302C53.3629%2044.956%2053.5018%2045.0738%2053.5546%2045.235C53.6073%2045.3962%2053.565%2045.5733%2053.4451%2045.6932L51.3564%2047.7819L51.8217%2050.8065C51.8475%2050.9742%2051.7768%2051.1421%2051.6388%2051.2408C51.5009%2051.3396%2051.3192%2051.3524%2051.1688%2051.2739L48.502%2049.8825L45.8351%2051.2739C45.6847%2051.3524%2045.503%2051.3396%2045.3651%2051.2408C45.2271%2051.1421%2045.1564%2050.9742%2045.1822%2050.8065L45.6475%2047.7819L43.5588%2045.6932C43.4389%2045.5733%2043.3966%2045.3962%2043.4493%2045.235C43.5021%2045.0738%2043.641%2044.956%2043.8086%2044.9302L46.8285%2044.4656L48.0995%2041.9238C48.1757%2041.7713%2048.3315%2041.675%2048.502%2041.675ZM48.502%2043.1313L47.5295%2045.0763C47.4642%2045.2068%2047.3397%2045.2976%2047.1954%2045.3198L44.8231%2045.6847L46.4452%2047.3068C46.5465%2047.4081%2046.5935%2047.5517%2046.5717%2047.6934L46.2069%2050.0648L48.2938%2048.976C48.4242%2048.9079%2048.5797%2048.9079%2048.7101%2048.976L50.797%2050.0648L50.4322%2047.6934C50.4104%2047.5517%2050.4574%2047.4081%2050.5587%2047.3068L52.1808%2045.6847L49.8085%2045.3198C49.6643%2045.2976%2049.5397%2045.2068%2049.4744%2045.0763L48.502%2043.1313Z'%20fill='%23F8F9FB'/%3e%3ccircle%20cx='80.5'%20cy='144.039'%20r='3'%20fill='%2385A3FF'/%3e%3cdefs%3e%3cfilter%20id='filter0_f_953_1687'%20x='6.5'%20y='59.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter1_f_953_1687'%20x='23.5'%20y='93.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3cfilter%20id='filter2_f_953_1687'%20x='23.5'%20y='25.5'%20width='120'%20height='45'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='5'%20result='effect1_foregroundBlur_953_1687'/%3e%3c/filter%3e%3c/defs%3e%3c/svg%3e", Wh = { class: "query-builder" }, Nh = { class: "query-conditions" }, qh = { class: "condition" }, zh = { class: "cell field" }, Hh = { class: "cell operator" }, Qh = { class: "cell value" }, Kh = {
  key: 0,
  class: "query-operator-outer"
}, Yh = { class: "query-operator" }, Zh = {
  key: 0,
  class: "query-operator-outer"
}, Jh = { class: "query-operator" }, Xh = {
  __name: "StandardQueryDisplay",
  props: {
    query: {
      type: Array,
      required: !0
    }
  },
  setup(o) {
    const I = (_) => {
      try {
        return new Date(_).toISOString().split("T")[0];
      } catch {
        return "-";
      }
    }, a = (_) => {
      const m = _ == null ? void 0 : _.value;
      return m ? _.type === "date" ? I(m) : Array.isArray(m) ? m.join(", ") : typeof m == "boolean" ? m ? "True" : "False" : m : "-";
    };
    return (_, m) => (h(), x("div", Wh, [
      f("div", Nh, [
        m[0] || (m[0] = f("h6", null, "QUERY CONDITIONS", -1)),
        (h(!0), x(ge, null, Ae(o.query, (w, C) => (h(), x("div", {
          key: `group-${C}`,
          class: "query-group"
        }, [
          (h(!0), x(ge, null, Ae(w.conditions, (R, J) => (h(), x("div", {
            key: `condition-${J}`
          }, [
            f("div", qh, [
              f("div", zh, ie(R.field), 1),
              f("div", Hh, ie(R.operator), 1),
              f("div", Qh, ie(a(R)), 1),
              Y(S(ct), {
                type: "tertiary",
                icon: "bi-arrows-expand"
              })
            ]),
            J < w.conditions.length - 1 ? (h(), x("div", Kh, [
              f("div", Yh, ie(w.logic.replace("$", "").toUpperCase()), 1)
            ])) : B("", !0)
          ]))), 128)),
          C < o.query.length - 1 ? (h(), x("div", Zh, [
            f("div", Jh, ie(o.query[C + 1].logic.replace("$", "").toUpperCase()), 1)
          ])) : B("", !0)
        ]))), 128))
      ])
    ]));
  }
}, jh = /* @__PURE__ */ Ke(Xh, [["__scopeId", "data-v-a3525c2e"]]), e2 = { class: "info-card" }, t2 = { class: "segments" }, n2 = { class: "segment-img-wrapper" }, i2 = ["src", "title"], r2 = { class: "segment-info" }, a2 = {
  __name: "MainInfoCard",
  props: {
    segmentData: {
      type: Object,
      required: !0
    },
    isThumbnail: {
      type: Boolean,
      default: !1
    }
  },
  setup(o) {
    const I = o;
    function a(m) {
      const w = [];
      return m.coreEngagement && w.push(`Core Engagement: ${m.coreEngagement}`), m.coreFocus && w.push(`Core Focus: ${m.coreFocus}`), w.length > 0 ? w.join(`
`) : "No information available";
    }
    const _ = Oe(() => !I.segmentData || !I.segmentData.segments ? [] : I.isThumbnail ? I.segmentData.segments.slice(0, 5) : I.segmentData.segments);
    return (m, w) => (h(), x("div", e2, [
      w[2] || (w[2] = f("h5", { class: "mb-3" }, "Top Interests", -1)),
      f("div", t2, [
        (h(!0), x(ge, null, Ae(_.value, (C) => (h(), x("div", {
          class: "segment",
          key: C.name
        }, [
          f("div", n2, [
            f("img", {
              src: C.image,
              alt: "segment",
              title: a(C)
            }, null, 8, i2)
          ]),
          f("div", r2, [
            f("h4", null, ie(C.name), 1),
            f("p", null, [
              w[0] || (w[0] = f("span", null, "Est. Reach:", -1)),
              nt(" " + ie(C.reach) + " ", 1),
              Y(S(d0), {
                class: "pl-1",
                label: "This is the number of people you can potentially reach through paid media platforms who share similar traits with your first-party audience."
              })
            ]),
            f("p", null, [
              w[1] || (w[1] = f("span", null, "Affinity Score: ", -1)),
              nt(" " + ie(C.affinityScore), 1),
              Y(S(d0), {
                class: "pl-1",
                label: "A score of 158 means this persona is 58% more likely than average to be interested in your brand. It reflects behavioral and interest similarity to your seeded 1PD audience."
              })
            ])
          ])
        ]))), 128))
      ])
    ]));
  }
}, s2 = /* @__PURE__ */ Ke(a2, [["__scopeId", "data-v-9536e493"]]), l2 = { class: "segment-details-insigts mt-4" }, o2 = { class: "insights-title-wrapper" }, u2 = { class: "mt-3" }, c2 = { class: "query-result" }, d2 = {
  __name: "ThumbnailCard",
  props: {
    location: {
      type: String,
      required: !0
    },
    selectedSegment: {
      type: Object,
      required: !0
    }
  },
  emits: ["showInsightsExplorer"],
  setup(o, { emit: I }) {
    const a = o;
    cn(), Oe(() => {
      var m, w, C;
      return {
        chart: {
          type: "bar",
          height: 550,
          stacked: !0,
          toolbar: { show: !1 }
        },
        plotOptions: {
          bar: { horizontal: !0 }
        },
        xaxis: {
          categories: ((w = (m = a.selectedSegment.thumbnail) == null ? void 0 : m.graph) == null ? void 0 : w.labels) || []
        },
        colors: [
          "#0A2FFF",
          "#0068AD"
        ],
        title: {
          text: ((C = a.selectedSegment.thumbnail) == null ? void 0 : C.title) || "",
          align: "left",
          style: {
            fontSize: "16px",
            fontWeight: "bold"
          }
        },
        legend: {
          position: "bottom"
        }
      };
    }), Oe(() => {
      var m, w, C;
      return ((C = (w = (m = a.selectedSegment.thumbnail) == null ? void 0 : m.graph) == null ? void 0 : w.seriesCombined) == null ? void 0 : C.map((R) => ({
        name: R.name,
        data: R.data.map(Number)
      }))) || [];
    });
    const _ = Oe(() => {
      var m, w, C, R;
      return ((R = (C = (w = (m = a.selectedSegment.thumbnail) == null ? void 0 : m.segments) == null ? void 0 : w[0]) == null ? void 0 : C.segments) == null ? void 0 : R.slice(0, 2)) || [];
    });
    return Oe(() => _.value.map((C) => parseFloat(C.affinityScore || "0")).reduce((C, R) => C + R, 0).toFixed(2)), Oe(() => _.value.map((w) => parseInt(w.reach || "0", 10)).reduce((w, C) => w + C, 0).toLocaleString()), (m, w) => {
      const C = g0("CataUiTooltip");
      return h(), x("div", null, [
        f("div", l2, [
          f("div", o2, [
            w[1] || (w[1] = f("h6", { class: "insights-title mr-1" }, "DELIVERED BY OPEN INTELLIGENCE", -1)),
            f("p", u2, [
              w[0] || (w[0] = nt("Find the segments that work best with ")),
              f("span", c2, ie(a.selectedSegment.name), 1)
            ]),
            Y(C, { label: "The preview is for your external proofing tool." })
          ])
        ])
      ]);
    };
  }
}, f2 = /* @__PURE__ */ Ke(d2, [["__scopeId", "data-v-54823e41"]]), p2 = { class: "modal-body" }, h2 = { class: "section" }, m2 = { class: "checkbox-group" }, g2 = { class: "checkbox-group" }, x2 = { class: "sections-wrapper" }, y2 = { class: "section" }, k2 = { class: "checkbox-group-catergory" }, v2 = { class: "section" }, _2 = { class: "ccheckbox-group-catergory" }, b2 = { class: "section" }, E2 = { class: "checkbox-group-category" }, S2 = {
  __name: "PushModal",
  emits: ["close", "insertSegment"],
  setup(o, { emit: I }) {
    const a = I, _ = N([]), m = ["META", "Google", "TikTok", "Snapchat", "LinkedIn"], w = ["Build new campaign", "Update current campaign"], C = ["Display & Video 360", "The Trade Desk"], R = ["Infosum", "LiveRamp"], J = ["Open Media Studio", "Audience Builder"];
    function G() {
      a("close");
    }
    const z = () => {
      a("insertSegment"), G();
    };
    return (K, H) => {
      const L = g0("hp");
      return h(), pe(S(y0), {
        onClose: G,
        size: "medium"
      }, {
        header: Vt(() => H[5] || (H[5] = [
          f("h4", { class: "push-header" }, "Push to destination(s)", -1)
        ])),
        body: Vt(() => [
          f("div", p2, [
            f("div", h2, [
              Y(L, null, {
                default: Vt(() => H[6] || (H[6] = [
                  nt("Direct Push / 1:1 audience sync")
                ])),
                _: 1
              }),
              f("div", m2, [
                (h(), x(ge, null, Ae(m, (A) => Y(S(Sn), {
                  key: A,
                  label: A,
                  modelValue: _.value,
                  "onUpdate:modelValue": H[0] || (H[0] = (D) => _.value = D),
                  value: A
                }, null, 8, ["label", "modelValue", "value"])), 64))
              ])
            ]),
            H[10] || (H[10] = f("hr", null, null, -1)),
            f("div", g2, [
              (h(), x(ge, null, Ae(w, (A) => Y(S(Sn), {
                key: A,
                label: A,
                modelValue: _.value,
                "onUpdate:modelValue": H[1] || (H[1] = (D) => _.value = D),
                value: A
              }, null, 8, ["label", "modelValue", "value"])), 64))
            ]),
            f("div", x2, [
              f("div", y2, [
                H[7] || (H[7] = f("h3", null, "Cohort", -1)),
                f("div", k2, [
                  (h(), x(ge, null, Ae(C, (A) => Y(S(Sn), {
                    key: A,
                    label: A,
                    modelValue: _.value,
                    "onUpdate:modelValue": H[2] || (H[2] = (D) => _.value = D),
                    value: A
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              f("div", v2, [
                H[8] || (H[8] = f("h3", null, "Clean Room", -1)),
                f("div", _2, [
                  (h(), x(ge, null, Ae(R, (A) => Y(S(Sn), {
                    key: A,
                    label: A,
                    modelValue: _.value,
                    "onUpdate:modelValue": H[3] || (H[3] = (D) => _.value = D),
                    value: A
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ]),
              f("div", b2, [
                H[9] || (H[9] = f("h3", null, "WPP Open", -1)),
                f("div", E2, [
                  (h(), x(ge, null, Ae(J, (A) => Y(S(Sn), {
                    key: A,
                    label: A,
                    modelValue: _.value,
                    "onUpdate:modelValue": H[4] || (H[4] = (D) => _.value = D),
                    value: A
                  }, null, 8, ["label", "modelValue", "value"])), 64))
                ])
              ])
            ])
          ])
        ]),
        footer: Vt(() => [
          Y(S(ct), {
            class: "mr-2",
            type: "secondary",
            label: "Cancel",
            onClick: G
          }),
          Y(S(ct), {
            type: "primary",
            label: "Push",
            onClick: z
          })
        ]),
        _: 1
      });
    };
  }
}, A2 = /* @__PURE__ */ Ke(S2, [["__scopeId", "data-v-44c63bbf"]]), w2 = [
  {
    title: "Dynamics of Royal Canin Maxi Adult Wet Food in Recent Days",
    section: "dynamics",
    description: "Daily interaction patterns with Royal Canin Maxi Adult Wet Food over the past 18 days",
    type: "area",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "2025-03-01",
        keyType: "date",
        value: 150,
        valueType: "purchases"
      },
      {
        key: "2025-03-02",
        keyType: "date",
        value: 170,
        valueType: "purchases"
      }
    ]
  },
  {
    title: "Day-parting for Royal Canin Maxi Adult Wet Food",
    section: "dayparting",
    description: "Purchasing behavior segmented by time of day",
    type: "bar",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "00:00",
        keyType: "hour",
        value: 20,
        valueType: "purchases"
      },
      {
        key: "01:00",
        keyType: "hour",
        value: 40,
        valueType: "purchases"
      }
    ]
  },
  {
    title: "Age Distribution",
    section: "audience",
    description: "Percentage of purchases across age ranges",
    type: "bar",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "18-24",
        keyType: "range",
        value: 12,
        valueType: "percentage"
      },
      {
        key: "25-34",
        keyType: "range",
        value: 24,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Gender Distribution",
    section: "audience",
    description: "Share of male and female audiences",
    type: "donut",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "Male",
        keyType: "gender",
        value: 60,
        valueType: "percentage"
      },
      {
        key: "Female",
        keyType: "gender",
        value: 40,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Preferred Purchase Channels",
    section: "consumer_preferences",
    description: "Breakdown of where consumers prefer to purchase pet products",
    type: "bar",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "Supermarkets",
        keyType: "channel",
        value: 40,
        valueType: "percentage"
      },
      {
        key: "Online Pet Stores",
        keyType: "channel",
        value: 25,
        valueType: "percentage"
      },
      {
        key: "Vet Clinics",
        keyType: "channel",
        value: 15,
        valueType: "percentage"
      },
      {
        key: "Specialty Pet Stores",
        keyType: "channel",
        value: 20,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Lifestyle Agreement Statements",
    section: "psychographics",
    description: "Agreement levels with lifestyle and pet care statements",
    type: "bar",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "Pets are part of my family",
        keyType: "statement",
        value: 90,
        valueType: "agreement"
      },
      {
        key: "I prefer premium pet food",
        keyType: "statement",
        value: 65,
        valueType: "agreement"
      },
      {
        key: "I shop eco-consciously",
        keyType: "statement",
        value: 55,
        valueType: "agreement"
      }
    ]
  },
  {
    title: "Generation Breakdown",
    section: "audience",
    description: "Generational segmentation of the target audience",
    type: "donut",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "Gen Z",
        keyType: "generation",
        value: 20,
        valueType: "percentage"
      },
      {
        key: "Millennials",
        keyType: "generation",
        value: 45,
        valueType: "percentage"
      },
      {
        key: "Gen X",
        keyType: "generation",
        value: 25,
        valueType: "percentage"
      },
      {
        key: "Boomers",
        keyType: "generation",
        value: 10,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Education Level Distribution",
    section: "education",
    description: "Audience educational attainment levels",
    type: "bar",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "High School",
        keyType: "education",
        value: 25,
        valueType: "percentage"
      },
      {
        key: "Bachelor's Degree",
        keyType: "education",
        value: 45,
        valueType: "percentage"
      },
      {
        key: "Master's Degree",
        keyType: "education",
        value: 20,
        valueType: "percentage"
      },
      {
        key: "PhD",
        keyType: "education",
        value: 10,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Life Events in the Last 12 Months",
    section: "life_events",
    description: "Significant life changes experienced in the past year",
    type: "pie",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "Moved Home",
        keyType: "event",
        value: 20,
        valueType: "percentage"
      },
      {
        key: "Changed Jobs",
        keyType: "event",
        value: 30,
        valueType: "percentage"
      },
      {
        key: "Got a Pet",
        keyType: "event",
        value: 50,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Working Status",
    section: "work",
    description: "Employment situation of audience members",
    type: "bar",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "Employed Full-time",
        keyType: "work",
        value: 60,
        valueType: "percentage"
      },
      {
        key: "Self-employed",
        keyType: "work",
        value: 15,
        valueType: "percentage"
      },
      {
        key: "Unemployed",
        keyType: "work",
        value: 10,
        valueType: "percentage"
      },
      {
        key: "Retired",
        keyType: "work",
        value: 15,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Personality Archetypes",
    section: "personality",
    description: "Dominant personality traits across audience",
    type: "pie",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "Explorer",
        keyType: "archetype",
        value: 35,
        valueType: "percentage"
      },
      {
        key: "Caregiver",
        keyType: "archetype",
        value: 40,
        valueType: "percentage"
      },
      {
        key: "Achiever",
        keyType: "archetype",
        value: 25,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Regional Breakdown",
    section: "region",
    description: "Regional distribution of purchases",
    type: "bar",
    source: "WPP Open Intelligence",
    data: [
      {
        key: "North America",
        keyType: "region",
        value: 45,
        valueType: "percentage"
      },
      {
        key: "Europe",
        keyType: "region",
        value: 30,
        valueType: "percentage"
      },
      {
        key: "Asia",
        keyType: "region",
        value: 25,
        valueType: "percentage"
      }
    ]
  },
  {
    title: "Keyword Map for Pet Owners",
    section: "keywords",
    description: "Keyword performance visualized by impressions and reach",
    type: "bubble",
    source: "WPP Open Intelligence",
    data: [
      {
        x: 10,
        y: 200,
        z: 5
      },
      {
        x: 20,
        y: 400,
        z: 8
      },
      {
        x: 30,
        y: 600,
        z: 10
      },
      {
        x: 40,
        y: 800,
        z: 12
      },
      {
        x: 50,
        y: 1200,
        z: 18
      },
      {
        x: 60,
        y: 1600,
        z: 25
      },
      {
        x: 70,
        y: 1700,
        z: 28
      },
      {
        x: 80,
        y: 1800,
        z: 30
      },
      {
        x: 90,
        y: 200,
        z: 35
      },
      {
        x: 100,
        y: 250,
        z: 40
      },
      {
        x: 110,
        y: 2700,
        z: 45
      },
      {
        x: 120,
        y: 290,
        z: 50
      },
      {
        x: 130,
        y: 3200,
        z: 55
      },
      {
        x: 140,
        y: 350,
        z: 60
      },
      {
        x: 150,
        y: 3700,
        z: 65
      }
    ]
  }
], C2 = {
  charts: w2
}, Ta = {
  colors: [
    "#0A2FFF",
    // cat-1-dark (vivid blue)
    "#0068AD",
    // cat-2-dark (deep blue)
    "#0E8677",
    // cat-3-dark (teal)
    "#12871C",
    // cat-4-dark (green)
    "#A36F05",
    // cat-5-dark (mustard/golden brown)
    "#CC4B00",
    // cat-6-dark (orange-red)
    "#D11534",
    // cat-7-dark (strong red)
    "#B41880",
    // cat-8-dark (magenta)
    "#832EEA",
    // cat-9-dark (purple)
    "#646C72"
    // cat-10-dark (slate gray)
  ],
  theme: {
    mode: "light",
    monochrome: { enabled: !1 }
    // default to off
  },
  tooltip: {
    theme: "light"
  },
  grid: {
    borderColor: "#E4E4E7",
    strokeDashArray: 4
  },
  dataLabels: {
    enabled: !0,
    style: {
      fontFamily: "Inter, sans-serif"
    }
  }
}, Da = {
  colors: [
    "#85A3FF",
    // light blue-violet
    "#7AB6FF",
    // blue
    "#45E4B6",
    // turquoise
    "#6CE07B",
    // light green
    "#ECC706",
    // yellow
    "#FF9E66",
    // orange
    "#FF7A94",
    // coral pink
    "#ED78C6",
    // magenta-pink
    "#B482F3",
    // lavender-purple
    "#ABB1B5"
    // soft gray
  ],
  theme: {
    mode: "light",
    monochrome: { enabled: !1 }
    // default to off
  },
  tooltip: {
    theme: "light"
  },
  grid: {
    borderColor: "#E4E4E7",
    strokeDashArray: 4
  },
  dataLabels: {
    enabled: !0,
    style: {
      fontFamily: "Inter, sans-serif"
    }
  }
}, Fa = {
  area: {
    ...Ta,
    chart: {
      type: "area",
      background: "#ffffff",
      height: 350,
      zoom: { enabled: !0, type: "x", autoScaleYaxis: !0 },
      toolbar: { show: !0, tools: { zoom: !0, zoomin: !0, zoomout: !0, reset: !0 } }
    },
    stroke: { curve: "smooth", width: 2, colors: ["#1E40AF"] },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        gradientToColors: ["#60A5FA"]
      }
    },
    grid: {
      borderColor: "#E4E4E7",
      strokeDashArray: 4,
      xaxis: { lines: { show: !0 } },
      yaxis: { lines: { show: !0 } }
    },
    tooltip: { theme: "light", shared: !0, intersect: !1 },
    dataLabels: { enabled: !0 }
  },
  vertical: {
    ...Ta,
    chart: {
      type: "bar",
      background: "#ffffff",
      zoom: { enabled: !0 },
      toolbar: { show: !0 },
      scrollable: !0
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        distributed: !0
        // dataLabels: { position: 'top' },
      }
    },
    xaxis: {
      labels: { show: !0 }
    },
    dataLabels: { enabled: !1 },
    grid: {
      borderColor: "#E4E4E7",
      strokeDashArray: 4
    },
    tooltip: { theme: "light" }
  },
  bar: {
    ...Ta,
    chart: {
      type: "bar",
      background: "#ffffff",
      zoom: { enabled: !0 },
      toolbar: { show: !0 },
      scrollable: !0
    },
    plotOptions: {
      bar: {
        horizontal: !0,
        distributed: !0
        // dataLabels: { position: 'top' },
      }
    },
    xaxis: {
      labels: { show: !0 }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "Inter",
          colors: "#6B7280"
        }
      }
    },
    dataLabels: { enabled: !1 },
    grid: {
      borderColor: "#E4E4E7",
      strokeDashArray: 4
    },
    colors: [
      "#1E40AF",
      "#3B82F6",
      "#60A5FA",
      "#A5B4FC",
      "#CBD5E1",
      "#64748B",
      "#94A3B8",
      "#E2E8F0",
      "#D1D5DB"
    ],
    tooltip: { theme: "light" }
  },
  donut: {
    ...Da,
    chart: {
      type: "donut",
      background: "#ffffff",
      toolbar: { show: !0 }
    },
    dataLabels: { enabled: !0 },
    tooltip: { theme: "light" }
  },
  pie: {
    ...Da,
    chart: {
      type: "pie",
      background: "#ffffff",
      toolbar: { show: !0 }
    },
    stroke: {
      show: !1,
      // ✅ removes white gaps
      width: 0,
      colors: "transparent"
    },
    tooltip: { theme: "light" },
    dataLabels: {
      enabled: !0,
      dropShadow: {
        enabled: !1
      }
    },
    plotOptions: {
      pie: {
        expandOnClick: !0
      }
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.9
        }
      }
    }
  },
  bubble: {
    ...Da,
    chart: {
      type: "bubble",
      background: "#ffffff",
      zoom: { enabled: !0 },
      toolbar: { show: !0 }
    },
    fill: {
      type: "solid"
    },
    markers: { strokeWidth: 0 },
    dataLabels: { enabled: !0 },
    tooltip: { theme: "light" },
    xaxis: {
      title: { text: "Impressions" },
      crosshairs: { show: !0 }
    },
    yaxis: {
      title: { text: "Reach" },
      crosshairs: { show: !0 }
    }
  }
}, b0 = {
  "Vertical bars": "bar",
  // Rendered as vertical bars
  "Horizontal bars": "bar",
  // ApexCharts uses same 'bar', direction set via options
  Pie: "pie",
  // Pie chart
  Donut: "donut",
  // (not in your current data but optional support)
  Area: "area",
  // (if needed in the future)
  Line: "line",
  // (if needed in the future)
  Bubble: "bubble"
  // (if needed in the future)
}, T2 = { class: "segment-details" }, D2 = { class: "wrapper-left" }, I2 = { class: "source-wrapper" }, L2 = { class: "source-container" }, B2 = { class: "sub-controls" }, F2 = { class: "sub-tab-container" }, $2 = { class: "sub-controls-tabs" }, V2 = { class: "sub-controls-tools" }, O2 = { class: "list" }, P2 = {
  key: 0,
  class: "d-flex justify-content-center pt-40 pb-40"
}, R2 = { class: "wrapper-right" }, G2 = {
  key: 0,
  class: "segment-details-wrapper"
}, M2 = {
  key: 0,
  class: "segment-details-title"
}, U2 = { class: "segment-details-content" }, W2 = {
  key: 0,
  class: "description-row"
}, N2 = { class: "description-detail" }, q2 = {
  key: 1,
  class: "description-row"
}, z2 = { class: "description-detail" }, H2 = {
  key: 2,
  class: "description-row"
}, Q2 = { class: "description-detail" }, K2 = {
  key: 3,
  class: "description-row"
}, Y2 = { class: "description-detail" }, Z2 = {
  key: 4,
  class: "description-row"
}, J2 = { class: "description-detail" }, X2 = {
  key: 5,
  class: "description-row"
}, j2 = { class: "description-detail" }, em = {
  key: 6,
  class: "description-row"
}, tm = { class: "description-detail" }, nm = {
  key: 7,
  class: "description-row"
}, im = { class: "description-detail" }, rm = {
  key: 8,
  class: "description-row"
}, am = { class: "description-detail-bold" }, sm = {
  key: 0,
  class: "description-detail"
}, lm = { class: "description-row" }, om = { class: "description-term" }, um = { class: "description-detail" }, cm = {
  key: 1,
  class: "standard-view"
}, dm = ["src"], fm = {
  key: 0,
  class: "footer"
}, pm = { class: "footer-text" }, hm = { class: "footer-description-detail" }, mm = {
  __name: "StandardSegments",
  props: {
    baseUrl: {
      default: "https://sm-standard-segments-838902823068.europe-west2.run.app",
      type: String,
      required: !0
    },
    tenantId: {
      default: "",
      type: String,
      required: !0
    },
    brandId: {
      default: "1",
      type: String,
      required: !0
    },
    token: {
      default: "",
      type: String,
      required: !0
    },
    selectedSegment: {
      default: null,
      type: Object,
      required: !1
    },
    currentlySelectedSegment: {
      default: null,
      type: Object,
      required: !1
    }
  },
  emits: ["insertSegment", "showInsightsExplorer"],
  setup(o, { emit: I }) {
    const a = o, _ = I;
    N([]);
    const m = cn(), w = N(null), C = N(null), R = N(!1), J = N([]), G = N(""), z = N([]), K = N(""), H = N(""), L = N(!1), A = [
      {
        id: 1,
        label: "All"
      },
      {
        id: 4,
        label: "Popular"
      },
      {
        id: 3,
        label: "Recently Used"
      },
      {
        id: 2,
        label: "New"
      }
    ], D = [
      // {
      //     id: 1,
      //     label: 'Insights',
      // },
      {
        id: 2,
        label: "Query"
      }
    ], Z = N(A[0]), ye = N(D[0]), he = N(!1), ce = N([
      {
        key: "name",
        model: "",
        type: "string",
        value: "Segment Name"
      },
      {
        key: "description",
        model: "",
        type: "string",
        value: "Description"
      },
      {
        key: "count",
        model: "",
        type: "string",
        value: "Last Count"
      },
      {
        key: "status",
        model: "",
        type: "string",
        value: "Status"
      },
      {
        key: "market",
        model: "",
        type: "string",
        value: "Market",
        disabled: !0
      }
    ]), de = [
      {
        key: "name",
        type: "string",
        value: "Label"
      },
      {
        key: "description",
        type: "description",
        value: "Description"
      },
      {
        key: "count",
        type: "number",
        value: "Last Count"
      },
      {
        key: "status",
        type: "status",
        value: "Status"
      },
      {
        key: "type",
        type: "string",
        value: "Type"
      }
    ], q = N({}), $ = N(""), F = N({
      sortColumn: "name",
      sortOrder: 1
    });
    function V() {
      m.set_selectedSegmentType("standard"), m.set_selectedSegment($.value), _("showInsightsExplorer", $.value);
    }
    async function ve() {
      var T;
      if (!((T = $.value) != null && T.segmentId))
        return;
      const U = `${a.baseUrl}/api/v1/segments/${$.value.segmentId}`;
      try {
        const se = await fetch(U, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": a.tenantId,
            "brand-id": a.brandId,
            authorization: `Bearer ${a.token}`
          }
        });
        if (!se.ok) {
          const vt = await se.text();
          throw new Error(vt || "Failed to delete segment");
        }
        $.value = "", await m.fetch_segments(K.value);
      } catch (se) {
        console.error("Error deleting segment:", se);
      }
    }
    function Fe(U) {
      return U.replace(new RegExp("(?<!^)([A-Z])", "g"), " $1").replace(/^./, (T) => T.toUpperCase());
    }
    function Me(U) {
      return U == null ? "" : (typeof U == "string" ? parseInt(U, 10) : U).toLocaleString();
    }
    function Pe(U) {
      q.value = U, m.set_filterQuery(U), m.fetch_segments(K.value);
    }
    async function kt(U) {
      if (U && m.get_isLastPage && !he.value && m.get_segments && m.get_segments.length > 0) {
        he.value = !0;
        try {
          await m.fetch_nextSegmentPage(K.value), he.value = !1;
        } catch {
          he.value = !1;
        }
      }
    }
    async function Pt() {
      ce.value.map((U) => {
        U.key !== "market" && (U.model = "");
      }), m.reset_filterQuery(), await m.fetch_segments(K.value);
    }
    function dn(U) {
      F.value = U;
    }
    function fn() {
      R.value = !R.value;
    }
    function Tt(U) {
      $.value = U.row;
    }
    function ze() {
      L.value = !0;
    }
    async function j() {
      await m.set_token(a.token), await m.set_brandId(a.brandId), await m.set_tenantId(a.tenantId), await m.set_baseUrl(a.baseUrl), a.currentlySelectedSegment && a.currentlySelectedSegment._id ? $.value = a.currentlySelectedSegment : a.selectedSegment && a.selectedSegment._id && ($.value = a.selectedSegment), await m.fetch_segment_settings(a.brandId);
      try {
        const U = await m.get_segment_settings;
        U && (z.value = await U.platforms.map((T) => ({
          value: T.platform_id,
          label: T.platform,
          locations: T.locations.map((se) => ({
            value: se.value,
            label: se.display_name
          }))
        }))), K.value = z.value[0].value;
      } catch (U) {
        console.log(U);
      }
    }
    return wn(() => {
      C.value = w.value, j();
    }), un(K, async (U, T) => {
      U && T !== U && (J.value = z.value[U - 1].locations, G.value = J.value[0].value, he.value = !0, m.set_platform(U), await m.fetch_segments(U), Z.value = A[0], he.value = !1);
    }), un(H, async (U) => {
      U && (U == null ? void 0 : U.length) < 3 || (m.set_searchTerm(U), m.fetch_segments(K.value));
    }), un(G, async (U) => {
      m.set_locationQuery(U), m.fetch_segments(K.value);
    }), un(F, async (U) => {
      m.set_sortQuery(U), m.fetch_segments(K.value);
    }), un(Z, async (U) => {
      const T = U.id;
      m.set_categoryQuery(T), m.fetch_segments();
    }), Oe(() => C2.charts.map((U) => {
      var _t, Rt;
      const T = b0[U.type] || ((_t = U.type) == null ? void 0 : _t.toLowerCase()), se = Fa[T] || {};
      console.log("type", T), console.log("baseOptions", se);
      let vt = {}, Dt = [];
      return T === "line" || T === "area" ? (vt = {
        xaxis: {
          categories: U.data.map((De) => De.key),
          labels: { style: { fontSize: "12px", colors: "#777" } },
          axisBorder: { show: !1 },
          axisTicks: { show: !1 }
        },
        yaxis: {
          labels: {
            style: { fontSize: "12px", colors: "#777" },
            formatter: (De) => De > 1e3 ? `${(De / 1e3).toFixed(1)}K` : De
          }
        }
      }, Dt = [{
        name: ((Rt = U.data[0]) == null ? void 0 : Rt.valueType) || "Value",
        data: U.data.map((De) => Number(De.value))
      }]) : T === "bar" ? (vt = {
        xaxis: {
          categories: U.data.map((De) => De.key)
        }
      }, Dt = [{
        name: U.title,
        data: U.data.map((De) => Number(De.value))
      }]) : T === "donut" || T === "pie" ? (vt = {
        labels: U.data.map((De) => De.key)
      }, Dt = U.data.map((De) => Number(De.value))) : T === "bubble" && (Dt = [{
        name: U.title,
        data: U.data.map((De) => ({
          x: Number(De.x),
          y: Number(De.y),
          z: Number(De.z)
        }))
      }]), console.log("series", Dt), console.log("dynamicOptions", vt), {
        series: Dt,
        options: {
          ...se,
          ...vt,
          title: {
            ...se.title,
            text: U.title
          },
          chart: {
            // ...baseOptions.chart,
            type: T
          }
        },
        chartType: T
      };
    })), (U, T) => (h(), x(ge, null, [
      f("div", T2, [
        f("div", D2, [
          f("div", I2, [
            f("div", L2, [
              Y(S(Ft), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: z.value,
                modelValue: K.value,
                "onUpdate:modelValue": T[0] || (T[0] = (se) => K.value = se),
                label: "Source"
              }, null, 8, ["options", "modelValue"]),
              Y(S(Ft), {
                style: { width: "50%" },
                hasDefaultValue: "",
                class: "source w-100",
                options: J.value,
                modelValue: G.value,
                "onUpdate:modelValue": T[1] || (T[1] = (se) => G.value = se),
                label: "Server Location"
              }, null, 8, ["options", "modelValue"])
            ]),
            Y(S($t), {
              class: "pr-10",
              type: "text",
              icon: "bi-search",
              placeholder: "Search",
              modelValue: H.value,
              "onUpdate:modelValue": T[2] || (T[2] = (se) => H.value = se)
            }, null, 8, ["modelValue"])
          ]),
          f("div", B2, [
            f("div", F2, [
              f("div", $2, [
                Y(S(Ia), {
                  tabs: A,
                  modelValue: Z.value,
                  "onUpdate:modelValue": T[3] || (T[3] = (se) => Z.value = se),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"])
              ]),
              f("div", V2, [
                Y(S(Ot), {
                  icon: "bi-funnel-fill",
                  color: "#4d5358",
                  size: "18px",
                  onClick: T[4] || (T[4] = (se) => fn())
                })
              ])
            ])
          ]),
          f("div", O2, [
            f("div", {
              class: "list-list",
              ref_key: "list",
              ref: w
            }, [
              Y(Oh, {
                stickyHeader: 0,
                columns: de,
                rows: S(m).get_segments,
                selectable: !1,
                sortable: !0,
                maxWidthCell: "200",
                enableSingleSelect: !0,
                onRowClicked: T[5] || (T[5] = (se) => Tt(se)),
                onColumnSorted: T[6] || (T[6] = (se) => dn(se)),
                collapseControls: ""
              }, null, 8, ["rows"]),
              he.value ? (h(), x("div", P2, [
                Y(S(Nn), { size: "xlarge" })
              ])) : B("", !0),
              Y(Uh, {
                options: { rootMargin: "0px 0px 600px 0px" },
                onIntersecting: T[7] || (T[7] = (se) => kt(se))
              })
            ], 512),
            R.value ? (h(), pe(Mh, {
              key: 0,
              filters: ce.value,
              onClearFilters: T[8] || (T[8] = (se) => Pt()),
              onFilterChange: T[9] || (T[9] = (se) => Pe(se))
            }, null, 8, ["filters"])) : B("", !0)
          ])
        ]),
        f("div", R2, [
          f("div", {
            class: We(["outer-wrapper-segment-details", { "standard-empty": !$.value }])
          }, [
            $.value ? (h(), x("div", G2, [
              $.value ? (h(), x("div", M2, ie($.value.name), 1)) : B("", !0),
              T[24] || (T[24] = f("div", { class: "segment-details-subtitle" }, "Segment Details", -1)),
              f("div", U2, [
                $.value.name ? (h(), x("div", W2, [
                  T[15] || (T[15] = f("div", { class: "description-term" }, "Name", -1)),
                  f("div", N2, ie($.value.name), 1)
                ])) : B("", !0),
                $.value.description ? (h(), x("div", q2, [
                  T[16] || (T[16] = f("div", { class: "description-term" }, "Description", -1)),
                  f("div", z2, ie($.value.description), 1)
                ])) : B("", !0),
                $.value.sourceCreatedDate ? (h(), x("div", H2, [
                  T[17] || (T[17] = f("div", { class: "description-term" }, "Created", -1)),
                  f("div", Q2, ie(S(An)($.value.sourceCreatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : B("", !0),
                $.value.sourceUpdatedDate ? (h(), x("div", K2, [
                  T[18] || (T[18] = f("div", { class: "description-term" }, "Updated", -1)),
                  f("div", Y2, ie(S(An)($.value.sourceUpdatedDate).format("YYYY-MM-DD, HH:mm")), 1)
                ])) : B("", !0),
                $.value.status ? (h(), x("div", Z2, [
                  T[19] || (T[19] = f("div", { class: "description-term" }, "Status", -1)),
                  f("div", J2, ie($.value.status.value), 1)
                ])) : B("", !0),
                $.value.expiration_date ? (h(), x("div", X2, [
                  T[20] || (T[20] = f("div", { class: "description-term" }, "Expiration", -1)),
                  f("div", j2, ie($.value.expiration_date), 1)
                ])) : B("", !0),
                $.value.id ? (h(), x("div", em, [
                  T[21] || (T[21] = f("div", { class: "description-term" }, "Segmnent ID", -1)),
                  f("div", tm, ie($.value.id), 1)
                ])) : B("", !0),
                $.value.audience_id ? (h(), x("div", nm, [
                  T[22] || (T[22] = f("div", { class: "description-term" }, "Audience ID", -1)),
                  f("div", im, ie($.value.audience_id), 1)
                ])) : B("", !0),
                $.value.count ? (h(), x("div", rm, [
                  T[23] || (T[23] = f("div", { class: "description-term" }, "Last count", -1)),
                  f("div", am, ie(Me($.value.count)), 1),
                  $.value.refreshCountDate ? (h(), x("span", sm, " (" + ie(S(An)($.value.refreshCountDate).format("YYYY-MM-DD, HH:mm")) + ") ", 1)) : B("", !0)
                ])) : B("", !0),
                $.value.platform_specific ? (h(!0), x(ge, { key: 9 }, Ae($.value.platform_specific, (se) => (h(), x("div", lm, [
                  f("div", om, ie(Fe(se.label)), 1),
                  f("div", um, ie(se.value), 1)
                ]))), 256)) : B("", !0)
              ]),
              f("div", null, [
                Y(S(Ia), {
                  tabs: D,
                  modelValue: ye.value,
                  "onUpdate:modelValue": T[10] || (T[10] = (se) => ye.value = se),
                  type: "secondary",
                  size: "large"
                }, null, 8, ["modelValue"]),
                ye.value.id === 2 ? (h(), pe(jh, {
                  key: 0,
                  query: $.value.query
                }, null, 8, ["query"])) : B("", !0)
              ])
            ])) : B("", !0),
            $.value ? B("", !0) : (h(), x("div", cm, [
              f("div", null, [
                f("img", {
                  class: "",
                  alt: "standardIcon",
                  src: S(_0)
                }, null, 8, dm)
              ]),
              T[25] || (T[25] = f("div", { class: "standard-view-title" }, [
                f("div", null, "Select a standard segment from the list"),
                f("div", null, "or"),
                f("div", null, [
                  f("strong", null, "Create a custom segment")
                ])
              ], -1))
            ]))
          ], 2),
          $.value.name ? (h(), x("div", fm, [
            f("div", pm, [
              T[26] || (T[26] = f("div", { class: "footer-description-term" }, "Selected Segment:", -1)),
              f("div", hm, [
                f("span", null, ie($.value.name ? `${`${$.value.name} - `}` : "none"), 1),
                f("span", null, ie(Me($.value.count)), 1)
              ])
            ]),
            f("div", null, [
              Y(S(ct), {
                type: "secondary",
                label: "Explore",
                onClick: T[11] || (T[11] = (se) => V()),
                class: "mr-2"
              }),
              Y(S(ct), {
                type: "delete",
                label: "Delete",
                onClick: T[12] || (T[12] = (se) => ve()),
                class: "mr-2 redButton"
              }),
              Y(S(ct), {
                type: "primary",
                label: "Push to destination",
                onClick: T[13] || (T[13] = (se) => ze())
              })
            ])
          ])) : B("", !0)
        ])
      ]),
      L.value ? (h(), pe(A2, {
        key: 0,
        onClose: T[14] || (T[14] = (se) => L.value = !1)
      })) : B("", !0)
    ], 64));
  }
}, gm = /* @__PURE__ */ Ke(mm, [["__scopeId", "data-v-e027e21a"]]), xm = { class: "feedback-title-wrapper" }, ym = { class: "title" }, km = { class: "feedback-text" }, vm = {
  __name: "AiQueryFeedback",
  props: {
    feedback: {
      type: Object,
      default: () => ({
        title: "Ai Assumption",
        text: "",
        type: "info"
      })
    }
  },
  setup(o) {
    const I = {
      warning: "bi-exclamation-triangle-fill",
      info: "bi-info-circle-fill",
      query: "bi-magic",
      "icon-color-warning": "#FA5D05",
      "icon-color-info": "#8B919A",
      "icon-color-query": "#528233"
    };
    return (a, _) => {
      var m, w, C;
      return o.feedback ? (h(), x("div", {
        key: 0,
        class: We(["ai-query-feedback", [o.feedback.type]])
      }, [
        f("div", xm, [
          Y(S(Ot), {
            class: "pr-2",
            size: "16px",
            icon: I[(m = o.feedback) == null ? void 0 : m.type],
            color: I[`icon-color-${(w = o.feedback) == null ? void 0 : w.type}`]
          }, null, 8, ["icon", "color"]),
          f("div", ym, ie(o.feedback.title), 1)
        ]),
        f("p", km, ie((C = o.feedback) == null ? void 0 : C.text), 1)
      ], 2)) : B("", !0);
    };
  }
}, h0 = /* @__PURE__ */ Ke(vm, [["__scopeId", "data-v-db7f7814"]]), _m = { key: 0 }, bm = { class: "d-flex justify-content-between" }, Em = { class: "query-results" }, Sm = { class: "query-result" }, Am = { class: "query-result-count" }, wm = {
  key: 0,
  class: "segment-insights"
}, Cm = {
  key: 1,
  class: "loading"
}, Tm = {
  __name: "ExploreThumbnail",
  props: {
    segmentData: {
      type: Array,
      required: !0
    },
    segmentCount: {
      type: Number,
      default: 0
    },
    savingDraft: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["explore-insights"],
  setup(o, { emit: I }) {
    const a = I, _ = o;
    N(!1);
    const m = N(!1), w = {
      chart: {
        type: "bar",
        height: 700,
        stacked: !0,
        toolbar: {
          show: !1
        },
        zoom: {
          enabled: !1
        }
      },
      plotOptions: {
        bar: {
          horizontal: !0,
          dataLabels: {
            position: "center"
          }
        }
      },
      xaxis: {
        categories: [
          "Travel",
          "Music",
          "Food/Gastronomy",
          "Fashion",
          "Health",
          "Animals/Wildlife",
          "Wellbeing",
          "Sports",
          "Technology/Science",
          "Family/Relationships",
          "Young Single",
          "Child-Free Couples",
          "Parent with Young Children",
          "Parent with Older Children",
          "Any Parent",
          "Empty Nest",
          "Midlife Singles",
          "Senior Singles",
          "Hotel Parents"
        ],
        labels: {
          style: {
            fontSize: "14px",
            fontFamily: "Inter, sans-serif",
            colors: "#777"
          }
        },
        axisBorder: {
          show: !1
        },
        axisTicks: {
          show: !1
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontFamily: "Inter, sans-serif",
            colors: "#333"
          }
        }
      },
      grid: {
        borderColor: "#E4E4E7",
        strokeDashArray: 4,
        xaxis: {
          lines: { show: !0 }
        },
        yaxis: {
          lines: { show: !1 }
        }
      },
      colors: ["#4A90E2", "#A7C7F2"],
      dataLabels: {
        enabled: !1
      },
      tooltip: {
        theme: "light"
      },
      title: {
        text: "Audience Groups & Life Stages Ratio",
        align: "left",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          color: "#263238"
        }
      },
      legend: {
        position: "bottom"
      }
    }, C = [
      {
        name: "Audience Groups",
        data: [15, 12, 18, 10, 14, 25, 10, 16, 20, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // ✅ Increased Animals/Wildlife to the highest value
      },
      {
        name: "Life Stages",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 15, 18, 12, 10, 8, 10, 7, 10]
        // ✅ Increased Young Single to the highest value
      }
    ];
    function R() {
      a("explore-insights");
    }
    function J(G) {
      return G == null ? "" : (typeof G == "string" ? parseInt(G, 10) : G).toLocaleString();
    }
    return (G, z) => (h(), x("div", null, [
      o.savingDraft ? B("", !0) : (h(), x("div", _m, [
        f("div", bm, [
          z[1] || (z[1] = f("div", { class: "query-editor-title pb-20" }, "Segment Summary", -1)),
          m.value ? (h(), pe(S(ct), {
            key: 0,
            class: "run-query-button",
            type: "secondary",
            size: "small",
            label: "Explore Insights",
            onClick: z[0] || (z[0] = (K) => R())
          })) : B("", !0)
        ]),
        f("div", Em, [
          f("div", Sm, [
            z[2] || (z[2] = nt(" Segment size ")),
            f("span", Am, ie(J(_.segmentCount)), 1),
            z[3] || (z[3] = nt(" records. "))
          ])
        ]),
        m.value ? (h(), x("div", wm, [
          Y(S(La), {
            options: w,
            series: C
          })
        ])) : B("", !0)
      ])),
      o.savingDraft ? (h(), x("div", Cm, [
        Y(S(Nn), { size: "xlarge" }),
        z[4] || (z[4] = f("p", null, "Connecting to Open Intelligence...", -1))
      ])) : B("", !0)
    ]));
  }
}, Dm = /* @__PURE__ */ Ke(Tm, [["__scopeId", "data-v-3a77bed4"]]), Im = { class: "query-attributes" }, Lm = ["onClick", "onKeydown"], Bm = {
  key: 0,
  class: "query-attributes-group-items"
}, Fm = ["onClick"], $m = { class: "attribute-type" }, Vm = { class: "attribute-name" }, Om = {
  __name: "QueryAttributesList",
  props: {
    tables: {
      type: Array,
      required: !0
    },
    collapsed: {
      type: Array,
      required: !0
    },
    fetching: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["click-attribute", "drag-start", "drag-end", "toggle-group"],
  setup(o, { emit: I }) {
    const a = I;
    function _(w) {
      a("toggle-group", w);
    }
    function m(w, C) {
      return C[w];
    }
    return (w, C) => (h(), x("div", Im, [
      o.fetching ? (h(), pe(S(Nn), {
        key: 0,
        class: "query-builder-left-loader",
        size: "xlarge"
      })) : B("", !0),
      (h(!0), x(ge, null, Ae(o.tables, (R) => (h(), x("div", {
        class: We(["query-attributes-group", { closed: o.collapsed.includes(R.display_name) }]),
        key: R.display_name
      }, [
        f("div", {
          class: "query-attributes-group-toggle",
          onClick: (J) => _(R.display_name),
          onKeydown: $a((J) => _(R.display_name), ["enter"])
        }, [
          C[3] || (C[3] = f("span", { class: "arrow" }, null, -1)),
          nt(" " + ie(R.display_name), 1)
        ], 40, Lm),
        o.collapsed.includes(R.display_name) ? B("", !0) : (h(), x("div", Bm, [
          Y(S(Ba), {
            behaviour: "copy",
            "group-name": "1",
            "get-child-payload": (J) => m(J, R.columns),
            onDragEnd: C[2] || (C[2] = (J) => w.$emit("drag-end"))
          }, {
            default: Vt(() => [
              (h(!0), x(ge, null, Ae(R.columns, (J) => (h(), pe(S(oh), {
                key: J.display_name
              }, {
                default: Vt(() => [
                  f("div", {
                    class: "attribute",
                    onMousedown: C[0] || (C[0] = (G) => w.$emit("drag-start")),
                    onMouseup: C[1] || (C[1] = (G) => w.$emit("drag-end"))
                  }, [
                    Y(S(Ot), {
                      class: "drag-icon",
                      icon: "bi-grip-vertical",
                      size: "20px"
                    }),
                    f("div", {
                      class: "attribute-content",
                      onClick: ah((G) => w.$emit("click-attribute", J), ["stop"])
                    }, [
                      f("span", $m, ie(J.type), 1),
                      f("span", Vm, ie(J.display_name), 1)
                    ], 8, Fm)
                  ], 32)
                ]),
                _: 2
              }, 1024))), 128))
            ]),
            _: 2
          }, 1032, ["get-child-payload"])
        ]))
      ], 2))), 128))
    ]));
  }
}, Pm = /* @__PURE__ */ Ke(Om, [["__scopeId", "data-v-4e61c8b0"]]), Rm = { class: "freeform-tab" }, Gm = {
  __name: "FreeForm",
  setup(o) {
    nr();
    const I = N("");
    return (a, _) => (h(), x("div", Rm, [
      Y(S($t), {
        class: "mt-15 ai-query",
        label: "Query",
        type: "textarea",
        textArea: !0,
        modelValue: I.value,
        "onUpdate:modelValue": _[0] || (_[0] = (m) => I.value = m)
      }, null, 8, ["modelValue"])
    ]));
  }
}, Mm = /* @__PURE__ */ Ke(Gm, [["__scopeId", "data-v-f29f192b"]]), Um = { class: "query-builder" }, Wm = { class: "query-builder-left" }, Nm = { class: "query-tabs" }, qm = { class: "source" }, zm = {
  key: 1,
  class: "ai-query-tab"
}, Hm = {
  key: 2,
  class: ""
}, Qm = { class: "query-builder-right" }, Km = { class: "query-content-scrollable" }, Ym = { class: "query-editor-wrapper" }, Zm = { class: "query-runner-button-wrapper" }, Jm = {
  key: 0,
  class: "query-editor"
}, Xm = { class: "queries" }, jm = {
  key: 0,
  class: "query"
}, eg = ["onClick", "onKeydown"], tg = { class: "w-100 pr-10" }, ng = {
  key: 0,
  class: "sub-query-outer"
}, ig = { class: "sub-queries" }, rg = {
  key: 0,
  class: "query-operator-inner",
  style: { width: "fit-content" }
}, ag = {
  key: 1,
  class: "pt-3 pb-2"
}, sg = { key: 0 }, lg = {
  key: 1,
  class: "px-2"
}, og = {
  key: 1,
  class: "query-operator-outer"
}, ug = {
  key: 0,
  class: "inital-view"
}, cg = ["src"], dg = { key: 0 }, fg = {
  key: 0,
  class: "query-results-wrapper"
}, pg = {
  key: 1,
  class: "loading-query-run"
}, hg = {
  key: 2,
  class: "loading-query-run"
}, mg = {
  key: 0,
  class: "mt-3"
}, gg = {
  key: 1,
  class: "mt-3"
}, xg = { class: "query-builder-footer" }, yg = { class: "query-builder-footer-fields" }, kg = {
  __name: "CustomSegments",
  props: {
    segment: Object,
    customSegmentUrl: {
      default: "https://sm-standard-segments-838902823068.europe-west2.run.app",
      type: String,
      required: !0
    },
    tenantId: {
      default: "",
      type: String,
      required: !0
    },
    brandName: {
      default: "",
      type: String,
      required: !0
    },
    brandId: {
      default: "1",
      type: String,
      required: !0
    },
    token: {
      default: "",
      type: String,
      required: !0
    }
  },
  emits: ["insertSegment", "showInsightsExplorer"],
  setup(o, { emit: I }) {
    const a = o, _ = cn(), m = nr(), w = I;
    N();
    const C = [
      {
        id: 1,
        label: "Query Builder"
      },
      {
        id: 2,
        label: "Ai Assisted Query"
      },
      {
        id: 3,
        label: "Free Form"
      }
    ], R = N(C[0]), J = N([]), G = N(J.value[0]), z = N([]), K = N(z.value[0]), H = N(""), L = N(null), A = N(!1), D = N(null), Z = N(!0), ye = N(!1), he = N([]), ce = N([]), de = N(!1), q = N(!1), $ = N(""), F = N(""), V = N(!1), ve = N(!1), Fe = N(!1), Me = N(""), Pe = [
      { value: "$and", label: "and" },
      { value: "$or", label: "or" }
    ], kt = [
      { value: "$eq", label: "equal" }
    ], Pt = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$in", label: "in" },
      { value: "$nin", label: "not in" }
    ], dn = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$bw", label: "begins with" },
      { value: "$nbw", label: "not begins with" },
      { value: "$ew", label: "ends with" },
      { value: "$new", label: "not ends with" }
    ], fn = [
      { value: "$eq", label: "equal" },
      { value: "$neq", label: "not equal" },
      { value: "$gt", label: "greater than" },
      { value: "$gte", label: "greater than or equal to" },
      { value: "$lt", label: "less than" },
      { value: "$lte", label: "less than or equal to" },
      { value: "$bt", label: "between" },
      { value: "$nbt", label: "not between" }
    ], Tt = [
      { value: "$eq", label: "equal" },
      { value: "$lt", label: "less than" },
      { value: "$lte", label: "less than or equal to" },
      { value: "$gt", label: "greater than" },
      { value: "$gte", label: "greater than or equal to" }
    ], ze = N(0), j = N({
      name: "",
      description: "",
      table: "",
      joins: [],
      conditions: []
    }), U = () => {
      _.set_selectedSegmentType("custom"), _.set_activeTab("custom"), _.set_selectedSegment(L.value), w("showInsightsExplorer", L.value);
    };
    function T(X) {
      const b = {
        $eq: "is equal to",
        $neq: "is not equal to",
        $lt: "is less than",
        $lte: "is less than or equal to",
        $gt: "is greater than",
        $gte: "is greater than or equal to",
        $in: "is in",
        $nin: "is not in",
        $bw: "begins with",
        $nbw: "does not begin with",
        $ew: "ends with",
        $new: "does not end with",
        $bt: "is between",
        $nbt: "is not between"
      };
      let M = "$and";
      return X.reduce((Se, O) => {
        if (O.logic)
          return M = O.logic, Se;
        if (Array.isArray(O.group)) {
          const oe = O.group.filter((Et) => Et.statement).map((Et) => {
            const [pn, Mt, qn] = Et.statement;
            return {
              field: pn,
              operator: b[Mt] || Mt,
              value: qn,
              type: Et.input_type
            };
          });
          return [
            ...Se,
            {
              logic: M,
              conditions: oe
            }
          ];
        }
        return Se;
      }, []);
    }
    async function se(X) {
      const b = {
        brandName: a.brandName,
        name: X.name,
        description: X.description,
        count: X.count || H.value,
        market: _.query.demographics.market
      }, M = `https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments/insights/${X.segmentId}`, Se = await fetch(M, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-tenant": a.tenantId,
          "brand-id": a.brandId,
          authorization: `Bearer ${a.token}`
        },
        body: JSON.stringify(b)
      });
      if (!Se.ok) {
        const O = await Se.json();
        throw new Error(O.message || "Failed to generate insights");
      }
      await Se.json();
    }
    async function vt() {
      Me.value = "saving", Fe.value = !0;
      const X = {
        platformId: K.value,
        count: H.value,
        region: _.query.demographics.region,
        market: _.query.demographics.market,
        description: j.value.description,
        name: j.value.name,
        query: T(j.value.conditions)
      };
      try {
        const b = await fetch("https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-tenant": a.tenantId,
            "brand-id": a.brandId,
            authorization: `Bearer ${a.token}`
          },
          body: JSON.stringify(X)
        }), M = await b.json();
        if (!b.ok)
          throw new Error(M.message || "Failed to save segment");
        ve.value = !0, q.value = !0, Me.value = "generating", L.value = M.data[0], await se(M.data[0]), Me.value = "done";
      } catch (b) {
        console.error("Error saving segment or generating insights:", b), Me.value = "";
      } finally {
        Fe.value = !1;
      }
    }
    async function Dt() {
      V.value = !0;
      const X = {
        communication_type: "",
        language: "",
        market: "",
        user_prompt: F.value
      };
      j.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
      const b = await m.generate_ai_query(X, K.value, G.value), M = {
        text: b.message,
        type: b.query ? "info" : "warning",
        title: "AI Assumption"
      }, Se = {
        text: b.query,
        type: "query",
        title: "Query Gen"
      };
      m.set_ai_generated_message(M), m.set_ai_generated_query(Se), b.attrs.forEach((O, oe) => {
        oe === 0 ? D.value = "queryGroupDrop" : D.value = j.value.conditions[0].id;
        const Et = {
          payload: {
            display_name: O.field,
            input_type: O.input_type,
            operators: O.operator,
            selectors: []
          }
        };
        Et.payload.selectors.push(O.value), Gt(Et), c0();
      }), V.value = !1;
    }
    async function _t() {
      j.value.conditions.forEach((X) => {
        Array.isArray(X.group) && (X == null || X.group.forEach((b) => {
          b.input_type === "select" && b.statement[2].length > 1 && b.statement[1] === "$eq" && (b.statement[1] = "$in"), b.input_type === "select" && b.statement[2].length > 1 && b.statement[1] === "$neq" && (b.statement[1] = "$nin");
        }));
      });
    }
    async function Rt() {
      de.value = !0, R.value.id === 1 && await _t(), H.value = await m.run_query(j.value, K.value, G.value), H.value && (q.value = !0), de.value = !1, ve.value = !1;
    }
    function De(X, b) {
      var Se, O;
      return X === "operatorsQueries" ? (Se = Pe.find((oe) => oe.value === b)) == null ? void 0 : Se.label : (O = Zt(X).find((oe) => oe.value === b)) == null ? void 0 : O.label;
    }
    function Zt(X) {
      switch (X) {
        case "select":
          return Pt;
        case "boolean":
          return kt;
        case "string":
          return dn;
        case "date":
          return fn;
        case "int":
          return Tt;
        default:
          return [];
      }
    }
    function Jt(X) {
      A.value = X;
    }
    async function rr() {
      ye.value = !0, await m.fetch_database_model(K.value, G.value), ye.value = !1;
    }
    async function Tn() {
      Z.value = !0, await m.fetch_custom_segment_settings();
      const X = await m.get_segment_settings;
      X && (z.value = await X.platforms.map((b) => ({
        value: b.platform_id,
        label: b.platform,
        locations: b.locations.map((M) => ({
          value: M.value,
          label: M.display_name
        }))
      })), K.value = z.value[0].value), Z.value = !1;
    }
    function Gt(X) {
      const b = X.payload ? X.payload : X;
      if (ze.value < m.settings.maxSubQuery) {
        const M = b.selectors.map((oe) => ({
          value: oe,
          label: oe
        }));
        let Se = [];
        M.length > 2 ? Se[0] = M[0].value : M.length > 0 ? Se = M[0].value : Se = null;
        const O = M.length > 0 && b.input_type !== "boolean" ? "select" : b.input_type;
        if (D.value === "queryGroupDrop") {
          ze.value += 1, j.value.conditions.length > 0 && j.value.conditions.push({ logic: "$or" });
          const oe = {
            id: Ca(),
            group: [
              {
                id: Ca(),
                statement: [b.display_name, "$eq", Se],
                selectors: M,
                input_type: O
              }
            ]
          };
          j.value.conditions.push(oe);
        } else if (D.value !== null) {
          ze.value += 1;
          const oe = j.value.conditions.findIndex(
            (Et) => Et.id === D.value
          );
          oe !== -1 && (j.value.conditions[oe].group.push({ logic: "$and" }), j.value.conditions[oe].group.push({
            id: Ca(),
            statement: [b.display_name, "$eq", Se],
            selectors: M,
            input_type: O
          }));
        }
        D.value = null;
      }
    }
    function ci(X) {
      var b;
      (b = j.value.conditions[0]) != null && b.id ? D.value = j.value.conditions[0].id : D.value = "queryGroupDrop", Gt(X), c0();
    }
    function it(X, b, M) {
      if (j.value.conditions[b].group.length === 1)
        j.value.conditions.length > b + 1 ? j.value.conditions.splice(b, 2) : j.value.conditions.splice(b, 1), ze.value -= 1;
      else {
        const Se = j.value.conditions[b].group.findIndex(
          (O) => O.id === M
        );
        j.value.conditions[b].group.splice(Se - 1, 2), ze.value -= 1;
      }
    }
    function Xt(X) {
      const b = he.value.indexOf(X);
      b >= 0 ? he.value.splice(b, 1) : he.value.push(X);
    }
    function ar(X) {
      const b = ce.value.indexOf(X);
      b >= 0 ? ce.value.splice(b, 1) : ce.value.push(X);
    }
    function bt() {
      H.value = "", j.value = {
        name: "",
        table: "",
        joins: [],
        conditions: []
      };
    }
    function di() {
      j.value = { ...j.value, count: H.value }, R.value.id === 3 && (j.value = {
        ...j.value,
        freeForm: m.freeFormQuery
      }), w("insertSegment", j.value);
    }
    async function sr() {
      await _.set_token(a.token), await _.set_brandId(a.brandId), await _.set_tenantId(a.tenantId), await m.set_customSegmentUrl(a.customSegmentUrl), await m.fetch_custom_segment_settings(), await Tn();
    }
    return wn(() => {
      sr();
    }), un(K, async (X, b) => {
      X && b !== X && (J.value = z.value.find((M) => M.value == X).locations, G.value = J.value[0].value, await bt(), await rr());
    }), un(R, async (X, b) => {
      X && b !== X && X.id === 2 && (F.value = "", m.set_ai_generated_message(null), m.set_ai_generated_query(null));
    }), (X, b) => (h(), x("div", Um, [
      f("div", Wm, [
        Z.value ? (h(), pe(S(Nn), {
          key: 0,
          class: "query-builder-left-loader",
          size: "xlarge"
        })) : (h(), x(ge, { key: 1 }, [
          f("div", Nm, [
            Y(S(Ia), {
              tabs: C,
              modelValue: R.value,
              "onUpdate:modelValue": b[0] || (b[0] = (M) => R.value = M),
              type: "secondary",
              size: "large"
            }, null, 8, ["modelValue"])
          ]),
          f("div", qm, [
            Y(S(Ft), {
              style: { width: "45%" },
              class: "source w-100",
              options: z.value,
              modelValue: K.value,
              "onUpdate:modelValue": b[1] || (b[1] = (M) => K.value = M),
              label: "Source"
            }, null, 8, ["options", "modelValue"]),
            Y(S(Ft), {
              style: { width: "45%" },
              class: "source w-100",
              options: J.value,
              modelValue: G.value,
              "onUpdate:modelValue": b[2] || (b[2] = (M) => G.value = M),
              label: "Server Location"
            }, null, 8, ["options", "modelValue"]),
            S(_).brief.market ? (h(), pe(S($t), {
              key: 0,
              style: { width: "fit-content" },
              hasDefaultValue: "",
              class: "source w-100",
              disabled: "",
              modelValue: S(_).brief.market,
              "onUpdate:modelValue": b[3] || (b[3] = (M) => S(_).brief.market = M),
              label: "Market"
            }, null, 8, ["modelValue"])) : B("", !0)
          ]),
          K.value && G.value ? (h(), x(ge, { key: 0 }, [
            R.value.id === 1 ? (h(), pe(Pm, {
              key: 0,
              tables: S(m).get_databaseModel.tables,
              collapsed: ce.value,
              fetching: ye.value,
              onClickAttribute: ci,
              onDragStart: b[4] || (b[4] = (M) => Jt(!0)),
              onDragEnd: b[5] || (b[5] = (M) => Jt(!1)),
              onToggleGroup: ar
            }, null, 8, ["tables", "collapsed", "fetching"])) : B("", !0),
            R.value.id === 2 ? (h(), x("div", zm, [
              Y(S($t), {
                class: "mt-15 ai-query",
                label: "Description",
                type: "textarea",
                textArea: !0,
                modelValue: F.value,
                "onUpdate:modelValue": b[6] || (b[6] = (M) => F.value = M)
              }, null, 8, ["modelValue"]),
              Y(S(ct), {
                class: "mt-15",
                size: "small",
                label: "Generate Query",
                disabled: !F.value,
                loading: V.value,
                onClick: b[7] || (b[7] = (M) => Dt())
              }, null, 8, ["disabled", "loading"]),
              S(m).get_aiGeneratedMessage ? (h(), pe(h0, {
                key: 0,
                feedback: S(m).get_aiGeneratedMessage
              }, null, 8, ["feedback"])) : B("", !0),
              S(m).get_aiGeneratedQuery ? (h(), pe(h0, {
                key: 1,
                feedback: S(m).get_aiGeneratedQuery
              }, null, 8, ["feedback"])) : B("", !0)
            ])) : B("", !0),
            R.value.id === 3 ? (h(), x("div", Hm, [
              Y(Mm)
            ])) : B("", !0)
          ], 64)) : B("", !0)
        ], 64))
      ]),
      f("div", Qm, [
        f("div", Km, [
          f("div", Ym, [
            f("div", null, [
              b[15] || (b[15] = f("div", { class: "query-editor-title pb-20" }, "Query Builder", -1)),
              f("div", Zm, [
                Y(S(ct), {
                  icon: "bi-caret-right",
                  class: "run-query-button",
                  type: "transparent",
                  label: "Run Query",
                  disabled: !K.value || !G.value,
                  loading: de.value,
                  onClick: b[8] || (b[8] = (M) => Rt())
                }, null, 8, ["disabled", "loading"]),
                Y(S(ct), {
                  class: "run-query-button ml-10",
                  type: "secondary",
                  size: "small",
                  label: "Save Query",
                  disabled: !j.value.name || !j.value.description || !H.value || ve.value,
                  loading: Fe.value,
                  onClick: b[9] || (b[9] = (M) => vt())
                }, null, 8, ["disabled", "loading"])
              ])
            ]),
            R.value.id !== 3 ? (h(), x("div", Jm, [
              f("div", Xm, [
                (h(!0), x(ge, null, Ae(j.value.conditions, (M, Se) => (h(), x("div", {
                  class: "query-outer",
                  key: M.id
                }, [
                  M.group ? (h(), x("div", jm, [
                    f("div", {
                      class: "collapse-subQuery",
                      onClick: (O) => Xt(M.id),
                      onKeydown: $a((O) => Xt(M.id), ["enter"])
                    }, [
                      Y(S(Ot), {
                        icon: he.value.indexOf(M.id) === -1 ? "bi-arrows-collapse" : "bi-arrows-expand",
                        size: "18px",
                        color: "#212121"
                      }, null, 8, ["icon"])
                    ], 40, eg),
                    f("div", tg, [
                      he.value.indexOf(M.id) === -1 ? (h(), x("div", ng, [
                        (h(!0), x(ge, null, Ae(M.group, (O) => (h(), x("div", ig, [
                          O.logic && he.value.indexOf(M.id) === -1 ? (h(), x("div", rg, [
                            Y(S(Ft), {
                              class: "query-operator",
                              modelValue: O.logic,
                              "onUpdate:modelValue": (oe) => O.logic = oe,
                              singleSelect: !0,
                              options: Pe,
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])) : B("", !0),
                          O.statement ? (h(), x("div", {
                            key: 1,
                            class: We(["sub-query", { "single-subquery": M.group.length === 1 }])
                          }, [
                            Y(S($t), {
                              readonly: "",
                              modelValue: O.statement[0],
                              "onUpdate:modelValue": (oe) => O.statement[0] = oe
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            Y(S(Ft), {
                              modelValue: O.statement[1],
                              "onUpdate:modelValue": (oe) => O.statement[1] = oe,
                              singleSelect: !0,
                              options: Zt(O.input_type),
                              hasDefaultValue: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                            O.selectors.length < 3 && O.selectors.length > 0 ? (h(), pe(S(Ft), {
                              key: 0,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (oe) => O.statement[2] = oe,
                              options: O.selectors
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : B("", !0),
                            O.selectors.length > 2 && O.input_type !== "boolean" ? (h(), pe(S(Ft), {
                              key: 1,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (oe) => O.statement[2] = oe,
                              options: O.selectors,
                              multipleSelect: !0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])) : B("", !0),
                            O.input_type === "int" ? (h(), pe(S($t), {
                              key: 2,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (oe) => O.statement[2] = oe,
                              error: O.statement[2] ? "" : $.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : B("", !0),
                            O.input_type === "string" ? (h(), pe(S($t), {
                              key: 3,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (oe) => O.statement[2] = oe,
                              error: O.statement[2] ? "" : $.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : O.input_type === "date" ? (h(), pe(S(x0), {
                              key: 4,
                              modelValue: O.statement[2],
                              "onUpdate:modelValue": (oe) => O.statement[2] = oe,
                              range: O.statement[1] === "$bt" || O.statement[1] === "$nbt",
                              error: O.statement[2] ? "" : $.value
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "range", "error"])) : B("", !0),
                            Y(S(Ot), {
                              class: "remove-subQuery",
                              icon: "bi-x",
                              size: "25px",
                              color: "#0014CC",
                              onClick: (oe) => it(M.id, Se, O.id)
                            }, null, 8, ["onClick"])
                          ], 2)) : B("", !0)
                        ]))), 256))
                      ])) : (h(), x("p", ag, [
                        (h(!0), x(ge, null, Ae(M.group, (O, oe) => (h(), x("span", {
                          key: O.id
                        }, [
                          O.statement ? (h(), x("span", sg, [
                            f("b", null, ie(O == null ? void 0 : O.statement[0]), 1),
                            nt(" " + ie(De(O.input_type, O == null ? void 0 : O.statement[1])) + " ", 1),
                            f("b", null, ie((O == null ? void 0 : O.statement[2]) || "?"), 1)
                          ])) : (h(), x("span", lg, ie(De("operatorsQueries", O.logic)), 1))
                        ]))), 128))
                      ])),
                      A.value && ze.value < S(m).settings.maxSubQuery ? (h(), pe(S(Ba), {
                        key: 2,
                        behaviour: "drop-zone",
                        "group-name": "1",
                        "should-animate-drop": () => !1,
                        onDragEnter: (O) => D.value = M.id,
                        onDrop: Gt
                      }, {
                        default: Vt(() => b[16] || (b[16] = [
                          f("div", { class: "drop-indicator mb-15" }, null, -1)
                        ])),
                        _: 2
                      }, 1032, ["onDragEnter"])) : B("", !0)
                    ])
                  ])) : B("", !0),
                  j.value.conditions.length > 1 && Se < j.value.conditions.length - 1 && M.logic ? (h(), x("div", og, [
                    Y(S(Ft), {
                      class: "query-operator",
                      modelValue: M.logic,
                      "onUpdate:modelValue": (O) => M.logic = O,
                      singleSelect: !0,
                      options: Pe,
                      hasDefaultValue: !0
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])) : B("", !0)
                ]))), 128))
              ]),
              j.value.conditions.length === 0 ? (h(), x("div", ug, [
                f("span", null, [
                  f("img", {
                    class: "",
                    alt: "standardIcon",
                    src: S(_0)
                  }, null, 8, cg)
                ])
              ])) : B("", !0),
              A.value && ze.value < S(m).settings.maxSubQuery || j.value.conditions.length === 0 ? (h(), pe(S(Ba), {
                key: 1,
                behaviour: "drop-zone",
                "group-name": "1",
                "should-animate-drop": () => !1,
                onDragEnter: b[10] || (b[10] = (M) => D.value = "queryGroupDrop"),
                onDrop: Gt
              }, {
                default: Vt(() => [
                  f("div", {
                    class: We(["drop-indicator", {
                      "mt-25": j.value.conditions.length > 0,
                      "p-5": j.value.conditions.length === 0
                    }])
                  }, [
                    j.value.conditions.length <= 0 ? (h(), x("span", dg, " Drag and drop attributes or AI generated rules ")) : B("", !0)
                  ], 2)
                ]),
                _: 1
              })) : B("", !0)
            ])) : B("", !0)
          ]),
          de.value || q.value ? (h(), x("div", fg, [
            !de.value && q.value ? (h(), pe(Dm, {
              key: 0,
              segmentData: H.value,
              segmentCount: H.value
            }, null, 8, ["segmentData", "segmentCount"])) : B("", !0),
            de.value ? (h(), x("div", pg, [
              Y(S(Nn), {
                size: "xlarge",
                class: "mt-3"
              }),
              b[17] || (b[17] = f("p", { class: "mt-3" }, "Running query...", -1))
            ])) : B("", !0),
            Me.value === "saving" || Me.value === "generating" ? (h(), x("div", hg, [
              Y(S(Nn), {
                size: "xlarge",
                class: "mt-3"
              }),
              Me.value === "saving" ? (h(), x("p", mg, "Saving segment...")) : (h(), x("p", gg, "Generating insights..."))
            ])) : B("", !0),
            Me.value === "done" && L.value ? (h(), pe(f2, {
              key: 3,
              selectedSegment: L.value,
              location: "custom",
              onShowInsightsExplorer: U
            }, null, 8, ["selectedSegment"])) : B("", !0)
          ])) : B("", !0)
        ]),
        f("div", xg, [
          f("div", yg, [
            Y(S($t), {
              required: "",
              class: "segment-name",
              label: "Segment name",
              modelValue: j.value.name,
              "onUpdate:modelValue": b[11] || (b[11] = (M) => j.value.name = M),
              type: "text"
            }, null, 8, ["modelValue"]),
            Y(S($t), {
              class: "segment-name",
              label: "Segment description",
              modelValue: j.value.description,
              "onUpdate:modelValue": b[12] || (b[12] = (M) => j.value.description = M),
              type: "text"
            }, null, 8, ["modelValue"]),
            Y(S(ct), {
              type: "secondary",
              label: "Explore",
              size: "small",
              onClick: b[13] || (b[13] = (M) => U()),
              class: "mx-1",
              disabled: !H.value || !j.value.name && R.value.id === 1 || !j.value.name && R.value.id === 2 || j.value.conditions.length <= 0 && R.value.id !== 3
            }, null, 8, ["disabled"]),
            Y(S(ct), {
              size: "small",
              label: "Push to destination",
              disabled: !H.value || !j.value.name && R.value.id === 1 || !j.value.name && R.value.id === 2 || j.value.conditions.length <= 0 && R.value.id !== 3,
              onClick: b[14] || (b[14] = (M) => di())
            }, null, 8, ["disabled"])
          ])
        ])
      ])
    ]));
  }
}, vg = /* @__PURE__ */ Ke(kg, [["__scopeId", "data-v-5031a2f1"]]), _g = { class: "tag-section" }, bg = { class: "rating-card" }, Eg = { class: "header" }, Sg = { class: "title" }, Ag = { class: "pb-2" }, wg = { class: "content-wrapper" }, Cg = { class: "content" }, Tg = { class: "publishers" }, Dg = { class: "publisher-item" }, Ig = { class: "ratings" }, Lg = { class: "rating" }, Bg = {
  __name: "TagCard",
  props: {
    tags: {
      type: Array,
      required: !0
    },
    charts: {
      type: Array,
      default: () => []
    }
  },
  setup(o) {
    const I = N([]), a = o, _ = Oe(() => a.charts.filter((w) => w.type === "bubble")), m = Oe(() => a.tags);
    return wn(() => {
      I.value = new Array(_.value.length).fill(!1);
    }), (w, C) => (h(), x("div", _g, [
      (h(!0), x(ge, null, Ae(m.value, (R, J) => (h(), x("div", {
        class: We(["card-wrapper", { "full-width": R.section === "Owned Intelligence" }]),
        key: R.title + J
      }, [
        f("div", bg, [
          f("div", Eg, [
            f("h2", Sg, [
              f("span", Ag, ie(R.title), 1)
            ])
          ]),
          f("div", wg, [
            f("div", Cg, [
              f("div", Tg, [
                (h(!0), x(ge, null, Ae(R.data[0].label, (G, z) => (h(), x("div", { key: G }, [
                  f("div", Dg, ie(G), 1),
                  f("div", Ig, [
                    f("div", Lg, [
                      (h(!0), x(ge, null, Ae(Math.floor(parseFloat(R.data[0].score[z])), (K, H) => (h(), x("span", {
                        key: `filled-${H}`,
                        class: "dot filled"
                      }))), 128)),
                      (h(!0), x(ge, null, Ae(5 - Math.floor(parseFloat(R.data[0].score[z])), (K, H) => (h(), x("span", {
                        key: `empty-${H}`,
                        class: "dot"
                      }))), 128))
                    ])
                  ])
                ]))), 128))
              ])
            ]),
            C[0] || (C[0] = f("div", { class: "logo-wrapper" }, [
              f("img", {
                src: "https://storage.googleapis.com/segments-manager/images/Asset%201.png",
                alt: "logo",
                width: "100"
              })
            ], -1))
          ])
        ])
      ], 2))), 128))
    ]));
  }
}, m0 = /* @__PURE__ */ Ke(Bg, [["__scopeId", "data-v-6d44fa3a"]]), Fg = { class: "chart-section-title my-3" }, $g = { class: "chart-section" }, Vg = { key: 0 }, Og = { class: "chart-title" }, Pg = {
  key: 1,
  class: "chart-section-title my-4"
}, Rg = {
  key: 2,
  class: "pb-4"
}, Gg = { class: "chart-title" }, Mg = {
  key: 3,
  class: "chart-section-title my-4"
}, Ug = {
  __name: "ChartCard",
  props: {
    charts: {
      type: Array,
      required: !0
    },
    tags: {
      type: Array,
      required: !0
    },
    paidSocial: {
      type: Object,
      required: !0
    }
  },
  setup(o) {
    const I = o, a = N([]), _ = N([]), m = N(null), w = N(!1), C = ["#0A2FFF", "#0068AD", "#0E8677", "#12871C", "#A36F05", "#CC4B00", "#D11534", "#B41880", "#832EEA", "#646C72"], R = (L, A) => {
      var Fe, Me;
      const D = "area", Z = Fa[D] || {}, ye = ((Fe = L.data[0]) == null ? void 0 : Fe.label) || [], ce = (((Me = L.data[0]) == null ? void 0 : Me.score) || []).map((Pe) => Number.isNaN(Number(Pe)) ? Pe : Number(Pe)), de = [{ name: L.title, data: ce }], q = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], $ = ye.map((Pe, kt) => q[Math.floor(kt / (52 / 12))]), F = [], V = /* @__PURE__ */ new Set();
      $.forEach((Pe) => {
        V.has(Pe) ? F.push("") : (F.push(Pe), V.add(Pe));
      });
      const ve = {
        xaxis: {
          categories: F,
          title: {
            text: "Month",
            style: {
              fontSize: "14px",
              fontWeight: 500,
              color: "#666"
            }
          },
          tickPlacement: "on",
          labels: {
            style: {
              fontSize: "13px",
              fontFamily: "Inter, sans-serif",
              colors: "#777"
            },
            rotate: 0,
            trim: !1
          }
        },
        yaxis: {
          title: {
            text: "Indexed Consumption",
            style: {
              fontSize: "14px",
              fontWeight: 500,
              color: "#666"
            }
          }
        },
        colors: [C[A % C.length]],
        stroke: {
          curve: "smooth",
          width: 3
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.2,
            stops: [0, 90, 100]
          }
        },
        dataLabels: {
          enabled: !1
        },
        markers: {
          size: 0
        },
        tooltip: {
          enabled: !0,
          shared: !0,
          intersect: !1,
          custom: ({ series: Pe, seriesIndex: kt, dataPointIndex: Pt, w: dn }) => {
            const fn = dn.globals.labels[Pt], Tt = Pe[kt][Pt];
            return `
                    <div style="
                        border-radius: 6px;
                        overflow: hidden;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        font-family: Inter, sans-serif;
                        font-size: 14px;
                    ">
                        <div style="
                            background-color: #f1f1f1;
                            padding: 8px 12px;
                            font-weight: 600;
                        ">
                            Week ${fn}
                        </div>
                        <div style="
                            background: white;
                            padding: 10px 12px;
                        ">
                            <span style="color: #000; font-weight: 500;">Indexed Consumption (Annual): </span>
                            <span style="font-weight: 600;">${Tt}</span>
                        </div>
                    </div>
                `;
          }
        },
        grid: {
          borderColor: "#f1f1f1",
          row: {
            colors: ["transparent", "transparent"],
            opacity: 0.5
          }
        }
      };
      return {
        section: L.section,
        chartType: D,
        title: L.title,
        series: de,
        options: {
          ...Z,
          ...ve,
          chart: {
            type: D,
            toolbar: {
              show: !0,
              tools: {
                download: !0,
                selection: !0,
                zoom: !0,
                zoomin: !0,
                zoomout: !0,
                pan: !0
              }
            }
          }
        }
      };
    }, J = (L) => {
      if (!L)
        return "bar";
      const A = L.toString().toLowerCase().trim();
      return (A.includes("vertical") || A.includes("verical")) && (A.includes("bar") || A.includes("bars") || A.includes("chart")) || A === "horizontal" ? "bar" : A === "donut" ? "donut" : A === "pie" ? "pie" : A === "radar" ? "radar" : A === "line" ? "line" : A === "area" ? "area" : A;
    }, G = Oe(() => I.charts.filter((L) => L.data && L.data.length > 0).map((L, A) => {
      var $, F;
      const D = J(b0[L.type] || L.type), Z = Fa[D] || {}, ye = (($ = L.data[0]) == null ? void 0 : $.label) || [], ce = (((F = L.data[0]) == null ? void 0 : F.score) || []).map((V) => Number.isNaN(Number(V)) ? V : Number(V));
      let de = [], q = {};
      if (D === "horizontal")
        de = [{ name: L.title, data: ce }], q = {
          labels: ye,
          colors: [C[A % C.length]],
          plotOptions: { bar: { distributed: !1 } }
        };
      else if (D === "bar" || D === "vertical bar" || D === "vertical bars" || D === "Vertical bars" || D === "vertical chart")
        L.title === "Digital Media Consumption Index Hourly" ? (de = [{ name: "Indexed Consumption", data: ce }], q = {
          xaxis: {
            categories: ye,
            title: {
              text: "Hour of the Day",
              style: {
                fontSize: "14px",
                fontWeight: 500,
                color: "#666"
              }
            },
            labels: {
              style: {
                fontSize: "13px",
                fontFamily: "Inter, sans-serif",
                colors: "#777"
              },
              formatter: (V) => `${V}:00`
              // Optional: show "1:00", "2:00", etc.
            }
          },
          yaxis: {
            title: {
              text: "Indexed Consumption",
              style: {
                fontSize: "14px",
                fontWeight: 500,
                color: "#666"
              }
            },
            labels: {
              style: {
                fontSize: "13px",
                fontFamily: "Inter, sans-serif",
                colors: "#777"
              }
            }
          },
          colors: [C[A % C.length]],
          plotOptions: {
            bar: {
              horizontal: !1,
              distributed: !1,
              borderRadius: 4,
              columnWidth: "50%"
            }
          },
          tooltip: {
            enabled: !0,
            shared: !1,
            intersect: !0,
            custom: ({ series: V, seriesIndex: ve, dataPointIndex: Fe, w: Me }) => {
              const Pe = Me.globals.labels[Fe], kt = V[ve][Fe];
              return `
                    <div style="
                        border-radius: 6px;
                        overflow: hidden;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        font-family: Inter, sans-serif;
                        font-size: 14px;
                    ">
                        <div style="
                            background-color: #f1f1f1;
                            padding: 8px 12px;
                            font-weight: 600;
                        ">
                            Hour ${Pe}
                        </div>
                        <div style="
                            background: white;
                            padding: 10px 12px;
                        ">
                            <span style="color: #000; font-weight: 500;">Indexed Consumption: </span>
                            <span style="font-weight: 600;">${kt}</span>
                        </div>
                    </div>
                `;
            }
          },
          dataLabels: {
            enabled: !1
          },
          grid: {
            borderColor: "#f1f1f1",
            row: {
              colors: ["transparent", "transparent"],
              opacity: 0.5
            }
          }
        }) : (L.title === "Personality archetype" && console.log(ce), de = [{ name: L.title, data: ce }], q = {
          labels: ye,
          colors: [C[A % C.length]],
          plotOptions: { bar: { horizontal: !0, distributed: !1 } }
        });
      else {
        if (D === "line" || D === "area")
          return R(L, A);
        D === "radar" ? (de = [{ name: L.title, data: ce }], q = { labels: ye }) : (D === "donut" || D === "pie") && (de = ce, q = { labels: ye });
      }
      return {
        section: L.section,
        chartType: D,
        title: L.title,
        series: de,
        options: {
          ...Z,
          ...q,
          chart: { type: D }
        }
      };
    }));
    wn(() => {
      a.value = new Array(G.value.length).fill(!1), m.value && f0(
        m,
        ([L], A) => {
          L.isIntersecting && (w.value = !0, A.disconnect());
        },
        { threshold: 0.1 }
      );
    });
    const z = (L, A) => {
      if (!L || a.value[A])
        return;
      _.value[A] = L;
      const { stop: D } = f0(
        L,
        ([Z]) => {
          Z.isIntersecting && (a.value[A] = !0, D());
        },
        { threshold: 0.1 }
      );
    }, K = () => {
      const L = G.value.length;
      return L === 1 ? "full-width" : L === 2 ? "half-width" : "third-width";
    }, H = Oe(() => {
      const { paidSocial: L } = I, A = L.data.map((D) => D.name);
      return {
        chartType: "bar",
        title: L.title,
        section: L.section,
        description: L.description,
        series: [
          {
            name: "Audience",
            data: L.data.map((D) => Number(D.x))
          },
          {
            name: "Population",
            data: L.data.map((D) => Number(D.y))
          }
        ],
        options: {
          chart: {
            type: "bar",
            height: 400,
            toolbar: {
              show: !1
            }
          },
          plotOptions: {
            bar: {
              horizontal: !1,
              columnWidth: "50%"
              // Adjust this for spacing
            }
          },
          dataLabels: {
            enabled: !0,
            style: {
              fontSize: "12px",
              colors: ["#333"]
            }
          },
          legend: {
            show: !0,
            position: "top",
            horizontalAlign: "left",
            markers: {
              fillColors: ["#008FFB", "#775DD0"]
            }
          },
          tooltip: {
            shared: !0,
            intersect: !1
          },
          grid: {
            borderColor: "#E4E4E7",
            strokeDashArray: 4
          },
          xaxis: {
            categories: A,
            labels: {
              style: {
                fontSize: "12px",
                fontFamily: "Inter",
                colors: "#777"
              }
            }
          },
          yaxis: {
            title: {
              text: "%"
            }
          },
          colors: ["#0A2FFF", "#D9DCDE"]
        }
      };
    });
    return (L, A) => (h(), x("div", null, [
      f("h5", Fg, ie(G.value[0].section.charAt(0).toUpperCase() + G.value[0].section.slice(1)), 1),
      f("div", $g, [
        (h(!0), x(ge, null, Ae(G.value, (D, Z) => (h(), x("div", {
          key: D.title + Z,
          ref_for: !0,
          ref: (ye) => z(ye, Z),
          class: We(["chart-wrapper", K()])
        }, [
          a.value[Z] ? (h(), x("div", Vg, [
            f("div", Og, ie(D.title), 1),
            Y(S(La), {
              options: D.options,
              series: D.series,
              type: D.chartType,
              width: "100%",
              height: D.chartType === "bubble" ? "550" : "350"
            }, null, 8, ["options", "series", "type", "height"])
          ])) : B("", !0)
        ], 2))), 128))
      ]),
      G.value[0].section === "Paid Intelligence" ? (h(), pe(m0, {
        key: 0,
        tags: o.tags.slice(0, 2)
      }, null, 8, ["tags"])) : B("", !0),
      G.value[0].section === "Paid Intelligence" ? (h(), x("h5", Pg, ie(o.paidSocial.section), 1)) : B("", !0),
      G.value[0].section === "Paid Intelligence" ? (h(), x("div", Rg, [
        f("div", {
          ref_key: "paidSocialEl",
          ref: m,
          class: We(["chart-wrapper", { "full-width": !0 }])
        }, [
          f("div", Gg, ie(o.paidSocial.title), 1),
          w.value ? (h(), pe(S(La), {
            key: 0,
            options: H.value.options,
            series: H.value.series,
            type: "bar",
            width: "100%",
            height: "500"
          }, null, 8, ["options", "series"])) : B("", !0)
        ], 512)
      ])) : B("", !0),
      o.tags[2].section === "Owned Intelligence" && G.value[0].section === "Paid Intelligence" ? (h(), x("h5", Mg, ie(o.tags[2].section), 1)) : B("", !0),
      o.tags[2].section === "Owned Intelligence" && G.value[0].section === "Paid Intelligence" ? (h(), pe(m0, {
        key: 4,
        tags: o.tags.slice(2)
      }, null, 8, ["tags"])) : B("", !0)
    ]));
  }
}, Wg = /* @__PURE__ */ Ke(Ug, [["__scopeId", "data-v-c3b14e25"]]), Ng = "5.12.1", qg = 25, zg = 0, Hg = 100, Qg = 450, Kg = 450, Yg = "*Final5", Zg = 0, Jg = [], Xg = [
  {
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "mask2",
    td: 1,
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          35,
          4,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.632,
                0.632,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 38,
            s: [
              63.668,
              63.668,
              100
            ]
          },
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.201,
                0.201,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 49.233,
            s: [
              101.888,
              101.888,
              100
            ]
          },
          {
            i: {
              x: [
                0.833,
                0.833,
                0.833
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.8,
                0.8,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 62.42,
            s: [
              93.768,
              93.768,
              100
            ]
          },
          {
            t: 77.9996744791667,
            s: [
              0,
              0,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                398,
                398
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                35,
                4
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 180,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 2",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      },
      {
        ty: "fl",
        c: {
          a: 0,
          k: [
            0,
            0,
            0,
            1
          ],
          ix: 4
        },
        o: {
          a: 0,
          k: 100,
          ix: 5
        },
        r: 1,
        bm: 0,
        nm: "Fill 1",
        mn: "ADBE Vector Graphic - Fill",
        hd: !1
      }
    ],
    ip: 38,
    op: 100,
    st: -28.8333333333333,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 2,
    ty: 3,
    nm: "Null Collect  1",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 0,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225.339,
          224.589,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          50,
          50,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833,
                0.833,
                0.833
              ],
              y: [
                0.833,
                0.833,
                0.833
              ]
            },
            o: {
              x: [
                0.167,
                0.167,
                0.167
              ],
              y: [
                0.167,
                0.167,
                0.167
              ]
            },
            t: 14,
            s: [
              147,
              147,
              100
            ]
          },
          {
            t: 17,
            s: [
              100,
              100,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    ip: 14,
    op: 81,
    st: 0,
    bm: 0
  },
  {
    ddd: 0,
    ind: 3,
    ty: 4,
    nm: "Shape Layer 39",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          159,
          -77.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 74,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 4,
    ty: 4,
    nm: "Shape Layer 38",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          13.667,
          -77.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 76,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 5,
    ty: 4,
    nm: "Shape Layer 37",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          86.333,
          -77.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 79,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 6,
    ty: 4,
    nm: "Shape Layer 36",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -59,
          -77.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 81,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 7,
    ty: 4,
    nm: "Shape Layer 51",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          229,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 74,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 8,
    ty: 4,
    nm: "Shape Layer 30",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          159,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 74,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 9,
    ty: 4,
    nm: "Shape Layer 29",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          13.667,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 76,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 10,
    ty: 4,
    nm: "Shape Layer 23",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          86.333,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 79,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 11,
    ty: 4,
    nm: "Shape Layer 48",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -129,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 81,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 12,
    ty: 4,
    nm: "Shape Layer 22",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -59,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 81,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 13,
    ty: 4,
    nm: "Shape Layer 50",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          229,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 74,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 14,
    ty: 4,
    nm: "Shape Layer 43",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          159,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 74,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 15,
    ty: 4,
    nm: "Shape Layer 42",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          13.667,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 76,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 16,
    ty: 4,
    nm: "Shape Layer 41",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          86.333,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 79,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 17,
    ty: 4,
    nm: "Shape Layer 49",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -129,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 81,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 18,
    ty: 4,
    nm: "Shape Layer 40",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -59,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 81,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 19,
    ty: 4,
    nm: "Shape Layer 47",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          159,
          177.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 74,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 20,
    ty: 4,
    nm: "Shape Layer 46",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          13.667,
          177.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 76,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 21,
    ty: 4,
    nm: "Shape Layer 45",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          86.333,
          177.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 79,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 22,
    ty: 4,
    nm: "Shape Layer 44",
    parent: 2,
    tt: 1,
    tp: 1,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 14,
            s: [
              0
            ]
          },
          {
            t: 16,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -59,
          177.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 14,
    op: 81,
    st: 14,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 23,
    ty: 4,
    nm: "mask1",
    td: 1,
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -0.013,
          -0.115,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          70,
          70,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0,
                      0
                    ],
                    y: [
                      1,
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.13,
                      0.13
                    ],
                    y: [
                      0,
                      0
                    ]
                  },
                  t: 3.334,
                  s: [
                    10,
                    10
                  ]
                },
                {
                  t: 26.3326822916667,
                  s: [
                    560,
                    560
                  ]
                }
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "st",
            c: {
              a: 0,
              k: [
                1,
                0.235294117647,
                0.101960784314,
                1
              ],
              ix: 3
            },
            o: {
              a: 0,
              k: 100,
              ix: 4
            },
            w: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.833
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.167
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 0.834,
                  s: [
                    0
                  ]
                },
                {
                  i: {
                    x: [
                      0
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.374
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 3.334,
                  s: [
                    6
                  ]
                },
                {
                  t: 17.9996744791667,
                  s: [
                    0
                  ]
                }
              ],
              ix: 5
            },
            lc: 1,
            lj: 1,
            ml: 4,
            bm: 0,
            nm: "Stroke 1",
            mn: "ADBE Vector Graphic - Stroke",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -0.013,
                -0.115
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 27,
    st: -148.333333333333,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 24,
    ty: 3,
    nm: "Null Collect  2",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 0,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225.339,
          224.589,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          50,
          50,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833,
                0.833,
                0.833
              ],
              y: [
                0.833,
                0.833,
                0.833
              ]
            },
            o: {
              x: [
                0.167,
                0.167,
                0.167
              ],
              y: [
                0.167,
                0.167,
                0.167
              ]
            },
            t: 0,
            s: [
              147,
              147,
              100
            ]
          },
          {
            t: 3,
            s: [
              100,
              100,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    ip: 0,
    op: 67,
    st: -14,
    bm: 0
  },
  {
    ddd: 0,
    ind: 25,
    ty: 4,
    nm: "Shape Layer 72",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          159,
          -77.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 60,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 26,
    ty: 4,
    nm: "Shape Layer 71",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          13.667,
          -77.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 62,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 27,
    ty: 4,
    nm: "Shape Layer 70",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          86.333,
          -77.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 65,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 28,
    ty: 4,
    nm: "Shape Layer 69",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -59,
          -77.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 67,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 29,
    ty: 4,
    nm: "Shape Layer 68",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          229,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 60,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 30,
    ty: 4,
    nm: "Shape Layer 67",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          159,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 60,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 31,
    ty: 4,
    nm: "Shape Layer 66",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          13.667,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 62,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 32,
    ty: 4,
    nm: "Shape Layer 65",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          86.333,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 65,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 33,
    ty: 4,
    nm: "Shape Layer 64",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -129,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 67,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 34,
    ty: 4,
    nm: "Shape Layer 63",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -59,
          8.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 67,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 35,
    ty: 4,
    nm: "Shape Layer 62",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          229,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 60,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 36,
    ty: 4,
    nm: "Shape Layer 61",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          159,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 60,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 37,
    ty: 4,
    nm: "Shape Layer 60",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          13.667,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 62,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 38,
    ty: 4,
    nm: "Shape Layer 59",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          86.333,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 65,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 39,
    ty: 4,
    nm: "Shape Layer 58",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -129,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 67,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 40,
    ty: 4,
    nm: "Shape Layer 57",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -59,
          93.25,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 67,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 41,
    ty: 4,
    nm: "Shape Layer 56",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          159,
          177.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 60,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 42,
    ty: 4,
    nm: "Shape Layer 55",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          13.667,
          177.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 62,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 43,
    ty: 4,
    nm: "Shape Layer 54",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          86.333,
          177.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 65,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 44,
    ty: 4,
    nm: "Shape Layer 53",
    parent: 24,
    tt: 1,
    tp: 23,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.833
              ],
              y: [
                0.833
              ]
            },
            o: {
              x: [
                0.167
              ],
              y: [
                0.167
              ]
            },
            t: 0,
            s: [
              0
            ]
          },
          {
            t: 2,
            s: [
              100
            ]
          }
        ],
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          -59,
          177.75,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -100.661,
          41.339,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          50,
          50,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                8,
                8
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -100.661,
                41.339
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 67,
    st: 0,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 45,
    ty: 4,
    nm: "dot blue 4",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 1,
        k: [
          {
            i: {
              x: 0.2,
              y: 1
            },
            o: {
              x: 0.333,
              y: 0
            },
            t: 78.167,
            s: [
              225,
              225,
              0
            ],
            to: [
              14.583,
              0,
              0
            ],
            ti: [
              -14.583,
              0,
              0
            ]
          },
          {
            t: 97,
            s: [
              312.5,
              225,
              0
            ]
          }
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -221.468,
          15.399,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.333,
                0.333,
                0.333
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 78.167,
            s: [
              28.204,
              28.204,
              100
            ]
          },
          {
            t: 97,
            s: [
              0,
              0,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                60,
                60
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -221.468,
                15.399
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 78.1666666666667,
    op: 100,
    st: 29,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 46,
    ty: 4,
    nm: "dot blue 3",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 1,
        k: [
          {
            i: {
              x: 0.2,
              y: 1
            },
            o: {
              x: 0.333,
              y: 0
            },
            t: 78.167,
            s: [
              225,
              225,
              0
            ],
            to: [
              -14.333,
              0,
              0
            ],
            ti: [
              14.333,
              0,
              0
            ]
          },
          {
            t: 97,
            s: [
              139,
              225,
              0
            ]
          }
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -221.468,
          15.399,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.333,
                0.333,
                0.333
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 78.167,
            s: [
              28.204,
              28.204,
              100
            ]
          },
          {
            t: 97,
            s: [
              0,
              0,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                60,
                60
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -221.468,
                15.399
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 78.1666666666667,
    op: 100,
    st: 29,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 47,
    ty: 4,
    nm: "dot blue 2",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 1,
        k: [
          {
            i: {
              x: 0.2,
              y: 1
            },
            o: {
              x: 0.333,
              y: 0
            },
            t: 78.167,
            s: [
              225,
              225,
              0
            ],
            to: [
              0,
              -14.333,
              0
            ],
            ti: [
              0,
              14.333,
              0
            ]
          },
          {
            t: 97,
            s: [
              225,
              139,
              0
            ]
          }
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -221.468,
          15.399,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.333,
                0.333,
                0.333
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 78.167,
            s: [
              28.204,
              28.204,
              100
            ]
          },
          {
            t: 97,
            s: [
              0,
              0,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                60,
                60
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -221.468,
                15.399
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 78.1666666666667,
    op: 100,
    st: 29,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 48,
    ty: 4,
    nm: "dot blue",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 1,
        k: [
          {
            i: {
              x: 0.2,
              y: 1
            },
            o: {
              x: 0.333,
              y: 0
            },
            t: 78.167,
            s: [
              225,
              225,
              0
            ],
            to: [
              0,
              14.417,
              0
            ],
            ti: [
              0,
              -14.417,
              0
            ]
          },
          {
            t: 97,
            s: [
              225,
              311.5,
              0
            ]
          }
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -221.468,
          15.399,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.333,
                0.333,
                0.333
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 78.167,
            s: [
              28.204,
              28.204,
              100
            ]
          },
          {
            t: 97,
            s: [
              0,
              0,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                60,
                60
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -221.468,
                15.399
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 78.1666666666667,
    op: 100,
    st: 29,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 49,
    ty: 4,
    nm: "Shape Layer 18",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -0.013,
          -0.115,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          70,
          70,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0,
                      0
                    ],
                    y: [
                      1,
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.13,
                      0.13
                    ],
                    y: [
                      0,
                      0
                    ]
                  },
                  t: 78,
                  s: [
                    10,
                    10
                  ]
                },
                {
                  t: 106,
                  s: [
                    560,
                    560
                  ]
                }
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "st",
            c: {
              a: 0,
              k: [
                0.101960784314,
                0.101960784314,
                0.101960784314,
                1
              ],
              ix: 3
            },
            o: {
              a: 0,
              k: 100,
              ix: 4
            },
            w: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.374
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 78,
                  s: [
                    6
                  ]
                },
                {
                  t: 96.8330078125,
                  s: [
                    0
                  ]
                }
              ],
              ix: 5
            },
            lc: 1,
            lj: 1,
            ml: 4,
            bm: 0,
            nm: "Stroke 1",
            mn: "ADBE Vector Graphic - Stroke",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -0.013,
                -0.115
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 77.8333333333333,
    op: 100,
    st: -70.5,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 50,
    ty: 4,
    nm: "Shape Layer 15",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          35,
          4,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.632,
                0.632,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 38.333,
            s: [
              63.668,
              63.668,
              100
            ]
          },
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.201,
                0.201,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 49.476,
            s: [
              73.188,
              73.188,
              100
            ]
          },
          {
            i: {
              x: [
                0.833,
                0.833,
                0.833
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.8,
                0.8,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 62.558,
            s: [
              88.868,
              88.868,
              100
            ]
          },
          {
            t: 77.9996744791667,
            s: [
              0,
              0,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                398,
                398
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                1,
                1,
                1,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                35,
                4
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 180,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 2",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      },
      {
        ty: "fl",
        c: {
          a: 0,
          k: [
            1,
            1,
            1,
            1
          ],
          ix: 4
        },
        o: {
          a: 0,
          k: 100,
          ix: 5
        },
        r: 1,
        bm: 0,
        nm: "Fill 1",
        mn: "ADBE Vector Graphic - Fill",
        hd: !1
      }
    ],
    ip: 38,
    op: 78,
    st: -28.8333333333333,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 51,
    ty: 4,
    nm: "Shape Layer 14",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          35,
          4,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.632,
                0.632,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 38,
            s: [
              63.668,
              63.668,
              100
            ]
          },
          {
            i: {
              x: [
                0.2,
                0.2,
                0.2
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.201,
                0.201,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 49.233,
            s: [
              101.888,
              101.888,
              100
            ]
          },
          {
            i: {
              x: [
                0.833,
                0.833,
                0.833
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.8,
                0.8,
                0.8
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 62.42,
            s: [
              93.768,
              93.768,
              100
            ]
          },
          {
            t: 77.9996744791667,
            s: [
              0,
              0,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                398,
                398
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "fl",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 4
            },
            o: {
              a: 0,
              k: 100,
              ix: 5
            },
            r: 1,
            bm: 0,
            nm: "Fill 1",
            mn: "ADBE Vector Graphic - Fill",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                35,
                4
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 180,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 2",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      },
      {
        ty: "fl",
        c: {
          a: 0,
          k: [
            0,
            0,
            0,
            1
          ],
          ix: 4
        },
        o: {
          a: 0,
          k: 100,
          ix: 5
        },
        r: 1,
        bm: 0,
        nm: "Fill 1",
        mn: "ADBE Vector Graphic - Fill",
        hd: !1
      }
    ],
    ip: 38,
    op: 100,
    st: -28.8333333333333,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 52,
    ty: 4,
    nm: "Shape Layer 11",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          202.962,
          222.481,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          0,
          0,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          62.965,
          62.965,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                398,
                398
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "st",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 3
            },
            o: {
              a: 0,
              k: 100,
              ix: 4
            },
            w: {
              a: 0,
              k: 2,
              ix: 5
            },
            lc: 2,
            lj: 2,
            bm: 0,
            d: [
              {
                n: "d",
                nm: "dash",
                v: {
                  a: 0,
                  k: 10,
                  ix: 1
                }
              },
              {
                n: "o",
                nm: "offset",
                v: {
                  a: 0,
                  k: 0,
                  ix: 7
                }
              }
            ],
            nm: "Stroke 1",
            mn: "ADBE Vector Graphic - Stroke",
            hd: !1
          },
          {
            ty: "tm",
            s: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.215
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.217
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 20,
                  s: [
                    0
                  ]
                },
                {
                  t: 36.1669921875,
                  s: [
                    26
                  ]
                }
              ],
              ix: 1
            },
            e: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.637
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      1
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 20,
                  s: [
                    0
                  ]
                },
                {
                  t: 36.1669921875,
                  s: [
                    26
                  ]
                }
              ],
              ix: 2
            },
            o: {
              a: 0,
              k: 85,
              ix: 3
            },
            m: 1,
            ix: 4,
            nm: "Trim Paths 1",
            mn: "ADBE Vector Filter - Trim",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                35,
                4
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 180,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 2",
        np: 4,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      },
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                398,
                398
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "st",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 3
            },
            o: {
              a: 0,
              k: 100,
              ix: 4
            },
            w: {
              a: 0,
              k: 2,
              ix: 5
            },
            lc: 2,
            lj: 2,
            bm: 0,
            d: [
              {
                n: "d",
                nm: "dash",
                v: {
                  a: 0,
                  k: 10,
                  ix: 1
                }
              },
              {
                n: "o",
                nm: "offset",
                v: {
                  a: 0,
                  k: 0,
                  ix: 7
                }
              }
            ],
            nm: "Stroke 1",
            mn: "ADBE Vector Graphic - Stroke",
            hd: !1
          },
          {
            ty: "tm",
            s: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.215
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.217
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 20,
                  s: [
                    0
                  ]
                },
                {
                  t: 36.1669921875,
                  s: [
                    26
                  ]
                }
              ],
              ix: 1
            },
            e: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.637
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      1
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 20,
                  s: [
                    0
                  ]
                },
                {
                  t: 36.1669921875,
                  s: [
                    26
                  ]
                }
              ],
              ix: 2
            },
            o: {
              a: 0,
              k: 85,
              ix: 3
            },
            m: 1,
            ix: 4,
            nm: "Trim Paths 1",
            mn: "ADBE Vector Filter - Trim",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                35,
                4
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 4,
        cix: 2,
        bm: 0,
        ix: 2,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 19,
    op: 41,
    st: -38,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 53,
    ty: 4,
    nm: "Shape Layer 34",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          0,
          0,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                1,
                1
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "tm",
            s: {
              a: 0,
              k: 0,
              ix: 1
            },
            e: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.17
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.333
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 23,
                  s: [
                    0
                  ]
                },
                {
                  t: 46,
                  s: [
                    100
                  ]
                }
              ],
              ix: 2
            },
            o: {
              a: 0,
              k: 0,
              ix: 3
            },
            m: 1,
            ix: 2,
            nm: "Trim Paths 1",
            mn: "ADBE Vector Filter - Trim",
            hd: !1
          },
          {
            ty: "st",
            c: {
              a: 0,
              k: [
                0,
                0,
                0,
                1
              ],
              ix: 3
            },
            o: {
              a: 0,
              k: 100,
              ix: 4
            },
            w: {
              a: 0,
              k: 235,
              ix: 5
            },
            lc: 1,
            lj: 2,
            bm: 0,
            nm: "Stroke 1",
            mn: "ADBE Vector Graphic - Stroke",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 20,
    op: 41,
    st: -7,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 54,
    ty: 4,
    nm: "Shape Layer 35",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          0,
          0,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 1,
        k: [
          {
            i: {
              x: [
                0.17,
                0.17,
                0.17
              ],
              y: [
                1,
                1,
                1
              ]
            },
            o: {
              x: [
                0.333,
                0.333,
                0.333
              ],
              y: [
                0,
                0,
                0
              ]
            },
            t: 19,
            s: [
              0,
              0,
              100
            ]
          },
          {
            t: 34,
            s: [
              121,
              121,
              100
            ]
          }
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 0,
              k: [
                1,
                1
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "tm",
            s: {
              a: 0,
              k: 0,
              ix: 1
            },
            e: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.17
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.333
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 21,
                  s: [
                    0
                  ]
                },
                {
                  t: 35,
                  s: [
                    100
                  ]
                }
              ],
              ix: 2
            },
            o: {
              a: 0,
              k: 0,
              ix: 3
            },
            m: 1,
            ix: 2,
            nm: "Trim Paths 1",
            mn: "ADBE Vector Filter - Trim",
            hd: !1
          },
          {
            ty: "st",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 3
            },
            o: {
              a: 0,
              k: 100,
              ix: 4
            },
            w: {
              a: 0,
              k: 193,
              ix: 5
            },
            lc: 1,
            lj: 2,
            bm: 0,
            nm: "Stroke 1",
            mn: "ADBE Vector Graphic - Stroke",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 19,
    op: 40,
    st: -8,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 55,
    ty: 4,
    nm: "Shape Layer 19",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          -0.013,
          -0.115,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          70,
          70,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            d: 1,
            ty: "el",
            s: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0,
                      0
                    ],
                    y: [
                      1,
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.13,
                      0.13
                    ],
                    y: [
                      0,
                      0
                    ]
                  },
                  t: 3.334,
                  s: [
                    10,
                    10
                  ]
                },
                {
                  t: 26.3326822916667,
                  s: [
                    560,
                    560
                  ]
                }
              ],
              ix: 2
            },
            p: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 3
            },
            nm: "Ellipse Path 1",
            mn: "ADBE Vector Shape - Ellipse",
            hd: !1
          },
          {
            ty: "st",
            c: {
              a: 0,
              k: [
                0,
                0.078431372549,
                0.8,
                1
              ],
              ix: 3
            },
            o: {
              a: 0,
              k: 100,
              ix: 4
            },
            w: {
              a: 1,
              k: [
                {
                  i: {
                    x: [
                      0.833
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.167
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 0.834,
                  s: [
                    0
                  ]
                },
                {
                  i: {
                    x: [
                      0
                    ],
                    y: [
                      1
                    ]
                  },
                  o: {
                    x: [
                      0.374
                    ],
                    y: [
                      0
                    ]
                  },
                  t: 3.334,
                  s: [
                    6
                  ]
                },
                {
                  t: 17.9996744791667,
                  s: [
                    0
                  ]
                }
              ],
              ix: 5
            },
            lc: 1,
            lj: 1,
            ml: 4,
            bm: 0,
            nm: "Stroke 1",
            mn: "ADBE Vector Graphic - Stroke",
            hd: !1
          },
          {
            ty: "tr",
            p: {
              a: 0,
              k: [
                -0.013,
                -0.115
              ],
              ix: 2
            },
            a: {
              a: 0,
              k: [
                0,
                0
              ],
              ix: 1
            },
            s: {
              a: 0,
              k: [
                100,
                100
              ],
              ix: 3
            },
            r: {
              a: 0,
              k: 0,
              ix: 6
            },
            o: {
              a: 0,
              k: 100,
              ix: 7
            },
            sk: {
              a: 0,
              k: 0,
              ix: 4
            },
            sa: {
              a: 0,
              k: 0,
              ix: 5
            },
            nm: "Transform"
          }
        ],
        nm: "Ellipse 1",
        np: 3,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: !1
      }
    ],
    ip: 0,
    op: 27,
    st: -148.333333333333,
    ct: 1,
    bm: 0
  },
  {
    ddd: 0,
    ind: 56,
    ty: 1,
    nm: "White Solid 9",
    sr: 1,
    ks: {
      o: {
        a: 0,
        k: 100,
        ix: 11
      },
      r: {
        a: 0,
        k: 0,
        ix: 10
      },
      p: {
        a: 0,
        k: [
          225,
          225,
          0
        ],
        ix: 2,
        l: 2
      },
      a: {
        a: 0,
        k: [
          960,
          540,
          0
        ],
        ix: 1,
        l: 2
      },
      s: {
        a: 0,
        k: [
          100,
          100,
          100
        ],
        ix: 6,
        l: 2
      }
    },
    ao: 0,
    sw: 1920,
    sh: 1080,
    sc: "#ffffff",
    ip: 0,
    op: 100,
    st: 0,
    bm: 0
  }
], jg = [], e3 = {}, t3 = {
  v: Ng,
  fr: qg,
  ip: zg,
  op: Hg,
  w: Qg,
  h: Kg,
  nm: Yg,
  ddd: Zg,
  assets: Jg,
  layers: Xg,
  markers: jg,
  props: e3
}, n3 = {
  key: 0,
  class: "explore-insights-loader"
}, i3 = {
  key: 1,
  class: "explore-insights-wrapper"
}, r3 = { class: "explore-insights" }, a3 = { class: "explore-insights-subtitle" }, s3 = { class: "d-flex flex-column" }, l3 = { class: "mb-2" }, o3 = { class: "pd-segment-title-details" }, u3 = { class: "pd-segment-title-details" }, c3 = { key: 0 }, d3 = { class: "thumbnail-card" }, f3 = { class: "thumbnail-segment-cards" }, p3 = { class: "segment-card-row" }, h3 = {
  __name: "ExploreInsights",
  emits: ["apiError"],
  setup(o, { emit: I }) {
    const a = I, _ = cn(), m = _.get_selectedSegment, w = N(null), C = Oe(() => w.value || {}), R = N(), J = N([]), G = N(!0), z = N([]);
    wn(async () => {
      var L, A, D, Z, ye;
      if (m != null && m.segmentId)
        try {
          G.value = !0;
          const he = await oi.get(
            `https://sm-standard-segments-838902823068.europe-west2.run.app/api/v1/segments/insights/${m != null && m.segmentId ? m == null ? void 0 : m.segmentId : (L = cn.get_selectedSegment) == null ? void 0 : L.segmentId}`,
            {
              headers: {
                Authorization: `Bearer ${_.token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
                "x-tenant": _.tenantId,
                "brand-id": _.brandId
              }
            }
          );
          (A = he == null ? void 0 : he.data) != null && A.data || a("apiError", {
            error: "Empty response",
            headline: "Error",
            message: "Sorry, an error occurred while getting your insights."
          }), w.value = (Z = (D = he.data) == null ? void 0 : D.data) == null ? void 0 : Z[0];
          const ce = w.value.charts.reduce((de, q, $, F) => ($ < 2 ? (de[0] || (de[0] = []), de[0].push(q)) : $ < 5 ? (de[1] || (de[1] = []), de[1].push(q)) : (de[2] || (de[2] = []), de[2].push(q)), de), []);
          J.value = w.value.segments[0], z.value = Object.values(ce), await ch(3e3), G.value = !1;
        } catch (he) {
          G.value = !1;
          const ce = {
            error: he,
            headline: "Error",
            message: ((ye = he == null ? void 0 : he.response) == null ? void 0 : ye.data) || "Sorry, an error occurred while getting your insights."
          };
          a(ce);
        }
    }), Oe(() => {
      var L, A, D;
      return {
        chart: {
          type: "bar",
          height: 550,
          stacked: !0,
          toolbar: { show: !1 }
        },
        plotOptions: {
          bar: { horizontal: !0 }
        },
        xaxis: {
          categories: ((A = (L = m.thumbnail) == null ? void 0 : L.graph) == null ? void 0 : A.labels) || []
        },
        colors: [
          "#85A3FF",
          "#7AB6FF"
        ],
        title: {
          text: ((D = m.thumbnail) == null ? void 0 : D.title) || "",
          align: "left",
          style: {
            fontSize: "16px",
            fontWeight: "bold"
          }
        },
        legend: {
          position: "bottom"
        }
      };
    }), Oe(() => {
      var L, A, D;
      return ((D = (A = (L = m.thumbnail) == null ? void 0 : L.graph) == null ? void 0 : A.seriesCombined) == null ? void 0 : D.map((Z) => ({
        name: Z.name,
        data: Z.data.map(Number)
      }))) || [];
    });
    const K = Oe(() => {
      var L, A, D, Z;
      return ((Z = (D = (A = (L = m.thumbnail) == null ? void 0 : L.segments) == null ? void 0 : A[0]) == null ? void 0 : D.segments) == null ? void 0 : Z.slice(0, 4)) || [];
    });
    Oe(() => K.value.map((D) => parseFloat(D.affinityScore || "0")).reduce((D, Z) => D + Z, 0).toFixed(2)), Oe(() => K.value.map((A) => parseInt(A.reach || "0", 10)).reduce((A, D) => A + D, 0).toLocaleString());
    function H(L) {
      return L == null ? "" : (typeof L == "string" ? parseInt(L, 10) : L).toLocaleString();
    }
    return (L, A) => {
      var D, Z, ye;
      return h(), x(ge, null, [
        G.value ? (h(), x("div", n3, [
          Y(S(uh), {
            height: "40vh",
            ref_key: "anim",
            ref: R,
            "animation-data": S(t3),
            loop: !0,
            "auto-play": !0,
            speed: 1
          }, null, 8, ["animation-data"]),
          A[0] || (A[0] = f("h6", null, [
            nt("Generating Open Intelligence Insights"),
            f("span", { class: "dot-animate" }, [
              f("span", null, "."),
              f("span", null, "."),
              f("span", null, ".")
            ])
          ], -1))
        ])) : B("", !0),
        G.value ? B("", !0) : (h(), x("div", i3, [
          f("div", r3, [
            f("h6", a3, [
              f("div", s3, [
                f("div", l3, [
                  A[1] || (A[1] = f("span", { class: "pd-segment-title" }, "1PD Segment:", -1)),
                  nt(ie(((D = S(m)) == null ? void 0 : D.name) || "Segment Overview"), 1)
                ]),
                f("div", o3, [
                  A[2] || (A[2] = f("strong", null, "Count:", -1)),
                  nt(" " + ie(H((Z = S(m)) == null ? void 0 : Z.count)), 1)
                ]),
                f("div", u3, [
                  A[3] || (A[3] = f("strong", null, "Description:", -1)),
                  nt(" " + ie((ye = S(m)) == null ? void 0 : ye.description), 1)
                ])
              ]),
              A[4] || (A[4] = f("span", { class: "logo-wrapper" }, [
                f("span", null, "Enrichment Source:"),
                f("img", {
                  src: "https://storage.googleapis.com/segments-manager/images/Asset%201.png",
                  alt: "logo",
                  width: "120"
                })
              ], -1))
            ]),
            w.value ? (h(), x("div", c3, [
              f("div", d3, [
                f("div", f3, [
                  f("div", p3, [
                    (h(), pe(s2, {
                      key: L.index,
                      "segment-data": J.value,
                      "is-thumbnail": !0
                    }, null, 8, ["segment-data"]))
                  ])
                ])
              ])
            ])) : B("", !0),
            w.value ? (h(!0), x(ge, { key: 1 }, Ae(z.value, (he, ce) => {
              var de;
              return h(), x("div", {
                class: "charts-outer-wrapper",
                key: ((de = he == null ? void 0 : he[0]) == null ? void 0 : de.section) + ce
              }, [
                he ? (h(), pe(Wg, {
                  key: 0,
                  charts: he || [],
                  tags: C.value.tags || [],
                  paidSocial: w.value.paidSocial
                }, null, 8, ["charts", "tags", "paidSocial"])) : B("", !0)
              ]);
            }), 128)) : B("", !0)
          ])
        ]))
      ], 64);
    };
  }
}, m3 = /* @__PURE__ */ Ke(h3, [["__scopeId", "data-v-048fede1"]]), g3 = { key: 0 }, x3 = { key: 1 }, y3 = {
  __name: "SegmentManagerModal",
  props: {
    baseUrl: {
      type: String,
      default: "https://sm-standard-segments-838902823068.europe-west2.run.app"
    },
    customSegmentUrl: {
      type: String
    },
    token: {
      type: String,
      required: !0
    },
    tenantId: {
      type: String,
      required: !0
    },
    brandId: {
      type: String,
      default: 1
    },
    selectedSegment: {
      type: Object,
      default: null
    }
  },
  emits: ["close", "insertSegment"],
  setup(o, { emit: I }) {
    const a = I, _ = cn(), m = nr(), w = o, C = [
      { label: "Standard Segment", id: 1 },
      { label: "Custom Segment", id: 2 }
    ], R = N("standard"), J = N(C[0]), G = N(!1), z = N(null);
    function K(D) {
      z.value = D, G.value = !0;
    }
    function H() {
      a("close");
    }
    function L(D) {
      a("insertSegment", D);
    }
    function A() {
      G.value = !1;
    }
    return wn(() => {
      _.set_brandId(w.brandId), _.set_token(w.token), _.set_tenantId(w.tenantId), _.set_baseUrl(w.baseUrl), m.set_customSegmentUrl(w.customSegmentUrl), R.value = _.get_activeTab;
    }), (D, Z) => (h(), pe(S(y0), {
      onClose: H,
      size: "large"
    }, {
      header: Vt(() => [
        G.value ? B("", !0) : (h(), x("div", g3, [
          Z[1] || (Z[1] = f("div", { class: "header" }, [
            f("h4", null, "Segment Manager")
          ], -1)),
          Y(S(lh), {
            tabs: C,
            modelValue: J.value,
            "onUpdate:modelValue": Z[0] || (Z[0] = (ye) => J.value = ye),
            class: "ml-1"
          }, null, 8, ["modelValue"])
        ])),
        G.value ? (h(), x("div", x3, [
          f("div", {
            onClick: A,
            class: "navigation"
          }, [
            Y(S(Ot), {
              icon: "bi-chevron-left",
              class: "chevron-bold"
            }),
            Z[2] || (Z[2] = f("p", { class: "mt-6" }, " Back to Segment Manager", -1))
          ]),
          Z[3] || (Z[3] = f("div", { class: "discovery-header" }, [
            f("div", { class: "discovery-header-title" }, [
              f("h6", null, "Segment Manager"),
              f("p", null, "Enriching 1PD audience segments with WPP Open Intelligence")
            ])
          ], -1))
        ])) : B("", !0)
      ]),
      body: Vt(() => [
        J.value.id === 1 && !G.value ? (h(), pe(gm, {
          key: 0,
          baseUrl: o.baseUrl,
          tenantId: o.tenantId,
          onInsertSegment: L,
          onShowInsightsExplorer: K,
          brandId: o.brandId,
          token: o.token,
          selectedSegment: o.selectedSegment,
          currentlySelectedSegment: z.value
        }, null, 8, ["baseUrl", "tenantId", "brandId", "token", "selectedSegment", "currentlySelectedSegment"])) : B("", !0),
        J.value.id === 2 && !G.value ? (h(), pe(vg, {
          key: 1,
          onInsertSegment: L,
          onShowInsightsExplorer: K,
          customSegmentUrl: o.customSegmentUrl,
          tenantId: o.tenantId,
          brandId: o.brandId,
          token: o.token
        }, null, 8, ["customSegmentUrl", "tenantId", "brandId", "token"])) : B("", !0),
        G.value ? (h(), pe(m3, { key: 2 })) : B("", !0)
      ]),
      _: 1
    }));
  }
}, D3 = /* @__PURE__ */ Ke(y3, [["__scopeId", "data-v-fbea26e6"]]);
export {
  D3 as BetaSegmentManagerModal,
  vg as CustomSegments,
  m3 as ExploreInsights,
  gm as StandardSegments,
  nr as useCustomSegmentStore,
  cn as useSegmentManagerStore
};
