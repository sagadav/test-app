import SelectUI from '@/components/ui/SelectUI';

const NewsListFilters = ({
  onChange,
}: {
  onChange: (key: string, value: string) => void;
}) => {
  const categoryItems = {
    Бизнес: 'business',
    entertainment: 'entertainment',
    general: 'general',
  };
  const countryItems = {
    ru: 'ru',
    ua: 'ua',
  };
  return (
    <div>
      <SelectUI
        items={categoryItems}
        onChange={(v) => onChange('category', v)}
      />
      <SelectUI items={countryItems} onChange={(v) => onChange('country', v)} />
    </div>
  );
};

export default NewsListFilters;
