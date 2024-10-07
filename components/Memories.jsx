"use client";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// Function to set responsive image src and srcSet attributes
function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const Memories = () => {
    // Array of images to display in the memory section
    const itemData = [
        { img: './005.jpg', title: 'Memory 1', rows: 2, cols: 2 },
        { img: './001.jpg', title: 'Memory 2' },
        { img: './003.jpg', title: 'Memory 3' },
        { img: './002.jpg', title: 'Memory 5', rows: 2, cols: 2 },
        { img: './006.jpg', title: 'Memory 6' },
        { img: './007.jpg', title: 'Memory 7' },
        { img: './004.jpg', title: 'Memory 4', cols: 2 },
        { img: './008.jpg', title: 'Memory 8', cols: 2 },
    ];

    return (
        <div className="w-full border border-gray-200 rounded-[2rem] overflow-hidden ">
            <div className="bg-gradient-to-r from-custom-blue-1 to-custom-blue-2 text-white py-3 text-center rounded-t-lg mb-">
                <h2 className="text-xl font-semibold">Memories & Adventures</h2>
            </div>

            <ImageList sx={{ width: 1000, height: 397 }} variant="quilted" cols={4} rowHeight={121}>
                {itemData.map((item, index) => (
                    <ImageListItem key={index} cols={item.cols || 1} rows={item.rows || 1}>
                        <img
                            {...srcset(item.img, 121, item.rows, item.cols)}
                            alt={item.title}
                            loading="lazy"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
  );
};

export default Memories;
