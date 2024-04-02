import { BsCurrencyBitcoin } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";
import PropTypes from 'prop-types';

const Bitcoin = ({ item }) => {
    console.log(item.color);
  return (
    <div className="bg-darkGray w-[20rem] flex flex-col p-4 rounded-xl gap-y-8">
      <div className="flex items-center justify-between">
        <div className={`w-16 h-16 flex items-center justify-center rounded-full text-blue-50`} style={{border: `1px solid ${item.color}`}}>
          <BsCurrencyBitcoin className={`text-4xl`} style={{color: item.color}} />
        </div>
        <div className="flex flex-col items-end">
          <h1 className="font-semibold text-xl">{item.code}</h1>
          <p className="text-lightGray">{item.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-medium">
          <p dangerouslySetInnerHTML={{ __html: item.symbol }}></p>
          <p>{item.rate}</p>
        </div>
        <IoMdInformationCircleOutline className={`text-3xl`} style={{color: item.color}} />
      </div>
    </div>
  );
};

Bitcoin.propTypes = {
    item: PropTypes.shape({
      code: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      rate: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }).isRequired,
  };

export default Bitcoin;
