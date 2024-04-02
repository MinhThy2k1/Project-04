import React from 'react'

export default function comment(props) {
    const { dataHref } = props
    return (
        <div>
            <div class="fb-comments" data-href={dataHref} data-width="" data-numposts="5"></div>
        </div>
    )
}
