import { createSlice } from '@reduxjs/toolkit';
// import { baseURL } from '../../shared/utility';
import itemListJson from "../../assets/statics/itemList.json";

const itemSlice = createSlice({
    name: 'item',
    initialState: {
        loading: false,
        items: [],
        item: null,
        itemError: null,
        created: false,
        //  temp lists until they are provided from the backend
        measurementCodes: [
            { code: 'KG', value: 'Κιλά'},
            { code: 'MR', value: 'Μέτρα'},
            { code: 'YE', value: 'Χρόνος'},
            { code: 'EA', value: 'Τεμάχιο'},
            { code: 'WE', value: 'Εβδομάδα'},
            { code: 'DA', value: 'Ημέρα'},
            { code: 'MO', value: 'Μήνας'},
        ],
        itemType: [
            { code: 'I', value: 'Υλικό'},
            { code: 'S', value: 'Υπηρεσία'}
        ]
    },
    reducers: {
        fetchItemsStart: state => {
            state.loading = true;
            state.reset = false;
            state.created = false;
        },
        addItemStart: state => {
            state.loading = true;
        },
        fetchItemsSuccess: (state, action) => {
            state.items = action.payload;
            state.loading = false;
        },
        fetchItemsFail: (state, action) => {
            state.itemError = action.payload;
            state.loading = false;
        },
        addItemFail: (state, action) => {
            state.entityError = action.payload;
            state.loading = false;
        },
        addItemSuccess: state => {
            state.loading = false;
            state.created = true;
        },
        updateItem: (state, action) => {
            state.items.map(item => {
                return item.item_id === action.payload.item_id ?
                    action.payload :
                    item;
            });
        },
        deleteItem: (state, action) => {
            state.items = state.items
                .filter(i => i.item_id !== action.payload);
        },
        clearItemError: state => {
            state.itemError = null;
        },
        fetchItem: (state, action) => {
            const item = state.items
                .filter(i => i.item_id === Number.parseInt(action.payload))[0];
            // get the codes from measurement and type of the item
            item.measurement_code = state.measurementCodes
                .filter(m => m.value === item.measurement_code)[0].code;
            item.type_code = state.itemType
                .filter(t => t.value === item.type_code)[0].code;
            state.item = item;
        },
        clearItem: state => {
            state.item = null;
        }
    }
});

export const { fetchItemsStart, fetchItemsSuccess, fetchItemsFail,
    clearItemError, fetchItem, addItemStart, addItemSuccess,
    addItemFail, updateItem, clearItem } = itemSlice.actions;

//  async actions using thunk and logic actions that dispatch many actions
export const fetchItemCollection = token => dispatch => {
    // const fetchItem = async () => {
    //     //  async code here when its applied from the backend
    // };
    //  temp solution of static data
    dispatch(fetchItemsStart());
    const itemList = Object.values(itemListJson);
    itemList ?
        dispatch(fetchItemsSuccess(itemList)) :
        dispatch(fetchItemsFail('error on fetching items'));
};

export const createNewItem = (item, token) => dispatch => {
    //  function to sent data to the db
    dispatch(addItemStart());
    //  the async function here
    item ?
        dispatch(addItemSuccess()) :
        dispatch(addItemFail('error adding the item'));
};

export const updateExistingItem = (item, token) => dispatch => {
    //  function to sent data to the db
    dispatch(addItemStart());
    //  the async function here
    item ?
        dispatch(updateItem(item)) :
        dispatch(addItemFail('error updating the item'));
};


//  selectors
export const itemSelector = state => state.item;


export default itemSlice.reducer;