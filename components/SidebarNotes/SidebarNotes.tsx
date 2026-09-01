import Link from 'next/link';
import css from './SidebarNotes.module.css';

// Список тегов, по которым можно фильтровать заметки
const tags = ['all', 'work', 'personal', 'todo', 'meeting'];

export default function SidebarNotes() {
  return (
    <aside className={css.sidebar}>
      <h3 className={css.title}>Filter by tag</h3>
      <ul className={css.list}>
        {tags.map((tag) => (
          <li key={tag} className={css.listItem}>
            {/* Ссылка ведет на динамический маршрут с выбранным тегом */}
            <Link href={`/notes/filter/${tag}`} className={css.link}>
              {tag.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}