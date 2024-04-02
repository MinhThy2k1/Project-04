import React from 'react';
import { Select } from 'antd';

const Search = () => (
    <Select
        showSearch
        style={{
            width: 200,
        }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={[
            {
                value: '1',
                label: 'Nitendo',

            },
            {
                value: '2',
                label: 'Playstation',
            },
            {
                value: '3',
                label: 'Gaming Lifestyle',
            },
            {
                value: '4',
                label: 'Gundam',
            },
            {
                value: '5',
                label: 'Pokemon',
            },
        ]
        }
    />
);
export default Search;