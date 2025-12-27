'use client';

interface ListingMenuItemProps {
  itemId: string;
  areaId: string;
  label: string;
  onClick: () => void;
}

export default function ListingMenuItem({ itemId, areaId, label, onClick }: ListingMenuItemProps) {
  return (
    <div>
      <div></div>
      <div data-mm_item_id={itemId} data-mm_area_id={areaId} onClick={onClick}>
        <div className="listingMenuItem">{label}</div>
        <br />
      </div>
    </div>
  );
}
