import React from 'react';
import { useSelector } from 'react-redux';
import loadingImg from '../assets/loading.gif';
import '../styles/Loading.css';

export default function Loading() {
    const loading = useSelector((state) => state.loading);

    return (
        <div>
            {loading && (
                <div className={'loadingContainer'}>
                    <img className={'loadingImage'} src={loadingImg} alt='img' />
                </div>
            )}
        </div>
    )
}