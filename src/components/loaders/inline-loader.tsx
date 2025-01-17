import ContentLoader, { IContentLoaderProps } from 'react-content-loader';


interface LineLoaderProps extends IContentLoaderProps {}

const LineLoader: React.FC<LineLoaderProps> = ({ className, ...rest }) => {
  return (
    <ContentLoader
      speed={2}
      height={60}
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
      className={className}
      {...rest}
    >
      <rect x='0' y='0' rx='3' ry='3' className='h-8' />
    </ContentLoader>
  );
};

export default LineLoader;