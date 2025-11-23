import '../styles/loading.css';

/**
 * ローディングイメージ 表示
 */
export function loadingStart() {
    const loading = document.getElementById('LOADING');
    if (!loading) return;
    loading.style.display = 'initial';
    loading.style.opacity = '1';
}

/**
 * ローディングイメージ 非表示
 */
export function loadingEnd() {
    const loading = document.getElementById('LOADING');
    if (!loading) return;
    loading.style.opacity = '0';
    loading.style.display = 'none';
}

export const Loading = () => {

    return (
        <div className="LOADING" id="LOADING">
            <div className="LOADING-ANIMATION">
                <div className="LOADING-ANIMATION-CIRCLE"></div>
            </div>
        </div>
    );
};