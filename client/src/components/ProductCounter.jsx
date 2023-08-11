function ProductCounter({ count, total }) {
    return (
        <p>
            {count ? (
                <>
                    You have viewed {count} of {total} products
                </>
            ) : (
                <> {total} products </>
            )}
        </p>
    );
}

export default ProductCounter;
